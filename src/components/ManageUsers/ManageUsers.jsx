import React, {useState, useEffect, useContext} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {getUsers} from '../../createBookingStore.jsx';
import ReactTags from 'react-tag-autocomplete';
import {RoomBookerContext, deleteUser, createUser} from '../../store.jsx';
import {onAddition, onDelete} from '../../utils/autocompleteRelatedFns.mjs';
import WarningMessageAboutDeletion from './WarningMessageAboutDeletion.jsx';
import WarningModal from '../HOCs/WarningModal.jsx';

// add and delete users
export default function ManageUsers() {
  // destructure vars obtained thru useContext
  const {
    formStore,
    dispatchBookingForm,
    handleOnChange,
    formLocalStorage,
  } = useContext(RoomBookerContext);

  //set a state to hold info tt must be fed into the autocomplete feature
  const [props, setProps] = useState({suggestions: [], tags: []});

  // set a state to hold user details
  const [newUserDetails, setNewUserDetails] = useState({
    email: '',
    username: '',
    password: '',
    isAdmin: false,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // get all user data
  // query the db to get all users and their id
  useEffect(() => {
    const newProps = {...props};
    getUsers(setProps, newProps);
  }, []);

  const handleTextInputChange = (e, field) => {
    const newNewUserDetails = {...newUserDetails};
    newNewUserDetails[field] = e.target.value;
    setNewUserDetails(newNewUserDetails);
  };
  const handleCheckBoxToggle = (e, field) => {
    const newNewUserDetails = {...newUserDetails};
    // else, toggle between true and false depending on curr state
    newNewUserDetails[field] = !newNewUserDetails[field];
    console.log(e.target.value);
    setNewUserDetails(newNewUserDetails);
  };

  // when the user clicks delete, display a warning before allowing user to proceed
  const handleClickDelete = () => {
    if (props.tags.length === 0) return;
    handleShow();
  };

  const handleCreateUser = () => {
    createUser(newUserDetails, setNewUserDetails);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} md={6} className="mt-4">
            <h3> Remove User(s)</h3>
            <Row>
              <Col xs={12}>Find User(s):</Col>
              <Col xs={12}>
                <ReactTags
                  suggestions={props.suggestions}
                  tags={props.tags}
                  onDelete={(i) => onDelete(i, props, setProps)}
                  onAddition={(tag) => onAddition(tag, props, setProps)}
                  noSuggestionsText="User not found"
                />
              </Col>
              <Col xs={12}>
                <Button
                  variant="outline-danger"
                  onClick={handleClickDelete}
                  className="mt-3">
                  Delete user
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} className="mt-4">
            <h3>Add User </h3>
            <Row>
              <Col>
                <Form>
                  <Form.Group
                    className=" mt-3"
                    controlId="add-user-details-form ">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="text"
                      placeholder="Enter email address"
                      value={
                        // formLocalStorage.title
                        // ? formLocalStorage.title:
                        newUserDetails.email
                      }
                      // need to update this with dispatch fn
                      onChange={(e) => handleTextInputChange(e, 'email')}
                      required
                    />
                    <Form.Text className="text-muted">
                      {'This email will be used for login'}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group
                    className=" mt-3"
                    controlId="add-user-details-form ">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      value={
                        // formLocalStorage.title
                        // ? formLocalStorage.title:
                        newUserDetails.username
                      }
                      // need to update this with dispatch fn
                      onChange={(e) => handleTextInputChange(e, 'username')}
                      required
                    />
                    <Form.Text className="text-muted">
                      {'Username will be used for tagging users to meetings'}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group
                    className=" mt-3"
                    controlId="add-user-details-form ">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="text"
                      placeholder="Default if blank: password1"
                      value={
                        // formLocalStorage.title
                        // ? formLocalStorage.title:
                        newUserDetails.password
                      }
                      // need to update this with dispatch fn
                      onChange={(e) => handleTextInputChange(e, 'password')}
                      required
                    />
                    <Form.Text className="text-muted">
                      {
                        'Users are advised to change their password upon first login'
                      }
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="add-user-details-form">
                    <Form.Check
                      type="checkbox"
                      label="Grant new user admin rights"
                      value={newUserDetails.isAdmin}
                      onChange={(e) => handleCheckBoxToggle(e, 'isAdmin')}
                    />
                  </Form.Group>

                  <Button variant="outline-primary" onClick={handleCreateUser}>
                    Create user
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {WarningModal(
        WarningMessageAboutDeletion,
        show,
        handleClose,
        props,
        setProps
      )}
    </div>
  );
}
