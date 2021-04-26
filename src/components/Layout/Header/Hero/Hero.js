import React from 'react';
import Button from 'react-bootstrap/Button';

import './Hero.css';
const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero_banner'>
        <h2 className='hero_title'>Exploring...</h2>
        <p className='hero_text'>
          A place to meet people, explore something new, or practice more of
          what you are enthusiastic.
        </p>
        <Button className='btn-warning'>Get started</Button>
      </div>
    </div>
  );
};

export default Hero;
