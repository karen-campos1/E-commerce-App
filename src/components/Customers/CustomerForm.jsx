import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CustomerForm.module.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function CustomerForm() {
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [customerFormData, setCustomerFormData] = useState({ name: '', email: '', phone: '' });
  const [accountFormData, setAccountFormData] = useState({ username: '', password: '', customer_id: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [isEditAccount, setIsEditAccount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));

    axios.get('http://127.0.0.1:5000/customer_accounts')
      .then(response => setAccounts(response.data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerFormData({ ...customerFormData, [name]: value });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountFormData({ ...accountFormData, [name]: value });
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios.put(`http://127.0.0.1:5000/customers/${customerFormData.customer_id}`, customerFormData)
        .then(response => {
          setCustomers(customers.map(customer => customer.customer_id === customerFormData.customer_id ? response.data : customer));
          setIsEdit(false);
          setCustomerFormData({ name: '', email: '', phone: '' });
          setModalMessage('Customer updated successfully');
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error updating customer:', error);
          setModalMessage(`Error updating customer: ${error.response ? error.response.data : error.message}`);
          setShowModal(true);
        });
    } else {
      axios.post('http://127.0.0.1:5000/customers', customerFormData)
        .then(response => {
          setCustomers([...customers, response.data]);
          setCustomerFormData({ name: '', email: '', phone: '' });
          setModalMessage('Customer added successfully');
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error adding customer:', error);
          setModalMessage(`Error adding customer: ${error.response ? error.response.data : error.message}`);
          setShowModal(true);
        });
    }
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (isEditAccount) {
      axios.put(`http://127.0.0.1:5000/customer_accounts/${accountFormData.customer_id}`, accountFormData)
        .then(response => {
          setAccounts(accounts.map(account => account.account_id === accountFormData.account_id ? response.data : account));
          setIsEditAccount(false);
          setAccountFormData({ username: '', password: '', customer_id: '' });
          setModalMessage('Account updated successfully');
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error updating account:', error);
          setModalMessage(`Error updating account: ${error.response ? error.response.data : error.message}`);
          setShowModal(true);
        });
    } else {
      axios.post('http://127.0.0.1:5000/customer_accounts', accountFormData)
        .then(response => {
          setAccounts([...accounts, response.data]);
          setAccountFormData({ username: '', password: '', customer_id: '' });
          setModalMessage('Account added successfully');
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error adding account:', error);
          setModalMessage(`Error adding account: ${error.response ? error.response.data : error.message}`);
          setShowModal(true);
        });
    }
  };

  const handleEdit = (customer) => {
    setCustomerFormData(customer);
    setIsEdit(true);
  };

  const handleEditAccount = (account) => {
    setAccountFormData(account);
    setIsEditAccount(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/customers/${id}`)
      .then(() => {
        setCustomers(customers.filter(customer => customer.customer_id !== id));
        setModalMessage('Customer deleted successfully');
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
        setModalMessage(`Error deleting customer: ${error.response ? error.response.data : error.message}`);
        setShowModal(true);
      });
  };

  const handleDeleteAccount = (id) => {
    axios.delete(`http://127.0.0.1:5000/customer_accounts/${id}`)
      .then(() => {
        setAccounts(accounts.filter(account => account.account_id !== id));
        setModalMessage('Account deleted successfully');
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error deleting account:', error);
        setModalMessage(`Error deleting account: ${error.response ? error.response.data : error.message}`);
        setShowModal(true);
      });
  };

  return (
    <>
      <div className={styles.customerForm}>
        <h2>{isEdit ? 'Edit Customer' : 'Add Customer'}</h2>
        <form onSubmit={handleCustomerSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input type="text" name="name" value={customerFormData.name} onChange={handleCustomerChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" name="email" value={customerFormData.email} onChange={handleCustomerChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Phone:</label>
            <input type="text" name="phone" value={customerFormData.phone} onChange={handleCustomerChange} required />
          </div>
          <button type="submit" className={styles.submitButton}>{isEdit ? 'Update' : 'Add'}</button>
        </form>
        <h2>{isEditAccount ? 'Edit Account' : 'Add Account'}</h2>
        <form onSubmit={handleAccountSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input type="text" name="username" value={accountFormData.username} onChange={handleAccountChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input type="password" name="password" value={accountFormData.password} onChange={handleAccountChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Customer ID:</label>
            <input type="number" name="customer_id" value={accountFormData.customer_id} onChange={handleAccountChange} required />
          </div>
          <button type="submit" className={styles.submitButton}>{isEditAccount ? 'Update' : 'Add'}</button>
        </form>
      </div>
      <h3>Customer List</h3>
      <ul className={styles.customerList}>
        {customers.map(customer => (
          <li key={customer.customer_id} className={styles.customerItem}>
            {customer.customer_id}: {customer.name} ({customer.email}) - {customer.phone}
            <div className={styles.buttons}>
              <button onClick={() => handleEdit(customer)}>Edit</button>
              <button onClick={() => handleDelete(customer.customer_id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Account List</h3>
      <ul className={styles.customerList}>
        {accounts.map(account => (
          <li key={account.account_id} className={styles.customerItem}>
            {account.account_id}: {account.username} - {account.customer_id}
            <div className={styles.buttons}>
              <button onClick={() => handleEditAccount(account)}>Edit</button>
              <button onClick={() => handleDeleteAccount(account.account_id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmationModal
        show={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default CustomerForm;
