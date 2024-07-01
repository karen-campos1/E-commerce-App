import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from './components/Layout/NavBar';
import HomePage from './components/HomePage/HomePage';
import CustomerForm from './components/Customers/CustomerForm';
import CustomerList from './components/Customers/CustomerList';
import Orders from './components/Orders/Orders';
import AdminProducts from './components/Products/AdminProducts';
import DisplayProducts from './components/Products/DisplayProducts'; 
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import UpdateDeleteAccount from './components/User/UpdateDeleteAccount';
import TermsOfUse from './components/Legal/TermsOfUse';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import Footer from './components/Layout/Footer'; 
import NotFound from './components/NotFound/NotFound';
import UserContext from './context/UserContext';
import store from './store';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    let currentUser = sessionStorage.getItem("user");
    return currentUser ? JSON.parse(currentUser) : { name: "", isLoggedIn: false };
  });

  return (
    <Provider store={store}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<DisplayProducts />} /> 
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/edit" element={<CustomerForm />} />
          <Route path="/customers/list" element={<CustomerList />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/update-delete-account" element={<UpdateDeleteAccount />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer /> 
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
