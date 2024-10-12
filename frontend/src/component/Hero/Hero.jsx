import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Hero = () => {
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your Voice, Your Platform</h1>
        <p>Make your mark by contributing.</p>
        
       {isLoggedIn?<Link className='dive' to={'/year'}>Let's Dive.</Link>: <><Link className='dive' to={'/sign-up'}>Sign Up</Link>
        <Link className='dive' to={'/sign-in'}>Log In</Link></>}
      </div>
    </section>
  );
}

export default Hero;
