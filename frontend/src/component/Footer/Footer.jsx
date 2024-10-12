import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p>&copy; 2024 AbesitPedia. All rights reserved.</p>
      </div>
      <div>
      <Link to={'/'}>Home</Link> | <Link to={'/places'}>Places</Link> | <Link to={'/contact'}>Contact</Link>
      </div>
    </footer>
  );
}

export default Footer;