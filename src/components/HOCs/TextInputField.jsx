import React from 'react';
import {Form} from 'react-bootstrap';

export default function TextInputField({
  label,
  stateProp,
  setStateProp,
  placeHolderProp,
}) {
  const handleTextChange = (e) => {
    setStateProp(e.target.value);
  };

  return (
    <Form.Group>
      <Form.Label>{label}:</Form.Label>
      <Form.Control
        type="text"
        onChange={handleTextChange}
        value={stateProp}
        placeholder={placeHolderProp}></Form.Control>
    </Form.Group>
  );
}
