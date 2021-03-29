import React from 'react'
import Amenities from './Amenities.jsx'
import Banner from './Banner.jsx'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'


export default function HomePage() {
  return (
  <>

    <Banner
    title="Best-In-Class Rooms"
    subtitle= "“This is the best meeting room I've ever been in”"
    >
    <Link to="/createBooking" className="btn-primary"><Button> BOOK NOW </Button></Link>
      
    </Banner>
    <Amenities/>
  </>
  )
}
