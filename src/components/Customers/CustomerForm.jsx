import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CustomerForm.module.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function CustomerForm() {
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', phone: '', username: '', password: '', customer_id: '' });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios.put(`http://127.0.0.1:5000/customers/${formData.id}`, formData)
        .then(response => {
          setCustomers(customers.map(customer => customer.id === formData.id ? response.data : customer));
          setIsEdit(false);
          setFormData({ id: '', name: '', email: '', phone: '' });
          setModalMessage('Customer updated successfully');
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error updating customer:', error);
          setModalMessage(`Error updating customer: ${error.response ? error.response.data : error.message}`);
          setShowModal(true);
        });
    } else {
      axios.post('http://127.0.0.1:5000/customers', formData)
        .then(response => {
          setCustomers([...customers, response.data]);
          setFormData({ id: '', name: '', email: '', phone: '' });
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
      axios.put(`http://127.0.0.1:5000/customer_accounts/${formData.customer_id}`, formData)
        .then(response => {
          setAccounts(accounts.map(account => account.id === formData.customer_id ? response.data : account));
          setIsEditAccount(false);
          setFormData({ id: '', username: '', password: '', customer_id: '' });
          setModalMessage('Account updated successfully');
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error updating account:', error);
          setModalMessage(`Error updating account: ${error.response ? error.response.data : error.message}`);
          setShowModal(true);
        });
    } else {
      axios.post('http://127.0.0.1:5000/customer_accounts', formData)
        .then(response => {
          setAccounts([...accounts, response.data]);
          setFormData({ id: '', username: '', password: '', customer_id: '' });
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
    setFormData(customer);
    setIsEdit(true);
  };

  const handleEditAccount = (account) => {
    setFormData(account);
    setIsEditAccount(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/customers/${id}`)
      .then(() => {
        setCustomers(customers.filter(customer => customer.id !== id));
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
        setAccounts(accounts.filter(account => account.id !== id));
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={formData.id} />
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <button type="submit" className={styles.submitButton}>{isEdit ? 'Update' : 'Add'}</button>
        </form>
        <h2>{isEditAccount ? 'Edit Account' : 'Add Account'}</h2>
        <form onSubmit={handleAccountSubmit} className={styles.form}>
          <input type="hidden" name="customer_id" value={formData.customer_id} />
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Customer ID:</label>
            <input type="number" name="customer_id" value={formData.customer_id} onChange={handleChange} required />
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
