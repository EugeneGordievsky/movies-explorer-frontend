import React from 'react';

export default function FormElement({title, setInputValue, ...props}) {
  const [validationErr, setValidationErr] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');

  return (
    <>
      <div className='form-element' >
        <p className='form-element__title'>{title}</p>
        <input className={`form-element__input ${ validationErr && `form-element__input_err` }`} {...props} onChange={(evt) => {
          setInputValue(evt.target.value);
          if (!evt.target.validity.valid) {
            setValidationErr(true);
            setErrMessage(evt.target.validationMessage);
          } else {
            setValidationErr(false);
            setErrMessage('');
          }
        }} />
        <span className={`form-element__error ${ validationErr && `form-element__error_visible` }`}>{errMessage}</span>
      </div>
    </>
  )
}
