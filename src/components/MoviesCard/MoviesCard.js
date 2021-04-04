import React from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCard(props) {
  const location = useLocation();
  const [isLike, setLike] = React.useState(props.saved);
  const {
    duration,
    nameRU,
    image,
    trailer,
    movieId
  } = props.movie;

  return (
    <div className='movies-card'>
        <img
          src={image}
          alt='Постер фильма'
          className='movies-card__poster'
          onClick={() => {
            return window.open(trailer)
          }}/>
        <div className='movies-card__info'>
          <p className='movies-card__title'>
            {nameRU}
          </p>
          {
            location.pathname === '/movies' ?
              <button className={`movies-card__like-button ${ isLike && `movies-card__like-button_active`}`}
                type='button'
                onClick={() => {
                if (isLike) {
                  const id = props.savedMovies.find((movie) => movie.movieId === movieId)._id;

                  props.handleDeleteMovie(id);
                  setLike(false);
                } else {
                  props.handleSaveMovie(props.movie);
                  setLike(true)
                }
              }} /> :
              <button
                className={'movies-card__delete-button'}
                type='button'
                onClick={() => {
                  props.handleDeleteMovie(props.movie._id);
                }}/>
          }
        </div>
        <p className='movies-card__duration'>
          { duration % 60 === 0 ?
            `${duration / 60} ч` : duration > 60 ?
            `${Math.floor(duration / 60)} ч ${duration % 60} мин` :
            `${duration} мин`
          }
        </p>
    </div>
  )
}
