import React, { useState, useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginModal from '../LoginModal/LoginModal'; 
import UserContext from "../../context/UserContext";
import styles from './NavBar.module.css';
import { useSelector } from 'react-redux';

function NavBar() {
  const { user } = useContext(UserContext);
  const cart = useSelector(state => state.cart);
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://127.0.0.1:5000/products/by-name?name=${searchQuery}`)
      .then(response => {
        console.log(response.data);
        navigate('/shop', { state: { searchResults: response.data } });
      })
      .catch(error => console.error('Error fetching search results:', error));
  };

  const handleLoginModalOpen = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    // Handle user login (e.g., store token and user data)
  };

  return (
    <div>
      <div className={styles.logoContainer}>
        <LinkContainer to="/">
          <Navbar.Brand className={styles.brand}>SOLÉNE</Navbar.Brand>
        </LinkContainer>
      </div>
      <Navbar bg="light" expand="lg" className={styles.navbar}>
        <Container>
          <Row>
            <Col>
              <h6 className={`${styles.userInfo} mx-3 mt-2`}>User: {user.name}</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={styles.navLinks}>
                  <LinkContainer to="/shop">
                    <Nav.Link className={styles.navLink}>Shop</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Account" id="account-dropdown" className={styles.navDropdown}>
                    <LinkContainer to="/customers/new">
                      <NavDropdown.Item className={styles.dropdownItem}>Create Account</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/customers/edit">
                      <NavDropdown.Item className={styles.dropdownItem}>Edit Account</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/customers/list">
                      <NavDropdown.Item className={styles.dropdownItem}>Account Details</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Orders" id="orders-dropdown" className={styles.navDropdown}>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item className={styles.dropdownItem}>Order Details</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item className={styles.dropdownItem}>Order Tracking</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Administration" id="admin-dropdown" className={styles.navDropdown}>
                    <LinkContainer to="/customers/list">
                      <NavDropdown.Item className={styles.dropdownItem}>User Accounts</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item className={styles.dropdownItem}>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item className={styles.dropdownItem}>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className={`me-2 ${styles.searchInput}`}
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Button type="submit" className={styles.searchButton}>Search</Button>
                </Form>
                <LinkContainer to="/cart">
                  <Nav.Link className={styles.cartIcon}>
                    <FaShoppingCart />
                    {totalQuantity > 0 && (
                      <span className={styles.cartBadge}>{totalQuantity}</span>
                    )}
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLoginModalOpen} className={styles.loginButton}>Login</Nav.Link>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} handleLogin={handleLogin} />
    </div>
  );
}

export default NavBar;
