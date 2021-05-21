import { Route, NavLink } from 'react-router-dom';
import profileLogo from '../../images/profile-logo.svg';

export default function MobileNav(props) {
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
                <NavLink
                  exact to='./'
                  className='mobile-nav__link'
                  onClick={() => {
                    props.setMobileNav(false)
                  }}
                  activeClassName='mobile-nav__link_active'>
                    Главная
                </NavLink>
              </li>
              <li className='mobile-nav__list-element'>
                <NavLink
                  to='./movies'
                  className='mobile-nav__link'
                  onClick={() => {
                    props.setMobileNav(false)
                  }}
                  activeClassName='mobile-nav__link_active'>
                    Фильмы
                </NavLink>
              </li>
              <li className='mobile-nav__list-element'>
                <NavLink
                  to='./saved-movies'
                  className='mobile-nav__link'
                  onClick={() => {
                    props.setMobileNav(false)
                  }}
                  activeClassName='mobile-nav__link_active'>
                    Сохраненные фильмы
                </NavLink>
              </li>
              <li className='mobile-nav__list-element'>
                <NavLink
                  to='./profile'
                  className='mobile-nav__link mobile-nav__link_profile'
                  onClick={() => {
                    props.setMobileNav(false)
                  }}
                  activeClassName='mobile-nav__link_active'>
                    Аккаунт
                    <img
                      src={profileLogo}
                      alt='Логотип профиля'
                      className='mobile-nav__profile-logo' />
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </Route>
  )
}
