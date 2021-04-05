import error from '../../images/error.svg';
import success from '../../images/success.svg';

export default function ErrorPopup (props) {
  return (
    <section
      className={`error-popup ${!props.isInfoPopup && `error-popup_hidden`}`}
      onClick={() => props.closeErrorPopup()}>
      <div className='error-popup__container'>
        <img src={props.isError ? error : success} className='error-popup__error-logo' alt='Символ ошибки' />
        <p className='error-popup__error-text'>
          {props.isError ? props.infoPopupText : 'Успешно!'}
        </p>
      </div>
    </section>
  )
}
