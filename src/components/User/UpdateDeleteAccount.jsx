import React, { useContext, useState } from 'react';
import UpdateUser from '../User/UpdateUser';
import DeleteUser from '../User/DeleteUser';
import UserContext from '../../context/UserContext';
import { Alert } from 'react-bootstrap';
import styles from './UpdateDeleteAccount.module.css';


function UpdateDeleteAccount() {
  const { user, setUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleUserDelete = (userId) => {
    sessionStorage.removeItem('user');
    setUser({ name: '', isLoggedIn: false });
    setAlertMessage('Account deleted successfully.');
    setShowAlert(true);

    // WILL ADD LATER A: Redirect to homepage or any other page if needed
    // For example:
    // navigate('/');
  };

  return (
    <div className={styles.updateDeleteAccount}>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <UpdateUser />
      <DeleteUser userId={user.id} handleUserDelete={handleUserDelete} />
    </div>
  );
}

export default UpdateDeleteAccount;
