import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  const [showCards, setShowCards] = React.useState(0);
  const [addCards, setAddCards] = React.useState(0);

  React.useEffect(() => {
    if (window.innerWidth > 1136) {
      setShowCards(12);
      setAddCards(3);
    } else if (window.innerWidth < 1137 && window.innerWidth > 650) {
      setShowCards(8);
      setAddCards(2);
    } else {
      setShowCards(5);
      setAddCards(2);
    }
  }, [])

  window.onresize = () => {
    if (window.innerWidth > 1136) {
      setAddCards(3);
    } else {
      setAddCards(2);
    }
  }

  return (
    <section className='movies-card-list'>
      { props.moviesList.length === 0 ?
        <p className='movies-card-list__not-found'>{props.notFoundText}</p> :
        <div className='movies-card-list__container' >
          {props.moviesList.slice(0, showCards).map((movie) => <MoviesCard key={movie.id} movie={movie} />)}
        </div>
      }
      <button type='button' className={`movies-card-list__more-button
        ${ showCards >= props.moviesList.length && `movies-card-list__more-button_hidden` }`}
        onClick={() => setShowCards(showCards + addCards)}>
        Ещё
      </button>
    </section>
  )
}
