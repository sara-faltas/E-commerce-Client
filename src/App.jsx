import "./App.css";
import { Routes, Route } from "react-router";


// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail"

import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/AddProduct"
import EditProduct from "./pages/Admin/EditProduct";

import UserProfile from "./pages/Users/UserProfile"
import AddReview from "./pages/Users/AddReview"
import EditReview from "./pages/Users/EditReview"
import Favorite from "./pages/Users/Favorite"

import Error from "./pages/Error";
import NotFoundPage from "./pages/NotFoundPage"

import Footer from "./components/Footer";


// components
import MyNavbar from "./components/MyNavbar"
import PrivateSecurity from "./components/PrivateSecurity";


function App() {

  return (
    <div>
      <MyNavbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/productList" element={<ProductList/>} />
        <Route path="/product/:productId" element={<ProductDetail/>}/>

        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/editProduct/:productId" element={<EditProduct/>} />

        <Route path="/userProfile" element={<UserProfile/>} />
        <Route path="/addReview" element={<AddReview/>} />
        <Route path="/editReview/:reviewId" element={<EditReview/>} />
        <Route path="/favorite" element={<Favorite/>}/>

        <Route path="/error" element={<Error/>}/>
        <Route path="*" element={<NotFoundPage/>}/>



      </Routes>

       <Footer />
    </div>
  )
}

export default App
