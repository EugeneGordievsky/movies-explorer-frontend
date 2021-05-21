import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import MobileNav from '../MobileNav/MobileNav';

function App() {
  const [isMobileNav, setMobileNav] = React.useState(false);

  return (
    <div className='app'>
      <Switch>
        <Route path='/movies'>
          <Header setMobileNav={setMobileNav} />
          <Movies />
          <MobileNav setMobileNav={setMobileNav} isMobileNav={isMobileNav} />
          <Footer />
        </Route>
        <Route path='/saved-movies'>
          <Header setMobileNav={setMobileNav} />
          <SavedMovies />
          <MobileNav setMobileNav={setMobileNav} isMobileNav={isMobileNav} />
          <Footer />
        </Route>
        <Route path='/profile'>
          <Header setMobileNav={setMobileNav} />
          <Profile />
          <MobileNav setMobileNav={setMobileNav} isMobileNav={isMobileNav} />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
