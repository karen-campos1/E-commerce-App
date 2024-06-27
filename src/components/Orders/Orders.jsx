import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Accordion } from 'react-bootstrap';
import styles from './Orders.module.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productToAdd, setProductToAdd] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    axios.get('http://127.0.0.1:5000/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  };

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleAddProductToOrder = (orderId) => {
    const data = { product_id: productToAdd };

    axios.post(`http://127.0.0.1:5000/orders/${orderId}/add_product`, data)
      .then(response => {
        console.log('Product added successfully:', response.data);
        fetchOrders(); // Refresh the order list
      })
      .catch(error => console.error('Error adding product to order:', error));
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
  };

  const handleDelete = (orderId) => {
    axios.delete(`http://127.0.0.1:5000/orders/${orderId}`)
      .then(() => {
        setOrders(orders.filter(order => order.order_id !== orderId));
      })
      .catch(error => console.error('Error deleting order:', error));
  };

  return (
    <div className={styles.orderPage}>
      <h2>Orders</h2>
      <Accordion defaultActiveKey="0">
        {orders.map(order => (
          <Accordion.Item eventKey={order.order_id.toString()} key={order.order_id}>
            <Accordion.Header>Order ID: {order.order_id}</Accordion.Header>
            <Accordion.Body>
              <ul className={styles.list}>
                <li key={order.order_id}>
                  <div>
                    <strong>Order ID:</strong> {order.order_id} <br />
                    <strong>Customer ID:</strong> {order.customer_id} <br />
                    <strong>Date:</strong> {order.date}
                  </div>
                  <div>
                    <Button variant="outline-" onClick={() => handleEdit(order)} className={styles.editButton}>Edit</Button>
                    <Button variant="outline-" onClick={() => handleDelete(order.order_id)} className={styles.deleteButton}>Delete</Button>
                  </div>
                </li>
                <li>
                  <div>
                    <select value={productToAdd} onChange={(e) => setProductToAdd(e.target.value)}>
                      <option value="">Select a product to add</option>
                      {products.map(product => (
                        <option key={product.product_id} value={product.product_id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <Button onClick={() => handleAddProductToOrder(order.order_id)}>Add</Button>
                  </div>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default Orders;
