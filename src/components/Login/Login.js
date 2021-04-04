import React from 'react';
import { Redirect } from 'react-router-dom';
import Authorization from '../Authorization/Authorization';
import FormElement from '../FormElement/FormElement';
import Preloader from '../Preloader/Preloader';
import { useFormWithValidation } from '../../utils/formValidator';

export default function Login(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  return (
    <section className='login'>
      {
        props.loggedIn ?
        <Redirect to='./movies'/> :
        <>
        {
          props.isLoading ?
          <Preloader /> :
          <Authorization
            title='Рады видеть!'
            submitButtonText='Войти'
            linkCaption='Еще не зарегистрированы?'
            linkText='Регистрация'
            linkPath='./signup'
            isValid={isValid}
            handleSubmit={(evt) => {
              evt.preventDefault();

              props.handleSubmit(values['email'], values['password']);
            }} >
          <FormElement
            title='E-mail'
            name='email'
            error={errors['email']}
            onChange={handleChange}
            type='email'
            required/>
          <FormElement
            title='Пароль'
            name='password'
            error={errors['password']}
            onChange={handleChange}
            minLength='8'
            type='password'
            required/>
          </Authorization>
        }
        </>
      }
    </section>
  )
}
