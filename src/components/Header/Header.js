import logo from '../../images/logo.svg';
import { Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  return (
    <>
      <Route exact path='/'>
        <header className='header header_main'>
          <img src={logo} alt='Логотип Movie-Explorer' className='header__logo'/>
          <Navigation setMobileNav={props.setMobileNav} loggedIn={props.loggedIn} />
        </header>
      </Route>
      <Route exact path={['/profile', '/movies', '/saved-movies']}>
        <header className='header'>
          <img src={logo} alt='Логотип Movie-Explorer' className='header__logo' />
          <Navigation setMobileNav={props.setMobileNav} loggedIn={props.loggedIn} />
        </header>
      </Route>
    </>
  )
}
