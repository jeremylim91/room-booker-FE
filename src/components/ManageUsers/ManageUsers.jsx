import React, {useState, useEffect, useContext} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {getUsers} from '../../createBookingStore.jsx';
import ReactTags from 'react-tag-autocomplete';
import {RoomBookerContext} from '../../store.jsx';

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
  const [newUserDetails, setNewUserDetails] = useState({});

  // get all user data
  // query the db to get all users and their id
  useEffect(() => {
    const newProps = {...props};
    getUsers(props, setProps, newProps);
  }, []);

  const handleTextInputChange = (e, field) => {
    const newNewUserDetails = {...newUserDetails};
    newNewUserDetails[field] = e.target.value;
    setNewUserDetails(newNewUserDetails);
  };
  const handleCheckBoxChange = (e, field) => {
    const newNewUserDetails = {...newUserDetails};
    // if the field in the state is not initialised, set it to true
    if (!newNewUserDetails.isAdmin) {
      newNewUserDetails[field] = true;
      setNewUserDetails(newNewUserDetails);
    }
    // else, toggle between true and false depending on curr state
    newNewUserDetails[field] = !newNewUserDetails[field];
    setNewUserDetails(newNewUserDetails);
  };

  const onAddition = (tag) => {
    // get the form info that is currently saved in user's local storage
    let newProps = {...props};
    newProps.tags = [...newProps.tags, tag];
    setProps(newProps);
  };

  const onDelete = (i) => {
    let newProps = {...props};
    newProps.tags = newProps.tags.slice(0);
    newProps.tags.splice(i, 1);
    setProps(newProps);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            Delete User
            <Row>
              <Col>Find User:</Col>
              <Col>
                <ReactTags
                  suggestions={props.suggestions}
                  tags={props.tags}
                  onDelete={onDelete}
                  onAddition={onAddition}
                  noSuggestionsText="User not found"
                />
              </Col>
            </Row>
          </Col>
          <Col>
            Add User
            <Row>
              <Col>
                <Form>
                  <div className="col add-user-details d-flex flex-row justify-content-start">
                    <div className="create-listing-header ml-1">
                      About Item (1/4)
                    </div>
                  </div>
                  <Form.Group
                    className="ml-3 mt-3"
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
                    className="ml-3 mt-3"
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
                    className="ml-3 mt-3"
                    controlId="add-user-details-form ">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="text"
                      placeholder="Default if blank: 123456789"
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
                      label="Is new user an"
                      value={newUserDetails.isAdmin}
                      onChange={(e) => handleCheckBoxChange(e, 'isAdmin')}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
