// src/components/Cart/ShoppingCart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { removeItem, updateQuantity, clearCart } from '../../slices/cartSlice';
import styles from './ShoppingCart.module.css';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleIncreaseQuantity = (product_id) => {
    dispatch(updateQuantity({ product_id, quantity: 1 }));
  };

  const handleDecreaseQuantity = (product_id) => {
    dispatch(updateQuantity({ product_id, quantity: -1 }));
  };

  const handleRemoveItem = (product_id) => {
    dispatch(removeItem(product_id));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    alert('Checkout successful! Your cart has been cleared.');
  };

  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row>
            <Col md={8}>
              {cart.items.map((item) => (
                <Card className={styles.cartItem} key={item.product_id}>
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <Card.Img variant="top" src={item.image_url} />
                      </Col>
                      <Col md={8}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>${item.price}</Card.Text>
                        <div className={styles.quantityControls}>
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleDecreaseQuantity(item.product_id)}
                          >
                            -
                          </Button>
                          <Form.Control
                            className={styles.quantityInput}
                            type="text"
                            readOnly
                            value={item.quantity}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleIncreaseQuantity(item.product_id)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="danger"
                          className={styles.removeButton}
                          onClick={() => handleRemoveItem(item.product_id)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col md={4}>
              <Card className={styles.summaryCard}>
                <Card.Body>
                  <Card.Title>Summary</Card.Title>
                  <Card.Text>Total Items: {totalItems}</Card.Text>
                  <Card.Text>Total Price: ${totalPrice.toFixed(2)}</Card.Text>
                  <Button variant="success" onClick={handleCheckout} className={styles.checkoutButton}>
                    Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
