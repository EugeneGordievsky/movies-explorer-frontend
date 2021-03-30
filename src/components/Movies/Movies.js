import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [inputWord, setInputWord] = React.useState('');
  const [notFoundText, setNotFoundText] = React.useState('');
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    const regex = new RegExp(inputWord, 'gi');

    if (inputWord === '') {
      setNotFoundText('Введите ключевое слово');
      setMovies([]);
    } else {
      setNotFoundText('Ничего не найдено');
      isShortFilm ?
        setMovies(
          props.moviesList.filter((m) => regex.test(m.nameRU) && m.duration <= 40)
        ) :
        setMovies(
          props.moviesList.filter((m) => regex.test(m.nameRU))
        )
    }
  }, [inputWord, props.moviesList, isShortFilm])

  return (
    <>
      <SearchForm setIsShortFilm={setIsShortFilm} setInputWord={setInputWord} inputWord={inputWord} />
      { props.isLoading ? <Preloader /> : <MoviesCardList moreButton='true'
        moviesList={movies} notFoundText={notFoundText} /> }
    </>
  )
}
