import React, { useState, useContext } from 'react';
import { Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import styles from './UpdateUser.module.css';

function UpdateUser() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:5000/users/${user.id}`, { username, email, password }, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(response => {
        const updatedUser = response.data;
        sessionStorage.setItem('user', JSON.stringify({ ...updatedUser, isLoggedIn: true, token: user.token }));
        setUser({ ...updatedUser, isLoggedIn: true, token: user.token });
      })
      .catch(error => {
        console.error('Update error:', error);
      });
  };

  return (
    <Container className={styles.updateUser}>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} className="p-4 border rounded mt-5">
            <FloatingLabel controlId="userName" label="Username" className="mb-3">
              <Form.Control
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="email" label="Email" className="mb-3">
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Password" className="mb-3">
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </FloatingLabel>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateUser;
