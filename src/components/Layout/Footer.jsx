import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './Footer.module.css';
import soleneLogo from '../../assets/SOLENE_brand_white.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewsletterSignUp = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <footer className={styles.footer}>
      <div className="container footer">
        <div className="row justify-content-between">
          <div className="col-md-4 mt-3">
            <h5 className={styles.text}>Contact Us</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:info@solene.com" className={styles.accentText}>info@solene.com</a></li>
              <li><a href="tel:+1234567890" className={styles.accentText}>+1 234 567 8901</a></li>
              <li><a href="#" className={styles.accentText}>123 Solene Way</a></li>
              <li><a href="#" className={styles.accentText}>New York, NY 10001</a></li>
            </ul>
          </div>
          <div className="col-md-4 my-3">
            <img src={soleneLogo} alt="Footer Image" className="img-fluid" />
          </div>
          <div className="col-md-4 mt-3">
            <h5 className={styles.text}>Quick Links</h5>
            <ul className="list-unstyled">
            <li><Link to="/privacy-policy" className={styles.accentText}>Privacy Policy</Link></li>
            <li><Link to="/terms-of-use" className={styles.accentText}>Terms of Use</Link></li>
              <li><a href="#"><FaFacebook /> Facebook</a></li>
              <li><a href="#"><FaInstagram /> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <h5 className={styles.text}>Subscribe to our Newsletter</h5>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSignUp}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
                className={styles.newsletterInput}
              />
              <Button type="submit" className={styles.newsletterButton}>Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center p-3" id="copyBanner">
      <p> &copy; 2024 SOLÉNE. All rights reserved.</p> 
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Newsletter Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>You've successfully signed up for our newsletter!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
}

export default Footer;
