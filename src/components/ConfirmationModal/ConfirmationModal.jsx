import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './ConfirmationModal.module.css';

function ConfirmationModal({ show, message, onClose }) {
  return (
    <Modal show={show} onHide={onClose} dialogClassName={styles.modalContent}>
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title className={styles.modalTitle}>Notification</Modal.Title>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>{message}</Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button className={styles.confirmButton} onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
