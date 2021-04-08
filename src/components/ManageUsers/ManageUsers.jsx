import React, {useState, useEffect, useContext, useRef} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {getUsers} from '../../createBookingStore.jsx';
import {RoomBookerContext, deleteUser, createUser} from '../../store.jsx';
import {onAddition, onDelete} from '../../utils/autocompleteRelatedFns.mjs';
import TaggingField from '../HOCs/TaggingField.jsx';
import WarningModal from './WarningModal.jsx';
import '../../styles/manageUsers.scss';
import {getUserIdFromCookie} from '../../utils/cookieRelatedFns.mjs';

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
  const [props, setProps] = useState({suggestions: [], tags: []}); // set a state that contains all mtg attendees that should be tagged in a given meeting
  const [tagsProp, setTagsProp] = useState([]);
  // set a state containing all users that should be sugested for autocomplete
  const [suggestionsProp, setSuggestionsProp] = useState([]);

  const renderTrigger = useRef(1);
  const [renderTrigger2, setRenderTrigger2] = useState(true);

  const forceRender = () => setRenderTrigger2(!renderTrigger2);

  // set a state to hold user details
  const [newUserDetails, setNewUserDetails] = useState({
    email: '',
    username: '',
    password: '',
    isAdmin: false,
  });

  const [show, setShow] = useState(false);

  // ============useEfects=============================
  // Redirect user to error page if not signed in
  useEffect(() => {
    const loggedInUserId = getUserIdFromCookie();
    if (!loggedInUserId) {
      window.location = '/error';
    }
  }, []);

  // get all user data
  // query the db to get all users and their id
  useEffect(() => {
    getUsers(setSuggestionsProp);
  }, [tagsProp, show]);

  // =================================================
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    if (tagsProp === 0) return;
    handleShow();
  };

  const handleCreateUser = () => {
    createUser(newUserDetails, handleClose);
    renderTrigger.current += 1;
    console.log(renderTrigger);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} md={6} className="mt-4">
            <div className="shadow-sm p-2">
              <h3> Remove User(s)</h3>
              <Row>
                <Col xs={12}>
                  <TaggingField
                    suggestionsProp={suggestionsProp}
                    setSuggestionsProp={setSuggestionsProp}
                    tagsProp={tagsProp}
                    setTagsProp={setTagsProp}
                    labelProp="Find User(s)"
                  />
                </Col>
                <Col xs={12} className="action-btns">
                  <Button
                    variant="outline-danger"
                    onClick={handleClickDelete}
                    className="mt-3 mb-4">
                    Delete user
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} md={6} className="mt-4">
            <div className="shadow-sm p-2">
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
                        value={newUserDetails.email}
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
                        value={newUserDetails.username}
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
                    <Col xs={12} className="action-btns ">
                      <Button
                        className="mt-3 mb-4"
                        variant="outline-primary"
                        onClick={handleCreateUser}>
                        Create user
                      </Button>
                    </Col>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <WarningModal
        show={show}
        handleClose={handleClose}
        taggedUsers={tagsProp}
        setTaggedUsers={setTagsProp}
        forceRender={forceRender}
      />
    </div>
  );
}
