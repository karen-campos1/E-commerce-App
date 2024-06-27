import React from 'react';
import styles from './Footer.module.css';
import soleneLogo from '../../assets/SOLENE_brand_white.png';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
<footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`${styles.col} ${styles.contact}`}>
            <h5 className={styles.text}>Contact Us</h5>
            <ul className={styles.listUnstyled}>
              <li><a href="mailto:info@solene.com" className={styles.accentText}>info@solene.com</a></li>
              <li><a href="tel:+1234567890" className={styles.accentText}>+1 234 567 8901</a></li>
              <li><a href="#" className={styles.accentText}>123 Solene Way</a></li>
              <li><a href="#" className={styles.accentText}>New York, NY 10001</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <img src={soleneLogo} alt="Footer Image" className={styles.imgFluid} />
          </div>
          <div className={`${styles.col} ${styles.quickLinks}`}>
            <h5 className={styles.text}>Quick Links</h5>
            <ul className={styles.listUnstyled}>
              <li><a href="privacy_policy.html" className={styles.accentText}>Privacy Policy</a></li>
              <li><a href="terms_of_use.html" className={styles.accentText}>Terms of Use</a></li>
              <li><a href="#"><FaFacebook /> Facebook</a></li>
              <li><a href="#"><FaInstagram /> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className={`${styles.row} ${styles.mt3}`}>
        </div>
      </div>
      <div className={styles.copyBanner}>
        &copy; 2024 Solene. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
