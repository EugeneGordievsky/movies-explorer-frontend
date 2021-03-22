export default function SearchForm() {
  return (
    <section className='search-form'>
      <div className='search-form__find'>
        <input className='search-form__input' placeholder='Фильмы' />
        <button type='submit' className='search-form__find-button' />
      </div>
      <div className='search-form__short-film'>
        <div className='search-form__tumbler'>
          <input type='checkbox' className='search-form__checkbox' id='search-form-checkbox' />
          <label htmlFor='search-form-checkbox' className='search-form__checkbox-label' />
        </div>
        <p className='search-form__checkbox-caption'>Короткометражки</p>
      </div>
    </section>
  )
}
