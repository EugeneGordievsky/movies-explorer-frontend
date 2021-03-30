import profileLogo from '../../images/profile-logo.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation(props) {
  const location = useLocation().pathname;

  return (
      <nav>
        <button className={`navigation__mobile-button ${ location === '/' && `navigation__mobile-button_hidden` }`} onClick={() => {
          props.setMobileNav(true);
        }} />
        <ul className={`navigation ${ !props.loggedIn && location === '/' && `navigation_main` }`}>
          { props.loggedIn ? <>
            <li className='navigation__list-element'>
              <Link to='./movies' className={`${ location !== '/' ? `navigation__link` : `navigation__main-link` }
                ${ location === '/movies' && `navigation__link_active` }`}>
                Фильмы
              </Link>
            </li>
            <li className='navigation__list-element'>
              <Link to='./saved-movies' className={`${ location !== '/' ? `navigation__link` : `navigation__main-link` }
                ${ location === '/saved-movies' && `navigation__link_active` }`}>
                Сохраненные фильмы
              </Link>
            </li>
            <li className='navigation__list-element'>
              <Link to='./profile' className={`${ location !== '/' ? `navigation__link` : `navigation__main-link` }
                ${ location === '/profile' && `navigation__link_active` } navigation__link_profile`}>
                Аккаунт
                <img src={profileLogo} alt='Логотип профиля' className='navigation__profile-logo' />
              </Link>
            </li>
          </> : <>
            <li className='navigation__list-element navigation__list-element_main'>
              <Link to='./signup' className='navigation__main-link'>
                Регистрация
              </Link>
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
