import React from 'react';
import styles from './PrivacyPolicy.module.css';

function PrivacyPolicy() {
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
      }

  return (
    <div className={styles.privacyPolicy}>
      <h1>Privacy Policy</h1>
      <p>Last updated: {getDate()} </p>

      <section className={styles.section}>
        <h2>Introduction</h2>
        <p>Welcome to SOLÉNE. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regard to your personal information, please contact us at info@solene.com.</p>
      </section>

      <section className={styles.section}>
        <h2>Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide to us when you register on the website, make a purchase, or contact us. This may include your name, email address, phone number, and payment information.</p>
      </section>

      <section className={styles.section}>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to fulfill orders, manage your account, provide customer support, and send promotional communications. We may also use your information for internal analytics to improve our services.</p>
      </section>

      <section className={styles.section}>
        <h2>Sharing Your Information</h2>
        <p>We do not share your personal information with third parties except as necessary to process your order (e.g., payment processors) or as required by law.</p>
      </section>

      <section className={styles.section}>
        <h2>Data Security</h2>
        <p>We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, use, or disclosure.</p>
      </section>

      <section className={styles.section}>
        <h2>Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. You may also object to our processing of your personal information or request that we restrict processing. To exercise these rights, please contact us at info@solene.com.</p>
      </section>

      <section className={styles.section}>
        <h2>Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this policy periodically for any changes.</p>
      </section>

      <section className={styles.section}>
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about this privacy policy, please contact us at:</p>
        <p>Email: info@solene.com</p>
        <p>Phone: +1 234 567 8901</p>
        <p>Address: 123 SOLÉNE Street, New York, NY 10001</p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
