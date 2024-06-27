import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DisplayProducts.module.css';

function DisplayProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => {
        console.log('Fetched products:', response.data); // Log the fetched products
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };
  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <div key={product.product_id} className={styles.card}>
          <img src={product.image_url || 'default-image-url.jpg'} alt={product.name} className={styles.cardImage} />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{product.name}</h3>
            <p className={styles.cardDescription}>{product.description}</p>
            <p className={styles.cardPrice}>${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayProducts;
