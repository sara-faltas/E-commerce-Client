import React, { useEffect, useState } from 'react'
import service from "../services/index.services";
import ProductCard from "../components/ProductCard";
import AddProduct from './Admin/AddProduct';

import { Dropdown } from "bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";




function ProductList() {
    
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get (`${import.meta.env.VITE_SERVER_URL}/api/product`)
      setProduct(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // loading handler here

  if(!product){
    return <h1>loading...</h1>
  }

  return (
     <div>
      <h2 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Product List</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent:"space-around",
          alignContent:"center",
          gap: '1rem',
          margin: '2rem'
        }}
      >
         { product.map((product) => (
            <ProductCard key={product._id} product={product}  />
          ))
        }
      </div>
    </div>
  );
}

export default ProductList