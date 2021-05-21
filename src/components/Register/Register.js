import React from 'react';
import Authorization from '../Authorization/Authorization';
import FormElement from '../FormElement/FormElement';

export default function Register() {
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const [inputName, setInputName] = React.useState('');

  return (
    <section className='register'>
      <Authorization title='Добро пожаловать!' submitButtonText='Зарегистрироваться'
        linkCaption='Уже зарегистрированы?' linkText='Войти' linkPath='./signin' >
        <FormElement title='Имя' setInputValue={setInputName} value={inputName}
          minLength='2' maxLength='30' pattern='^[A-Za-zА-Яа-я\s]{1,}$' required />
        <FormElement title='E-mail' setInputValue={setInputEmail} value={inputEmail}
          type='email' required />
        <FormElement title='Пароль' setInputValue={setInputPassword} value={inputPassword}
          type='password' minLength='8' required />
      </Authorization>
    </section>
  )
}
