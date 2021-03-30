import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies(props) {
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [inputWord, setInputWord] = React.useState('');
  const [notFoundText, setNotFoundText] = React.useState('');
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    isShortFilm ?
      setMovies(props
        .moviesList
        .filter((m) => m.duration <= 40)) :
      setMovies(props
        .moviesList)
  }, [isShortFilm, props.moviesList])

  return (
    <>
      <SearchForm setIsShortFilm={setIsShortFilm} setInputWord={setInputWord} inputWord={inputWord} />
      { props.isLoading ? <Preloader /> : <MoviesCardList moreButton='true'
        moviesList={movies} notFoundText={notFoundText} /> }
    </>
  )
}
