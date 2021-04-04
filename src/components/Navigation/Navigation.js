import profileLogo from '../../images/profile-logo.svg';
import { Link, useLocation, NavLink } from 'react-router-dom';

export default function Navigation(props) {
  const location = useLocation().pathname;

  return (
      <nav>
        <button className={`navigation__mobile-button ${ location === '/' && `navigation__mobile-button_hidden` }`} onClick={() => {
          props.setMobileNav(true);
        }} />
        <ul className={`navigation ${ !props.loggedIn && location === '/' && `navigation_main` }
          ${ props.loggedIn && location === '/' && `navigation_visible`}`}>
          { props.loggedIn ? <>
            <li className='navigation__list-element'>
              <NavLink
                to='./movies'
                className={`${ location !== '/' ? `navigation__link` : `navigation__main-link` }`}
                activeClassName='navigation__link_active'>
                Фильмы
              </NavLink>
            </li>
            <li className='navigation__list-element'>
              <NavLink
                to='./saved-movies'
                className={`${ location !== '/' ? `navigation__link` : `navigation__main-link` }`}
                activeClassName='navigation__link_active'>
                Сохраненные фильмы
              </NavLink>
            </li>
            <li className='navigation__list-element'>
              <NavLink
                to='./profile'
                className={`${ location !== '/' ? `navigation__link` : `navigation__main-link` } navigation__link_profile`}
                activeClassName='navigation__link_active'>
                Аккаунт
                <img src={profileLogo} alt='Логотип профиля' className='navigation__profile-logo' />
              </NavLink>
            </li>
          </> : <>
            <li className='navigation__list-element navigation__list-element_main'>
              <NavLink to='./signup' className='navigation__main-link'>
                Регистрация
              </NavLink>
            </li>
            <li className='navigation__list-element navigation__list-element_main'>
              <Link to='./signin' className='navigation__main-link navigation__main-link_signin'>
                Войти
              </Link>
            </li>
          </>
          }
        </ul>
      </nav>
  )
}
