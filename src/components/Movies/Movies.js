import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  const [inputWord, setInputWord] = React.useState('');
  const [isShort, setIsShort] = React.useState(false);

  const onSubmitForm = () => {
    props.getMoviesList(inputWord, isShort);
  }

  return (
    <>
      <SearchForm
        onSubmitForm={onSubmitForm}
        inputWord={inputWord}
        setInputWord={setInputWord}
        setIsShort={setIsShort}/>
      { props.isLoading ?
        <Preloader /> :
        <MoviesCardList
          moreButton={true}
          savedMovies={props.savedMovies}
          handleSaveMovie={props.handleSaveMovie}
          handleDeleteMovie={props.handleDeleteMovie}
          moviesList={
            isShort ?
            props.moviesList.filter((movie) => movie.duration <=40) :
            props.moviesList
          }
          resultBlockText={props.resultBlockText}/>
      }
    </>
  )
}
