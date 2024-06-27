import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import styles from './CustomerList.module.css';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));

    axios.get('http://127.0.0.1:5000/customer_accounts')
      .then(response => setAccounts(response.data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/customers/${id}`)
      .then(() => setCustomers(customers.filter(customer => customer.customer_id !== id)))
      .catch(error => console.error('Error deleting customer:', error));
  };

  const handleDeleteAccount = (id) => {
    axios.delete(`http://127.0.0.1:5000/customer_accounts/${id}`)
      .then(() => setAccounts(accounts.filter(account => account.account_id !== id)))
      .catch(error => console.error('Error deleting account:', error));
  };

  return (
    <div className={styles.customerList}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Customer List</Accordion.Header>
          <Accordion.Body>
            <ul className={styles.list}>
              {customers.map(customer => (
                <li key={customer.customer_id} className={styles.listItem}>
                  <div>
                    <strong>Customer ID:</strong> {customer.customer_id} <br />
                    <strong>Name:</strong> {customer.name} <br />
                    <strong>Email:</strong> {customer.email} <br />
                    <strong>Phone:</strong> {customer.phone}
                  </div>
                  <div>
                    <Button variant="outline-primary" onClick={() => handleEdit(customer)} className={styles.editButton}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(customer.customer_id)} className={styles.deleteButton}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Customer Account List</Accordion.Header>
          <Accordion.Body>
            <ul className={styles.list}>
              {accounts.map(account => (
                <li key={account.account_id} className={styles.listItem}>
                  <div>
                    <strong>Account ID:</strong> {account.account_id} <br />
                    <strong>Username:</strong> {account.username} <br />
                    <strong>Customer ID:</strong> {account.customer_id}
                  </div>
                  <div>
                    <Button variant="outline-primary" onClick={() => handleEditAccount(account)} className={styles.editButton}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => handleDeleteAccount(account.account_id)} className={styles.deleteButton}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CustomerList;
