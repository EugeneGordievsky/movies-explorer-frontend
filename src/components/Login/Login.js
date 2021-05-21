import React from 'react';
import Authorization from '../Authorization/Authorization';
import FormElement from '../FormElement/FormElement';

export default function Login() {
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');

  return (
    <section className='login'>
      <Authorization title='Рады видеть!' submitButtonText='Войти'
        linkCaption='Еще не зарегистрированы?' linkText='Регистрация' linkPath='./signup' >
        <FormElement title='E-mail' setInputValue={setInputEmail} value={inputEmail}
          type='email' required />
        <FormElement title='Пароль' setInputValue={setInputPassword} value={inputPassword}
          minLength='8' required />
      </Authorization>
    </section>
  )
}
