import React from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DeleteCategory from './components/category/deleteCategory/DeleteCategory';
import CategoryForm from './components/category/categoryForms/CategoryForm';
import ListCategories from './components/category/listCategories/ListCategories';
import SingUp from './pages/singUp/SingUp';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/login/Login';
import Home from './pages/home/Home';



function App() {
  return (
    <>
    <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<SingUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/singUp" element={<SingUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/Category" element={<ListCategories/>} />
              <Route path="/registerCategory" element={<CategoryForm />} />
              <Route path="/updateCategory/:id" element={<CategoryForm />} />
              <Route path="/deleteCategory/:id" element={<DeleteCategory />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </>
  );
}
export default App;