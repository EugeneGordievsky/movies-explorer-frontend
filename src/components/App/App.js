import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import MobileNav from '../MobileNav/MobileNav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import {
  removeMovie,
  register,
  login,
  getUserInfo,
  updateUserInfo,
  getSavedMovies,
  saveMovie
} from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const history = useHistory();
  const location = useLocation().pathname;

  const [isLoadingLogin, setIsLoadingLogin] = React.useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = React.useState(false);
  const [isLoadingSavedMovies, setIsLoadingSavedMovies] = React.useState(false);
  const [isLoadingMoviesList, setIsLoadingMoviesList] = React.useState(false);
  const [isErrorPopup, setIsErrorPopup] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [errorUpdateUser, setErrorUpdateUser] = React.useState('');
  const [editProfile, setEditProfile] = React.useState(false);
  const [isMobileNav, setMobileNav] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [resultBlockTextMovies, setResultBlockTextMovies] = React.useState('');
  const [resultBlockTextSavedMovies, setResultBlockTextSavedMovies] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({
  name: '',
  email: '',
})

  // Получение карточек с Beatfilm и фильтрация по ключевому слову и чекбоксу "короткометражки"
  const getMoviesList = (word, short) => {
    if (word === '') {
      setResultBlockTextMovies('Введите ключевое слово');
      setMoviesList([]);
      localStorage.setItem('movies', JSON.stringify([]));
      return;
    }
    setIsLoadingMoviesList(true);
    getMovies()
      .then((movies) => movies
        .filter((movie) => movie.country &&
          movie.director &&
          movie.duration &&
          movie.year &&
          movie.description &&
          movie.image &&
          movie.trailerLink &&
          movie.id &&
          movie.nameRU &&
          movie.nameEN
        )
        .map(({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          id,
          nameRU,
          nameEN
          }) => ({
          country,
          director,
          duration,
          year,
          description,
          thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
          image: `https://api.nomoreparties.co${image.url}`,
          trailer: trailerLink,
          movieId: id,
          nameRU,
          nameEN
          })
        )
      )
      .then((movies) => {
        const filteredMovies = filterMovies(movies, word, short);

        setResultBlockTextMovies('Ничего не найдено');
        setMoviesList(filteredMovies);
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
      })
      .catch(() => {
        setResultBlockTextMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setIsLoadingMoviesList(false));
  }

  // Функция получения сохраненных фильмов и их фильтрации
  const getSavedMoviesList = (word, short) => {
    setIsLoadingSavedMovies(true);
    getSavedMovies()
      .then((movies) => {
        if (word === '') {
          setSavedMovies(movies);
        } else {
          const filteredMovies = filterMovies(movies, word, short);

          setResultBlockTextSavedMovies('Ничего не найдено');
          setSavedMovies(filteredMovies);
        }
      })
      .catch((err) => setResultBlockTextSavedMovies(err.message))
      .finally(() => setIsLoadingSavedMovies(false));
  }

  // Функция фильтрации фильмов
  const filterMovies = (movies, word, short) => {
    const filterRegex = new RegExp(word, 'gi');
    return movies.filter((movie) => {
        if (short) {
          return movie.duration <= 40 && filterRegex.test(movie.nameRU)
        } else {
          return filterRegex.test(movie.nameRU)
        }
      })
  }

  // Функция регистрации
  const onRegister = (email, password, name) => {
    setIsLoadingRegister(true);
    register(email, password, name)
      .then(() => {
        onLogin(email, password);
      })
      .catch((err) => {
        setErrorText(err.message)
        setIsErrorPopup(true);
      })
      .finally(() => setIsLoadingRegister(false));
  }

  // Функция логина
  const onLogin = (email, password) => {
    setIsLoadingLogin(true);
    login(email, password)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('jwt', res.token);
        }
        setLoggedIn(true)
        setCurrentUser(res.user);
        history.push('./movies');
      })
      .catch((err) => {
        setErrorText(err.message)
        setIsErrorPopup(true);
      })
      .finally(() => setIsLoadingLogin(false));
  }

  // Функция обновления информации о пользователе
  const onUpdateUserInfo = (email, name) => {
    setIsLoadingProfile(true);
    updateUserInfo(email, name)
      .then((res) => {
        setCurrentUser(res);
        setEditProfile(false);
      })
      .catch((err) => {
        setErrorUpdateUser(err.message);
    })
    .finally(() => setIsLoadingProfile(false));
  };

  // Функция выхода из аккаунта
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    setLoggedIn(false);
    history.push('./');
    setCurrentUser({
      name: '',
      email: '',
    })
  }

  // Функция сохранения карточки
  const handleSaveMovie = (movie) => {
    saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie])
      })
      .catch((err) => console.log(err.message))
  }

  // Функция удаления карточки
  const handleDeleteMovie = (id) => {
    removeMovie(id)
      .then(() => setSavedMovies(
        savedMovies
          .filter((m) => m._id !== id)
      ))
      .catch((err) => console.log(err.message))
  };

  // Закрытие попапа с ошибкой
  const closeErrorPopup = () => {
    setErrorText('');
    setIsErrorPopup(false);
  }

  // Получение списка фильмов из локального хранилища
  React.useEffect(() => {
    const localStorageMovies = JSON.parse(localStorage.getItem('movies'));
    if (loggedIn) {
      if (localStorageMovies) {
        setMoviesList(localStorageMovies);
      }
    }
  }, [loggedIn])

  // Получение списка сохраненных фильмов при авторизации
  React.useEffect(() => {
    const localStorageMovies = JSON.parse(localStorage.getItem('movies'));

    setIsLoadingSavedMovies(true);
    if (loggedIn) {
      getSavedMovies()
        .then((res) => {
          localStorage.setItem('savedMovies', JSON.stringify(res));
          setSavedMovies(res);
          setIsLoadingSavedMovies(false);
        })
        .catch((err) => console.log(err.message));
      if (localStorageMovies) {
        setMoviesList(localStorageMovies);
      }
    }
  }, [loggedIn]);

  // Проверка токена при загрузке страницы
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      getUserInfo(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          if ( location === '/' ) {
            history.push('/movies')
          } else {
            history.push(location)
          }
        })
        .catch((err) => console.log(err.message))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header
          setMobileNav={setMobileNav}
          loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute exact path='/movies' loggedIn={loggedIn}>
            <Movies
              isLoading={isLoadingMoviesList}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              resultBlockText={resultBlockTextMovies}
              moviesList={moviesList}
              getMoviesList={getMoviesList} />
          </ProtectedRoute>
          <ProtectedRoute exact path='/saved-movies' loggedIn={loggedIn}>
            <SavedMovies
              component={SavedMovies}
              isLoading={isLoadingSavedMovies}
              handleDeleteMovie={handleDeleteMovie}
              getSavedMoviesList={getSavedMoviesList}
              resultBlockText={resultBlockTextSavedMovies}
              savedMovies={savedMovies}/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile' loggedIn={loggedIn}>
            <Profile
              component={Profile}
              setLoggedIn={setLoggedIn}
              editProfile={editProfile}
              setEditProfile={setEditProfile}
              onUpdateUserInfo={onUpdateUserInfo}
              errorUpdateUser={errorUpdateUser}
              isLoading={isLoadingProfile}
              onSignOut={onSignOut}/>
          </ProtectedRoute>
          <Route exact path='/signup'>
            <Register
              loggedIn={loggedIn}
              isLoading={isLoadingRegister}
              handleSubmit={onRegister}/>
          </Route>
          <Route exact path='/signin'>
            <Login
              loggedIn={loggedIn}
              isLoading={isLoadingLogin}
              handleSubmit={onLogin}/>
          </Route>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
        <ErrorPopup
          errorText={errorText}
          isErrorPopup={isErrorPopup}
          closeErrorPopup={closeErrorPopup}/>
        <MobileNav
          setMobileNav={setMobileNav}
          isMobileNav={isMobileNav} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
