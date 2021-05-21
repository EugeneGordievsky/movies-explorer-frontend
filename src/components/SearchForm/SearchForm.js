import React from 'react';

export default function SearchForm(props) {
  return (
    <section className='search-form'>
      <form className='search-form__find' onSubmit={(evt) => {
            evt.preventDefault();

            props.onSubmitForm();
          }} >
        <input
          className='search-form__input'
          placeholder='Фильмы'
          value={props.inputWord}
          onChange={(evt) => props.setInputWord(evt.target.value)}/>
        <button
          type='submit'
          className='search-form__find-button'/>
      </form>
      <div className='search-form__short-film'>
        <div className='search-form__tumbler'>
          <input
            type='checkbox'
            className='search-form__checkbox'
            id='search-form-checkbox'
            onChange={(evt) => {
              if (evt.target.checked) {
                props.setIsShort(true);
              } else {
                props.setIsShort(false);
              }}}/>
          <label
            htmlFor='search-form-checkbox'
            className='search-form__checkbox-label' />
        </div>
        <p className='search-form__checkbox-caption'>
          Короткометражки
        </p>
      </div>
    </section>
  )
}
