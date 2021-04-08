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
      info: `Our on-site concierge provides the following services:
          1. Ordering refreshments/meals for meetings
          2. Troubleshooting IT devices (e.g. presentation aids)
          `,
    },
    {
      icon: <AiOutlineFundProjectionScreen />,
      title: 'Presentation aids',
      info: `All our meeting rooms are equipped with a range of digital and analogue presentation aids, ranging from projectors to whiteboards.`,
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
        <Col className="amenities-col">
          <article key={idx} className="amenities">
            <span>{amenity.icon}</span>
            <h6>{amenity.title}</h6>
            <p>{amenity.info}</p>
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
