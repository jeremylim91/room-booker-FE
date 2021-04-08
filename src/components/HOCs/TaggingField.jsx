import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import {Form} from 'react-bootstrap';
import {
  CreateBookingContext,
  updateAttendeesAction,
} from '../../createBookingStore.jsx';

// const {dispatchBookingForm} = useContext(CreateBookingContext);

export default function TaggingField({
  labelProp,
  suggestionsProp,
  tagsProp,
  setTagsProp,
  dispatchBookingForm,
}) {
  const onAddition = (tag) => {
    const newTagsProp = [...tagsProp, tag];
    // Save to createBoookingStore via the dispatch fn
    if (dispatchBookingForm)
      dispatchBookingForm(updateAttendeesAction(newTagsProp));
    setTagsProp(newTagsProp);
  };

  const onDelete = (i) => {
    let newTagsProp = [...tagsProp];
    newTagsProp = newTagsProp.slice(0);
    newTagsProp.splice(i, 1);
    // Save to createBoookingStore via the dispatch fn
    if (dispatchBookingForm)
      dispatchBookingForm(updateAttendeesAction(newTagsProp));

    setTagsProp(newTagsProp);
  };

  return (
    <>
      <Form.Group>
        <Form.Label>{labelProp}:</Form.Label>
        <ReactTags
          suggestions={suggestionsProp}
          tags={tagsProp}
          onDelete={onDelete}
          onAddition={onAddition}
          noSuggestionsText="User not found; Please enter valid user"
        />
      </Form.Group>
    </>
  );
}
