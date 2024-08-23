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


import ProductList from './components/product/productList/ProductList';
import DeleteProduct from './components/product/deleteProduct/DeleteProduct';
import ProductForm from './components/product/productForm/ProductForm';
import Profille from './pages/profille/Profille';
import { Home } from './pages/home/Home';
import ShoppingCart from './pages/shoppingCart/ShoppingCart';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh] bg-white">
            <Routes>
              <Route path="/" element={<SingUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SingUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/category" element={<ListCategories />} />
              <Route path="/registerCategory" element={<CategoryForm />} />
              <Route path="/updateCategory/:id" element={<CategoryForm />} />
              <Route path="/deleteCategory/:id" element={<DeleteCategory />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/deleteProduct/:id" element={<DeleteProduct />} />
              <Route path="/registerProduct" element={<ProductForm />} />
              <Route path="/editProduct/:id" element={<ProductForm />} />
              <Route path="/user" element={<Profille />} />
              <Route path="/shopping" element={<ShoppingCart />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
export default App;
