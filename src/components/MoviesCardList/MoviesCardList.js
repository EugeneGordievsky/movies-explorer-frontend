import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { WINDOW_WIDTH } from '../../utils/constants';

export default function MoviesCardList(props) {
  const location = useLocation();

  const [showCards, setShowCards] = React.useState(window.innerWidth > WINDOW_WIDTH.LARGE ? 12 : window.innerWidth > WINDOW_WIDTH.MEDIUM ? 8 : 5 );
  const [addCards, setAddCards] = React.useState(window.innerWidth > WINDOW_WIDTH.LARGE ? 3 : 2);

  window.onresize = () => {
    if (window.innerWidth > WINDOW_WIDTH.LARGE) {
      setAddCards(3);
    } else {
      setAddCards(2);
    }
  }

  return (
    <section className='movies-card-list'>
      { props.moviesList.length === 0 ?
        <p className='movies-card-list__not-found'>
          {props.resultBlockText}
        </p> :
        <div className='movies-card-list__container' >
          {
            location.pathname === '/movies' ?
            props.moviesList
              .slice(0, showCards)
              .map((movie) => <MoviesCard
                key={movie.movieId}
                movie={movie}
                saved={props.savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId)}
                savedMovies={props.savedMovies}
                handleDeleteMovie={props.handleDeleteMovie}
                handleSaveMovie={props.handleSaveMovie}/>)
            :
            props.moviesList
              .map((movie) => <MoviesCard
                  key={movie.movieId}
                  movie={movie}
                  handleDeleteMovie={props.handleDeleteMovie}
                  handleSaveMovie={props.handleSaveMovie}/>)
          }
        </div>
      }
      {
        props.moreButton &&
        <button type='button' className={`movies-card-list__more-button
          ${ showCards >= props.moviesList.length && `movies-card-list__more-button_hidden` }`}
          onClick={() => setShowCards(showCards + addCards)}>
          Ещё
        </button>
      }

    </section>
  )
}
