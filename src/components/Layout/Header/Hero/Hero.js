import React from 'react';
import Button from 'react-bootstrap/Button';

import './Hero.css';
const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero_banner'>
        {/* <h2 className='hero_title'>Exploring...</h2> */}
        <h3 className='hero_text'>
          A place to meet new people, try new games, or play more of what you
          love.
        </h3>
        {/* <Button className='btn-warning'>Get started</Button> */}
      </div>
    </div>
  );
};

export default Hero;
