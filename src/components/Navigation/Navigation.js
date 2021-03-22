import profileLogo from '../../images/profile-logo.svg';
import { Link, Route } from 'react-router-dom';

export default function Navigation(props) {
  return (
    <>
      <Route exact path='/'>
          <nav>
            <ul className='navigation navigation_main'>
              <li className='navigation__list-element navigation__list-element_main'>
                <Link to='./signup' className='navigation__main-link'>Регистрация</Link>
              </li>
              <li className='navigation__list-element navigation__list-element_main'>
                <Link to='./signup' className='navigation__main-link navigation__main-link_signin'>Войти</Link>
              </li>
            </ul>
          </nav>
      </Route>
      <Route path='/:route'>
          <nav>
            <button className='navigation__mobile-button' onClick={() => {
              props.setMobileNav(true);
            }} />
            <ul className='navigation'>
              <li className='navigation__list-element'>
                <Link to='./movies' className='navigation__link'>Фильмы</Link>
              </li>
              <li className='navigation__list-element'>
                <Link to='./saved-movies' className='navigation__link'>Сохраненные фильмы</Link>
              </li>
              <li className='navigation__list-element'>
                <Link to='./profile' className='navigation__link navigation__link_profile'>Аккаунт
                  <img src={profileLogo} alt='Логотип профиля' className='navigation__profile-logo' />
                </Link>
              </li>
            </ul>
          </nav>
      </Route>
    </>
  )
}
