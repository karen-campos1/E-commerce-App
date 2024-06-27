import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Layout/NavBar';
import HomePage from './components/HomePage/HomePage';
import CustomerForm from './components/Customers/CustomerForm';
import CustomerList from './components/Customers/CustomerList';
import Orders from './components/Orders/Orders';
import AdminProducts from './components/Products/AdminProducts';
import DisplayProducts from './components/Products/DisplayProducts'; 
import Footer from './components/Layout/Footer'; 
import NotFound from './components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<DisplayProducts />} /> 
        <Route path="/customers/new" element={<CustomerForm />} />
        <Route path="/customers/edit" element={<CustomerForm />} />
        <Route path="/customers/list" element={<CustomerList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer /> {/* Add Footer component */}
    </div>
  );
}

export default App;
