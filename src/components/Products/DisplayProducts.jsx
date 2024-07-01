import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../../slices/cartSlice';
import styles from './DisplayProducts.module.css';
import models from '../../assets/models_headshot.jpg';

function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [nameFilter, setNameFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

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

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    console.log('Product added to cart:', selectedProduct);
    dispatch(addItem({ product_id: selectedProduct.product_id, name: selectedProduct.name, price: selectedProduct.price, image_url: selectedProduct.image_url, description: selectedProduct.description }));
    setShowModal(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesName = nameFilter === 'All' || product.name === nameFilter;
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesName && matchesCategory;
  });

  const productNames = [...new Set(products.map(product => product.name))];
  const productCategories = [...new Set(products.map(product => product.category))];

  return (
    <>
      <div className={styles.productPage}>
        <div className={styles.bannerContainer}>
          <img src={models} alt="Product Banner" className={styles.bannerImage} />
          <div className={styles.bannerContent}></div>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <label htmlFor="nameFilter">Filter by Brand: </label>
        <select id="nameFilter" onChange={handleNameFilterChange}>
          <option value="All">All Products</option>
          {productNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select id="categoryFilter" onChange={handleCategoryFilterChange}>
          <option value="All">All Categories</option>
          {productCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className={styles.productGrid}>
        {filteredProducts.map(product => (
          <div key={product.product_id} className={styles.card} onClick={() => handleCardClick(product)}>
            <img src={product.image_url || 'default-image-url.jpg'} alt={product.name} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{product.name}</h3>
              <p className={styles.cardDescription}>{product.description}</p>
              <p className={styles.cardPrice}>${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalContent}>
            <img src={selectedProduct.image_url || 'default-image-url.jpg'} alt={selectedProduct.name} className={styles.modalImage} />
            <h3 className={styles.modalTitle}>{selectedProduct.name}</h3>
            <p className={styles.modalDescription}>{selectedProduct.description}</p>
            <p className={styles.modalPrice}>Price: ${selectedProduct.price}</p>
            <p className={styles.modalCategory}>Category: {selectedProduct.category}</p>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Button variant="secondary" onClick={handleCloseModal} className={styles.modalButton}>
              Close
            </Button>
            <Button variant="" onClick={handleAddToCart} className={styles.modalButton}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default DisplayProducts;
