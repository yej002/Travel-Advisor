import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import './navigation.styles.css';

const Navigation = () => {
  return (
    <Container>
      <Fragment>
          <div className='navigation'>
              <Link className='logo-container' to='/'>
                  HOME
              </Link>
              <div className='nav-links-container'>
                  <Link className='nav-link' to='/travelogues'>
                      Travelogues
                  </Link>
                  <Link className='nav-link' to='/newtravelogue'>
                      New Travelogue
                  </Link>
                  <Link className='nav-link' to='/contact'>
                      Contact Us
                  </Link>
              </div>
          </div>
          <Outlet />
      </Fragment>
      </Container>
  );
};

export default Navigation;
