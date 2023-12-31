import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import '../NavBar.css'
import {Button} from './Button'
import Logout from './Logout'

function NavBar() {

  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  window.addEventListener('resize', showButton)


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            ExoticWhips  
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
              <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                About
              </Link>
              </li>
              <li className='nav-item'>
              <Link to='/cars' className='nav-links' onClick={closeMobileMenu}>
                Cars
              </Link>
              </li>
              <li className='nav-item'>
              <Link to='/orders' className='nav-links' onClick={closeMobileMenu}>
                Orders
              </Link>
              </li>
              <li className='nav-item'>
              <Link to='/reviews' className='nav-links' onClick={closeMobileMenu}>
                Reviews
              </Link>
              </li>
              <li className='nav-item'>
              <Link to='/orders' className='nav-links-mobile' onClick={closeMobileMenu}>
                Get Started
              </Link>
              </li>
          </ul>
          {button && <Logout buttonStyle='btn--outline'>Logout</Logout>}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
