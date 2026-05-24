import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ProductList from "./pages/ProductList";


// components
import Navbar from "./components/Navbar"
import PrivateSecurity from "./components/PrivateSecurity";

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ProductList" element={<ProductList/>} />


      </Routes>
    </div>
  )
}

export default App
