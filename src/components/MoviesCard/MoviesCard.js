import moviesPoster from '../../images/movies-poster.png'
import React from 'react';

export default function MoviesCard() {
  const [isLike, setLike] = React.useState(false);

  return (
    <div className='movies-card'>
      <img src={moviesPoster} alt='Постер фильма' className='movies-card__poster' />
      <div className='movies-card__info'>
        <p className='movies-card__title'>33 слова о дизайне</p>
        <button className={`movies-card__like-button ${ isLike && `movies-card__like-button_active`}`} type='button' onClick={() => {
          if (isLike) {
            setLike(false)
          } else {
            setLike(true)
          }
        }} />
      </div>
      <p className='movies-card__duration'>1ч42м</p>
    </div>
  )
}
