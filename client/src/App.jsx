import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';
import Product from './pages/Product/Product';
import ChatInterface from './components/Chatbot/Chatbot';
import CartTab from './components/Cart/CartTab';
import Checkout from './pages/Checkout/Checkout';
import { useDispatch } from 'react-redux';
import { setCartFromStorage } from './stores/cart';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavTab from './components/Favourite/FavouriteTab';
import SearchPage from './pages/Search/Search';
import ErrorPage from './pages/Error/Error';
import OrderTracking from './pages/Tracking/Tracking';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/SignUp/SignUp';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ComparePage from './pages/Compare/Compare';
import UserProfile from './pages/UserProfile/UserProfile';
import VendorHome from './pages/Vendor/VendorHome/VendorHome';
import VendorProfile from './pages/Vendor/VendorProfile/VendorProfile';
import VendorProduct from './pages/Vendor/VendorProduct/VendorProduct';
import About from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import DesignerPage from './pages/DesignerPage/DesignerPage';
import SetNewPassword from './pages/SetNewPassword/SetNewPassword';
import Success from './pages/Stripe/Sucess';
import Cancel from './pages/Stripe/Cancel';
import AccessDenied from './pages/Vendor/AccessDenied/AccessDenied';
import SearchResults from './pages/SearchResults/SearchResults';
import AddBrand from './pages/Vendor/AddBrand/AddBrand';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carts")) || [];
    dispatch(setCartFromStorage(savedCart));
  }, [dispatch]);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path='/categories' element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/trackorder" element={<OrderTracking />} />
        <Route path="/designer" element={<DesignerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/setnewpassword/:token" element={<SetNewPassword />} />
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="/vendorhome" element={<VendorHome />} />
        <Route path="/vendorprofile" element={<VendorProfile />} />
        <Route path="/vendoraddproduct" element={<VendorProduct />} />
        <Route path="/add-brand" element={<AddBrand />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>


      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Slide}
      />

      <ChatInterface />
      <FavTab />
      <CartTab />
    </div>
  );
};

export default App;
