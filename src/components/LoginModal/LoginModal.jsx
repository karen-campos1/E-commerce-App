import React, { useState, useContext } from "react";
import { Modal, Button, Form, FloatingLabel, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import styles from "./LoginModal.module.css";

function LoginModal({ show, handleClose }) {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      setUser({ name: username, isLoggedIn: true });
      handleClose();
      setAlertMessage("Login successful!");
      setAlertVariant("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Login error:", error);
      setAlertMessage("Invalid username or password. Please try again.");
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="" type="submit" className="login">
              Login
            </Button>
          </Form>
          <div className={styles.links}>
            <Link to="/customers/new" onClick={handleClose}>
              Not a member? Register here
            </Link>
            <br />
            <Link to="/update-delete-account" onClick={handleClose}>
              Update your account
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
