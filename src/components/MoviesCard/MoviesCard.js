import React from 'react';

export default function MoviesCard(props) {
  const [isLike, setLike] = React.useState(false);
  const {
    nameRU,
    duration,
    image,
    trailerLink,
  } = props.movie;

  const calcDuration = () => {
    if (duration < 60) {
      return `${duration} мин`
    } else if (duration > 60) {
      return `${Math.floor(duration / 60)} ч ${duration % 60} мин`
    } else {
      return `${duration / 60} ч`
    }
  }

  return (
    <div className='movies-card'>
      <img src={`https://api.nomoreparties.co${image.url}`} alt={image.alternativeText} className='movies-card__poster'
        onClick={() => {
          return window.open(trailerLink)
        }}
        />
      <div className='movies-card__info'>
        <p className='movies-card__title'>{nameRU}</p>
        <button className={`movies-card__like-button ${ isLike && `movies-card__like-button_active`}`} type='button' onClick={() => {
          if (isLike) {
            setLike(false)
          } else {
            setLike(true)
          }
        }} />
      </div>
      <p className='movies-card__duration'>{calcDuration()}</p>
    </div>
  )
}
