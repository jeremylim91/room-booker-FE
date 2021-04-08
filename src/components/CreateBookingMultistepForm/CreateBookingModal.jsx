import React, {useContext, useState, useEffect} from 'react';
import {Form, Button, Container, Row, Col, Modal} from 'react-bootstrap';
import moment from 'moment';
import '../../styles/createBookingModal.scss';
import TaggingField from '../HOCs/TaggingField.jsx';
import {useHistory} from 'react-router-dom';

import {writeStorage, deleteFromStorage} from '@rehooks/local-storage';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  formModes,
  getUsers,
  updateAgendaAction,
  updateAttendeesAction,
  saveNewMeeting,
} from '../../createBookingStore';

export default function CreateBookingModal({
  userSelectionDetails,
  show,
  handleClose,
}) {
  // Destructure imported vars
  const {FORM_STEP} = formModes;
  //set a state to hold info tt must be fed into the autocomplete feature
  // const [props, setProps] = useState({suggestions: [], tags: []});
  //set a state change the modal's content when meeting is saved
  const [isMeetingSaved, setIsMeetingSaved] = useState(false);
  // set a state to hold all the mtg attendee tags
  const [tagsProp, setTagsProp] = useState([]);
  const [suggestionsProp, setSuggestionsProp] = useState([]);

  // destructure vars obtained thru useContext
  const {
    formStore,
    dispatchBookingForm,
    handleOnChange,
    formLocalStorage,
  } = useContext(CreateBookingContext);

  // query the db to get all users and their id
  useEffect(() => {
    getUsers(setSuggestionsProp);
  }, []);

  // get the start & end time from the prop and format it as string
  const startTime = moment(formStore.startTime).format('LT');
  const endTime = moment(formStore.endTime).format('LT');

  // get the mtg date and format it as a str
  const mtgDate = moment(formStore.startTime).format('LL');

  // const onAddition = (tag) => {
  //   // get the form info that is currently saved in user's local storage
  //   let newProps = {...props};
  //   newProps.tags = [...newProps.tags, tag];
  //   // save to local storage so tt user keeps the attendees even if the dates change
  //   writeStorage(CREATE_BOOKING_FORM, {
  //     ...formLocalStorage,
  //     tags: newProps.tags,
  //   });
  // dispatchBookingForm(updateAttendeesAction(newProps.tags));
  // setProps(newProps);
  // };
  useEffect(() => {
    writeStorage(CREATE_BOOKING_FORM, {
      ...formLocalStorage,
      tags: tagsProp,
    });
  }, [tagsProp]);

  // },[tagsProp])

  //   const saveFormInfoToLocalStorage = (key, newVal) => {
  //     writeStorage(key, newVal);
  //   };
  // });
  // const updateStore = dispatchBookingForm(updateAttendeesAction(tagsProp));

  // const onDelete = (i) => {
  //   let newProps = {...props};
  //   newProps.tags = newProps.tags.slice(0);
  //   newProps.tags.splice(i, 1);
  //   // save to local storage so tt user keeps the attendees even if the dates change
  //   writeStorage(CREATE_BOOKING_FORM, {
  //     ...formLocalStorage,
  //     tags: newProps.tags,
  //   });
  //   dispatchBookingForm(updateAttendeesAction(newProps.tags));
  //   setProps(newProps);
  // };
  const history = useHistory();
  const handleSave = () => {
    console.log(`formStore that goes into BE:`);
    console.log(formStore);
    saveNewMeeting(history, formStore);
    deleteFromStorage(CREATE_BOOKING_FORM);
    deleteFromStorage(FORM_STEP);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={12}>
                Date: {mtgDate}
              </Col>
              <Col xs={6} md={6}>
                Start: {startTime}
              </Col>
              <Col xs={6} md={6}>
                End: {endTime}
              </Col>
            </Row>

            <Form.Group controlId="meeting  agenda">
              <Row>
                <Col xs={12}>
                  <Form.Label>Agenda</Form.Label>
                </Col>

                <Col>
                  <Form.Control
                    name="agenda"
                    as="textarea"
                    rows={3}
                    value={
                      formLocalStorage.agenda != null
                        ? formLocalStorage.agenda
                        : formStore.agenda
                    }
                    onChange={(e) => {
                      handleOnChange(updateAgendaAction, e);
                      console.log(formStore);
                    }}
                    placeholder="Describe the purpose of the meeting"
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Col>
                <TaggingField
                  suggestionsProp={suggestionsProp}
                  tagsProp={tagsProp}
                  setTagsProp={setTagsProp}
                  labelProp="Attendees"
                  dispatchBookingForm={dispatchBookingForm}
                  tagSelf={true}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
