import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import styles from './DeleteUser.module.css';

function DeleteUser({ userId, handleUserDelete }) {
  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:5000/customer_accounts/${userId}`)
      .then(() => {
        handleUserDelete(userId);
      })
      .catch(error => {
        console.error('Delete error:', error);
      });
  };

  return (
    <Container className={styles.deleteUser}>
      <Row>
        <Col>
          <Button variant="danger" onClick={handleDelete}>
            Delete Account
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DeleteUser;
