import logo from '../../images/logo.svg';
import { Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  return (
    <>
      <Route exact path='/'>
        <header className='header header_main'>
          <img src={logo} alt='Логотип Movie-Explorer' className='header__logo' />
          <Navigation />
        </header>
      </Route>
      <Route path='/:route'>
        <header className='header'>
          <img src={logo} alt='Логотип Movie-Explorer' className='header__logo' />
          <Navigation setMobileNav={props.setMobileNav} />
        </header>
      </Route>
    </>
  )
}
