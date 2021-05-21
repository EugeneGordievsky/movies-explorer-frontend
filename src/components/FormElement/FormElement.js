import React from 'react';

export default function FormElement({title, error, ...props}) {

  return (
    <>
      <div className='form-element' >
        <p className='form-element__title'>{title}</p>
        <input className={`form-element__input ${ error && error !== '' && `form-element__input_err`}`} {...props} />
        <span className={`form-element__error ${ error && error !== '' && `form-element__error_visible`}`}>{error}</span>
      </div>
    </>
  )
}
