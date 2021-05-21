import React from 'react';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/formValidator';

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();

  const onSubmit = () => {
    props.onUpdateUserInfo( values['email'], values['name'] );
  }

  React.useEffect(() => {
    if (values['email'] === currentUser.email && values['name'] === currentUser.name) {
      setIsValid(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  React.useEffect(() => {
    values['name'] = currentUser.name;
    values['email'] = currentUser.email;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <section className='profile'>
    {
      props.isLoading ?
      <Preloader /> :
      <>
      <h1 className='profile__title'>
        Привет, {currentUser.name}
      </h1>
      {
        !props.editProfile ?
          <div className='profile__info'>
          <div className='profile__info-element'>
            <p className='profile__text'>
              Имя
            </p>
            <p className='profile__text'>
              {currentUser.name}
            </p>
          </div>
          <div className='profile__info-element'>
            <p className='profile__text'>
              Почта
            </p>
            <p className='profile__text'>
              {currentUser.email}
            </p>
          </div>
          <button
            type='button'
            className='profile__edit-button'
            onClick={() => props.setEditProfile(true)}>
              Редактировать
          </button>
          <button
            type='button'
            className='profile__exit-button'
            onClick={() => {
              props.onSignOut();
            }}>
              Выйти из аккаунта
          </button>
        </div> :
        <form
          className='profile__info'
          onSubmit={(evt) => {
            evt.preventDefault();

            onSubmit();
          }}>
          <div className='profile__info-element'>
            <p className='profile__text'>
              Имя
            </p>
            <input
              className='profile__input'
              name='name' value={ values['name'] }
              onChange={ handleChange }
              minLength='2'
              maxLength='30'
              pattern='^[А-Яа-я\s\w\S]{1,}$'
              required/>
          </div>
          <div className='profile__info-element'>
            <p className='profile__text'>
              Почта
            </p>
            <input
              className='profile__input'
              name='email'
              value={ values['email'] }
              onChange={ handleChange }
              type='email'
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              required/>
          </div>
          <p className='profile__submit-error'>
            {props.errorUpdateUser}
          </p>
          <button
            type='submit'
            className={`profile__submit-button ${ !isValid && `profile__submit-button_disabled` } `}
            disabled={!isValid}>
              Сохранить
          </button>
          </form>
      }
      </>
    }
    </section>
  )
}
