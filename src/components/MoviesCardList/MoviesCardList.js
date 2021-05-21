import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__container'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
      { props.moreButton === 'true' && <button type='button' className='movies-card-list__more-button'>Ещё</button> }
    </section>
  )
}
