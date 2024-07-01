import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminProducts.module.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', description: '', price: '', img_url: '', category: ''});
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image_url: formData.img_url,
      category: formData.category
    };

    if (isEdit) {
      axios.put(`http://127.0.0.1:5000/products/${formData.id}`, data)
        .then(response => {
          setProducts(products.map(product => product.id === formData.id ? response.data : product));
          setIsEdit(false);
          setFormData({ id: '', name: '', description: '', price: '', img_url: '', category: '' });
          setModalMessage('Product updated successfully');
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error updating product:', error);
          setModalMessage('Error updating product');
          setShowModal(true);
        });
    } else {
      axios.post('http://127.0.0.1:5000/products', data)
        .then(response => {
          setProducts([...products, response.data]);
          setFormData({ id: '', name: '', description: '', price: '', img_url: '', category: '' });
          setModalMessage('Product added successfully');
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error adding product:', error);
          setModalMessage('Error adding product');
          setShowModal(true);
        });
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.product_id,
      name: product.name,
      description: product.description,
      price: product.price,
      img_url: product.image_url,
      category: product.category
    });
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.product_id !== id));
        setModalMessage('Product deleted successfully');
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        setModalMessage('Error deleting product');
        setShowModal(true);
      });
  };

  return (
    <div className={styles.adminProducts}>
      <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="hidden" name="id" value={formData.id} />
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="img_url">Image URL:</label>
          <input type="text" id="img_url" name="img_url" value={formData.img_url} onChange={handleChange} required />
        </div>
        <button type="submit" className={styles.submitButton}>{isEdit ? 'Update' : 'Add'}</button>
      </form>
      <h3>Product List</h3>
      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product.product_id} className={styles.productItem}>
            <div>
              <strong>{product.name}</strong> - ${product.price}
              <p>{product.description}</p>
              <img src={product.image_url} alt={product.name} className={styles.productImage} />
            </div>
            <div className={styles.buttons}>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.product_id)}>Delete</button>
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

export default AdminProducts;
