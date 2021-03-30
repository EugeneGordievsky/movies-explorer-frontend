import React from 'react';
import Authorization from '../Authorization/Authorization';
import FormElement from '../FormElement/FormElement';
import { useFormWithValidation } from '../../utils/formValidator';

export default function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  return (
    <section className='login'>
      <Authorization title='Рады видеть!' submitButtonText='Войти' linkCaption='Еще не зарегистрированы?'
        linkText='Регистрация' linkPath='./signup' isValid={isValid} handleSubmit={(evt) => {
          evt.preventDefault();

          props.handleSubmit(values['email'], values['password']);
          resetForm();
        }} >
        <FormElement title='E-mail' name='email' error={errors['email']}
          onChange={handleChange} type='email' required />
        <FormElement title='Пароль' name='password' error={errors['password']}
          onChange={handleChange} minLength='8' type='password' required />
      </Authorization>
    </section>
  )
}
