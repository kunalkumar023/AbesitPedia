import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">AbesitPedia</div>
      
      <nav className={isMobileMenuOpen ? "nav active" : "nav"}>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          {isLoggedIn?<li><Link to={'/addArticle'}>Add Article</Link></li>:""}
          <li><Link to={'/year'}>All Articles</Link></li>
          <li><Link to={'/me'}>MyProfle</Link></li>
        </ul>
      </nav>

      <div className="hamburger" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}

export default Header;
