import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Login(props) {
  return (
      <div className='authorization'>
        <img src={logo} alt='Логотип сайта' className='authorization__logo' />
        <h1 className='authorization__title'>{props.title}</h1>
        <form className='authorization__form' onSubmit={props.handleSubmit}>
          {props.children}
          <button type='submit' className={`authorization__submit-button ${ !props.isValid && `authorization__submit-button_disabled` }`}
          disabled={ !props.isValid }>
            {props.submitButtonText}
          </button>
        </form>
        <div className='authorization__link-container'>
          <p className='authorization__link-caption'>{props.linkCaption}</p>
          <Link to={props.linkPath} className='authorization__link'>{props.linkText}</Link>
        </div>
      </div>
  )
}
