import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './NavBar.module.css';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <div>
      <div className={styles.logoContainer}>
        <LinkContainer to="/">
          <Navbar.Brand className={styles.brand}>SOLÉNE</Navbar.Brand>
        </LinkContainer>
      </div>
      <Navbar bg="light" expand="lg" className={styles.navbar}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container className={styles.navLinksContainer}>
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
          </Container>
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
            </Nav.Link>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
