import React, {useState, useEffect, useContext} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default function ManageUsers() {
  // add and delete users
  const [allUsers, setAllUsers] = useState([]);

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
