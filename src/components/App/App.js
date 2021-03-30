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
import { register, login, getUserInfo, updateUserInfo, getSavedMovies } from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const history = useHistory();
  const location = useLocation().pathname;

  const [isLoading, setIsLoading] = React.useState(false);
  const [isMobileNav, setMobileNav] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  })

  const onRegister = (email, password, name) => {
    register(email, password, name)
      .then(() => history.push('./signin'))
      .catch((err) => console.log(err))
  }

  const onLogin = (email, password) => {
    login(email, password)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('jwt', res.token);
        }
        setLoggedIn(true)
        setCurrentUser(res.user);
        history.push('./movies');
      })
      .catch((err) => console.log(err))
  }

  const onUpdateUserInfo = (email, name) => {
    updateUserInfo(email, name)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() =>{
    const token = localStorage.getItem('jwt');

    console.log(location)

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
        .catch((err) => console.log(err))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const localMoviesList = localStorage.getItem('movies');

    if (loggedIn) {
      if (localMoviesList) {
        setMoviesList(JSON.parse(localMoviesList));
      } else {
        setIsLoading(true);
        getMovies()
          .then((movies) => {
            const filterMovies = movies
            .filter((m) => {
              return m.country &&
                m.director &&
                m.duration &&
                m.year &&
                m.description &&
                m.image &&
                m.id &&
                m.nameRU &&
                m.nameEN
            });
            setMoviesList(filterMovies);
            localStorage.setItem('movies', JSON.stringify(filterMovies));
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      }
      getSavedMovies()
        .then((res) => {
          setSavedMoviesList(res);
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header setMobileNav={setMobileNav} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute exact path='/movies' loggedIn={loggedIn} component={Movies} moviesList={moviesList} isLoading={isLoading} />
          <ProtectedRoute exact path='/saved-movies' loggedIn={loggedIn} component={SavedMovies} moviesList={savedMoviesList}  isLoading={isLoading} />
          <ProtectedRoute exact path='/profile' loggedIn={loggedIn} component={Profile} setLoggedIn={setLoggedIn}
            onUpdateUserInfo={onUpdateUserInfo} />
          <Route exact path='/signup'>
            <Register handleSubmit={onRegister} />
          </Route>
          <Route exact path='/signin'>
            <Login handleSubmit={onLogin} />
          </Route>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
        <MobileNav setMobileNav={setMobileNav} isMobileNav={isMobileNav} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
