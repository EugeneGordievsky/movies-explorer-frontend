import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__err-text'>Страница не найдена</p>
      <Link to='./' className='not-found__reset'>Назад</Link>
    </section>
  )
}
