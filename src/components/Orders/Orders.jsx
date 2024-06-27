import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Orders.module.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderData, setNewOrderData] = useState({ customer_id: '', date: '', product_id: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    axios.get('http://127.0.0.1:5000/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  };

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleOrderChange = (event) => {
    const { name, value } = event.target;
    setNewOrderData({ ...newOrderData, [name]: value });
  };

  const handleAddOrder = (event) => {
    event.preventDefault();
    const data = { customer_id: newOrderData.customer_id, date: newOrderData.date };

    axios.post('http://127.0.0.1:5000/orders', data)
      .then(response => {
        const orderId = response.data.order_id;
        handleAddProductToOrder(orderId);
      })
      .catch(error => {
        console.error('Error adding order:', error);
        setModalMessage('Error adding order');
        setShowModal(true);
      });
  };

  const handleAddProductToOrder = (order_id) => {
    const data = { product_id: newOrderData.product_id };

    axios.post(`http://127.0.0.1:5000/orders/${order_id}/add_product`, data)
      .then(() => {
        fetchOrders();
        setNewOrderData({ customer_id: '', date: '', product_id: '' });
        setModalMessage('Product added to order successfully');
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error adding product to order:', error);
        setModalMessage('Error adding product to order');
        setShowModal(true);
      });
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setNewOrderData({ customer_id: order.customer_id, date: order.date, product_id: '' });
  };

  const handleUpdateOrder = (event) => {
    event.preventDefault();
    const data = { customer_id: newOrderData.customer_id, date: newOrderData.date };

    axios.put(`http://127.0.0.1:5000/orders/${selectedOrder.order_id}`, data)
      .then(response => {
        setOrders(orders.map(order => order.order_id === selectedOrder.order_id ? response.data : order));
        setSelectedOrder(null);
        setNewOrderData({ customer_id: '', date: '', product_id: '' });
        setModalMessage('Order updated successfully');
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error updating order:', error);
        setModalMessage('Error updating order');
        setShowModal(true);
      });
  };

  const handleDeleteOrder = (order_id) => {
    axios.delete(`http://127.0.0.1:5000/orders/${order_id}`)
      .then(() => {
        setOrders(orders.filter(order => order.order_id !== order_id));
        setModalMessage('Order deleted successfully');
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error deleting order:', error);
        setModalMessage('Error deleting order');
        setShowModal(true);
      });
  };

  return (
    <div className={styles.orders}>
      <h2 className={styles.title}>{selectedOrder ? 'Edit Order' : 'Add Order'}</h2>
      <form onSubmit={selectedOrder ? handleUpdateOrder : handleAddOrder} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Customer ID:</label>
          <input
            type="number"
            name="customer_id"
            value={newOrderData.customer_id}
            onChange={handleOrderChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date:</label>
          <input
            type="date"
            name="date"
            value={newOrderData.date}
            onChange={handleOrderChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Product:</label>
          <select
            name="product_id"
            value={newOrderData.product_id}
            onChange={handleOrderChange}
            className={styles.select}
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.product_id} value={product.product_id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.button}>{selectedOrder ? 'Update Order' : 'Add Order'}</button>
      </form>

      {selectedOrder && (
        <button onClick={() => handleAddProductToOrder(selectedOrder.order_id)} className={styles.button}>
          Add Product to Order
        </button>
      )}

      <h3 className={styles.subtitle}>Order List</h3>
      <ul className={styles.orderList}>
        {orders.map(order => (
          <li key={order.order_id} className={styles.orderItem}>
            <div className={styles.orderDetails}>
              <strong>Order ID:</strong> {order.order_id} <br />
              <strong>Customer ID:</strong> {order.customer_id} <br />
              <strong>Date:</strong> {order.date}
            </div>
            <div className={styles.orderProducts}>
              <h4>Products</h4>
              <ul className={styles.productList}>
                {(order.products || []).map(product => (
                  <li key={product.product_id} className={styles.productItem}>{product.name}</li>
                ))}
              </ul>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => handleEditOrder(order)} className={styles.button}>Edit</button>
              <button onClick={() => handleDeleteOrder(order.order_id)} className={styles.button}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmationModal
        show={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Orders;
