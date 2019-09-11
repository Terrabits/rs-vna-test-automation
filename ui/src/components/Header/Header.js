import React from 'react';
import './Header.scss';
import Logo from './Logo';

function Header() {
  return(
    <header>
      <nav id="navbar" className="navbar box-shadow">
        <span className="navbar-brand rs-blue">
          <Logo />
        </span>
      </nav>
    </header>
  )
}

export default Header;
