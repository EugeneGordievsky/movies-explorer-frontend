import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  return (
    <>
      <SearchForm />
      { props.isLoading && <Preloader /> }
      <MoviesCardList moreButton='true' />
    </>
  )
}
