import React from 'react';
import Authorization from '../Authorization/Authorization';
import FormElement from '../FormElement/FormElement';
import { useFormWithValidation } from '../../utils/formValidator';

export default function Register(props) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  return (
    <section className='register'>
      <Authorization title='Добро пожаловать!' submitButtonText='Зарегистрироваться'
        linkCaption='Уже зарегистрированы?' linkText='Войти' linkPath='./signin' noValidate
        isValid={isValid} handleSubmit={(evt) => {
          evt.preventDefault();
          props.handleSubmit(values['email'], values['password'], values['name']);
          resetForm();
        }} >
        <FormElement title='Имя' error={errors['name']} name='name' onChange={handleChange}
          minLength='2' maxLength='30' pattern='^[A-Za-zА-Яа-я\s]{1,}$' required />
        <FormElement title='E-mail' error={errors['email']} name='email' onChange={handleChange}
          type='email' required />
        <FormElement title='Пароль' error={errors['password']} name='password' onChange={handleChange}
          type='password' minLength='8' required />
      </Authorization>
    </section>
  )
}
