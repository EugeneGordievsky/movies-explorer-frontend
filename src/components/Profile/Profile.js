import React from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/formValidator';

export default function Profile(props) {
  const history = useHistory();
  const [editProfile, setEditProfile] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();

  React.useEffect(() => {
    values['name'] = currentUser.name;
    values['email'] = currentUser.email;
    setIsValid(true);
  }, [currentUser]);

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}</h1>
      { !editProfile ?
          <div className='profile__info'>
          <div className='profile__info-element'>
            <p className='profile__text'>Имя</p>
            <p className='profile__text'>{ currentUser.name }</p>
          </div>
          <div className='profile__info-element'>
            <p className='profile__text'>Почта</p>
            <p className='profile__text'>{ currentUser.email }</p>
          </div>
          <button type='button' className={`profile__edit-button`}
            onClick={() => setEditProfile(true)}>Редактировать</button>
          <button type='button' className={`profile__exit-button`} onClick={() => {
            localStorage.removeItem('jwt');
            props.setLoggedIn(false);
            history.push('./');
          }}>Выйти из аккаунта</button>
        </div> : <form className='profile__info' onSubmit={() => {
            props.onUpdateUserInfo(values['email'], values['name']);
            values['name'] = currentUser.name;
            values['email'] = currentUser.email;
            setEditProfile(false);
          }}>
          <div className='profile__info-element'>
            <p className='profile__text'>Имя</p>
            <input className='profile__input' name='name' value={ values['name'] } onChange={ handleChange }
              minLength='2' maxLength='30' pattern='^[A-Za-zА-Яа-я\s]{1,}$' required />
          </div>
          <div className='profile__info-element'>
            <p className='profile__text'>Почта</p>
            <input className='profile__input' name='email' value={ values['email'] } onChange={ handleChange }
              type='email' required />
          </div>
          <button type='submit' className={`profile__submit-button ${ !isValid && `profile__submit-button_disabled` } `}
            disabled={!isValid}>Сохранить</button>
        </form>
      }
    </section>
  )
}
