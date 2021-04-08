import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Title from './Title.jsx';
import {FaConciergeBell} from 'react-icons/fa';
import {MdLocalDrink} from 'react-icons/md';
import {AiOutlineFundProjectionScreen} from 'react-icons/ai';
import '../../styles/HomePage.scss';

export default function Amenities() {
  const amenities = [
    {
      icon: <FaConciergeBell />,
      title: 'Concierge Service',
      info: `Instantly get help with ICT troubleshooting`,
    },
    {
      icon: <AiOutlineFundProjectionScreen />,
      title: 'Presentation aids',
      info: `All our meeting rooms are equipped with a range of digital and analogue presentation aids`,
    },
    {
      icon: <MdLocalDrink />,
      title: 'Light Refreshments',
      info:
        'Our meeting rooms come with access to fresh water and a variety of teas to energise your meetings',
    },
  ];
  const DisplayAmenities = () => {
    return amenities.map((amenity, idx) => {
      return (
        <Col className="amenities-col justify-content-center mt-2">
          <article key={idx} className="amenities">
            <div className="amenity-details amenities-card">{amenity.icon}</div>
            <h6 className="amenity-details amenities-card">{amenity.title}</h6>
            <div className="amenity-info amenities-card">{amenity.info}</div>
          </article>
        </Col>
      );
    });
  };

  return (
    <section className="amenities">
      <Container>
        <Row>
          <Col className="mt-4">
            <Title title="Amenities" />
          </Col>
        </Row>
        <Row>
          {/* <div className="amenities-center"> */}
          <DisplayAmenities className="display-Amentities" />
          {/* </div> */}
        </Row>
      </Container>
    </section>
  );
}
