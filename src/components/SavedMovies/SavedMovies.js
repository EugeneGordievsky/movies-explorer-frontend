import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

export default function SavedMovies(props) {
  const [inputWord, setInputWord] = React.useState('');
  const [isShort, setIsShort] = React.useState(false);

  const onSubmitForm = () => {
    props.getSavedMoviesList(inputWord, isShort);
  }

  return (
    <>
      <SearchForm
        setIsShort={setIsShort}
        setInputWord={setInputWord}
        inputWord={inputWord}
        onSubmitForm={onSubmitForm}/>
      { props.isLoading ?
        <Preloader /> :
        <MoviesCardList
          moreButton={false}
          moviesList={
            isShort ?
            props.savedMovies.filter((m) => m.duration <= SHORT_MOVIE_DURATION) :
            props.savedMovies
          }
          resultBlockText={props.resultBlockText}
          handleDeleteMovie={props.handleDeleteMovie}/>
      }
    </>
  )
}
