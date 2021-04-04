import error from '../../images/error.svg';

export default function ErrorPopup (props) {
  return (
    <section
      className={`error-popup ${!props.isErrorPopup && `error-popup_hidden`}`}
      onClick={() => props.closeErrorPopup()}>
      <div className='error-popup__container'>
        <img src={error} className='error-popup__error-logo' alt='Символ ошибки' />
        <p className='error-popup__error-text'>
          {props.errorText}
        </p>
      </div>
    </section>
  )
}
