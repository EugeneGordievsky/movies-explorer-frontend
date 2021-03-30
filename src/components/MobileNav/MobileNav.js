import { Route, Link, useLocation } from 'react-router-dom';
import profileLogo from '../../images/profile-logo.svg';

export default function MobileNav(props) {
  const location = useLocation().pathname;

  return (
    <Route exact path={['/movies', '/saved-movies', '/profile']} >
      <section className={`mobile-nav ${ props.isMobileNav && `mobile-nav_visible` }`} onClick={(evt) => {
        if (evt.target.classList.contains('mobile-nav')) props.setMobileNav(false);
      }}>
        <div className='mobile-nav__container'>
          <button type='button' className='mobile-nav__close-button' onClick={() => {
            props.setMobileNav(false);
          }} />
          <nav className='mobile-nav__nav-block'>
            <ul className='mobile-nav__links' >
              <li className='mobile-nav__list-element'>
                <Link to='./' className={`mobile-nav__link ${ location === '/' && `mobile-nav__link_active` }`} onClick={() => {
                  props.setMobileNav(false)
                }} >Главная</Link>
              </li>
              <li className='mobile-nav__list-element'>
                <Link to='./movies' className={`mobile-nav__link ${ location === '/movies' && `mobile-nav__link_active` }`} onClick={() => {
                  props.setMobileNav(false)
                }} >Фильмы</Link>
              </li>
              <li className='mobile-nav__list-element'>
                <Link to='./saved-movies' className={`mobile-nav__link ${ location === '/saved-movies' && `mobile-nav__link_active` }`} onClick={() => {
                  props.setMobileNav(false)
                }} >Сохраненные фильмы</Link>
              </li>
              <li className='mobile-nav__list-element'>
                <Link to='./profile' className={`mobile-nav__link mobile-nav__link_profile ${ location === '/profile' && `mobile-nav__link_active` }`}
                  onClick={() => {
                    props.setMobileNav(false)
                  }} >Аккаунт
                  <img src={profileLogo} alt='Логотип профиля' className='mobile-nav__profile-logo' />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </Route>
  )
}
