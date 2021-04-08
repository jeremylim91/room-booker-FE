import React from 'react';
import '../../styles/HomePage.scss';
import Amenities from './Amenities.jsx';
import Hero from './Hero.jsx';
import Banner from './Banner.jsx';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <Hero>
        <Banner
          title="That Meeting Place"
          subtitle="Contemporary meetings rooms for modern needs">
          <Link to="/createBooking" className="btn-primary">
            <Button> BOOK NOW </Button>
          </Link>
        </Banner>
      </Hero>
      <Amenities />
    </>
  );
}
