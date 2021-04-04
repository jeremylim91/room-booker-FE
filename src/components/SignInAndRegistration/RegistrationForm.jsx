// import React, {useState, useContext} from 'react';
// import axios from 'axios';
// import {Button, Form} from 'react-bootstrap';
// import NumberFormat from 'react-number-format';
// import {
//   BACKEND_URL,
//   RoomBookerContext,
//   setLoggedInUsername,
// } from '../../store.jsx';

// export default function RegistrationForm() {
//   // const { setLoggedIn, setUsername } = registrationFormProps;
//   const [usernameInput, setUsernameInput] = useState('');
//   const [passwordInput, setPasswordInput] = useState('');
//   const [emailInput, setEmailInput] = useState('');
//   const [handphoneNumInput, setHandphoneNumInput] = useState('');

//   const {dispatch} = useContext(RoomBookerContext);

//   function handleUsernameInput(event) {
//     setUsernameInput(event.target.value);
//   }

//   function handlePasswordInput(event) {
//     setPasswordInput(event.target.value);
//   }

//   function handleEmailInput(event) {
//     setEmailInput(event.target.value);
//   }

//   function handleHandphoneNumInput(event) {
//     setHandphoneNumInput(event.target.value);
//   }

//   function handleRegistration() {
//     axios
//       .post(
//         `${BACKEND_URL}/register`,
//         {
//           username: usernameInput,
//           password: passwordInput,
//           email: emailInput,
//           handphoneNum: handphoneNumInput,
//         },
//         {withCredentials: true}
//       )
//       .then((result) => {
//         setUsernameInput('');
//         setPasswordInput('');
//         dispatch(setLoggedInUsername(result.data.user.username));
//       })
//       .catch((err) => console.log(err));
//   }

//   return (
//     <div className="login-form">
//       <Form>
//         <Form.Group controlId="formBasicEmail">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Username"
//             value={usernameInput}
//             onChange={handleUsernameInput}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formBasicPassword">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             placeholder="Email"
//             type="email"
//             value={emailInput}
//             onChange={handleEmailInput}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formHandphoneNumber">
//           <Form.Label>Paynow Handphone Number</Form.Label>
//           <NumberFormat
//             className="form-control"
//             format="+65 #### ####"
//             mask="_"
//             onChange={handleHandphoneNumInput}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             placeholder="Password"
//             type="password"
//             value={passwordInput}
//             onChange={handlePasswordInput}
//             required
//           />
//         </Form.Group>
//         <Button variant="secondary" onClick={handleRegistration}>
//           Register
//         </Button>
//       </Form>
//     </div>
//   );
// }
