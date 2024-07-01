import React from 'react';
import styles from './TermsOfUse.module.css';
import TermsOfUsePDF from '../../assets/SOLENETermsOfUse.pdf';

function TermsOfUse() {

  return (
    <div className={styles.termsOfUse}>
      <h1>Terms of Use</h1>
      
      <section className={styles.section}>
        <div className={styles.title}>
        <h2>Welcome to SOLÉNE</h2>
        </div>
        <h2>Download Terms of Use</h2>
        <p>
          For your convenience, you can download a PDF version of our Terms of Use
          by clicking the link below:
        </p>
        <a href={TermsOfUsePDF} download className={styles.btn}>
          Download Terms of Use PDF
        </a>

  
        <p><br></br>
          Welcome to SOLÉNE! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern SOLÉNE's relationship with you in relation to this website.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2>Terms</h2>
        <p>
          The terms "SOLÉNE," "us," "we," or "our" refer to the owner of the website. The term "you" refers to the user or viewer of our website.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2>Use of the Site</h2>
        <h3>Eligibility</h3>
        <p>
          You must be at least 18 years of age to use our website. By using this website, you represent and warrant that you are at least 18 years old.
        </p>
        <h3>Account</h3>
        <p>
          You may be required to create an account and specify a password to use certain features on the website. You agree to provide accurate, current, and complete information during the registration process and update such information to keep it accurate, current, and complete. You are solely responsible for safeguarding your password.
        </p>
        <h3>Prohibited Activities</h3>
        <p>
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul>
          <li>Using the site for any unlawful purpose or in any manner that could damage, disable, overburden, or impair the site.</li>
          <li>Engaging in any conduct that restricts or inhibits any other user from using or enjoying the site.</li>
          <li>Attempting to gain unauthorized access to the site, user accounts, computer systems, or networks connected to the site through hacking, password mining, or any other means.</li>
        </ul>
      </section>
      
      <section className={styles.section}>
        <h2>Intellectual Property Rights</h2>
        <h3>Ownership</h3>
        <p>
          All content on the site, including but not limited to text, graphics, logos, images, and software, is the property of SOLÉNE or its content suppliers and is protected by international copyright laws. The compilation of all content on the site is the exclusive property of SOLÉNE.
        </p>
        <h3>License and Access</h3>
        <p>
          SOLÉNE grants you a limited license to access and make personal use of this site and not to download (other than page caching) or modify it, or any portion of it, except with express written consent of SOLÉNE. This license does not include any resale or commercial use of this site or its contents.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2>Product Descriptions</h2>
        <p>
          SOLÉNE attempts to be as accurate as possible. However, SOLÉNE does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by SOLÉNE itself is not as described, your sole remedy is to return it in unused condition.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2>Pricing</h2>
        <p>
          Except where noted otherwise, the list price displayed for products on our website represents the full retail price listed on the product itself. Prices are subject to change without notice.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2>Disclaimer of Warranties and Limitation of Liability</h2>
        <p>
          This site is provided by SOLÉNE on an "as is" and "as available" basis. SOLÉNE makes no representations or warranties
        </p>
      </section>
    </div>
  );
}

export default TermsOfUse;
