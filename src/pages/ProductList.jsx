import React, { useEffect, useState } from "react";
import service from "../services/index.services";
import ProductCard from "../components/ProductCard";
import AddProduct from "./Admin/AddProduct";

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
import { Spinner } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";

function ProductList() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(
        `${import.meta.env.VITE_SERVER_URL}/api/product`,
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  // loading handler here

  if (!product) {
    return (
      <Button disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        Loading...
      </Button>
    );
  }

  // this to search for product name from the product list page
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProduct = product.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  //this to filter product by category
  const filterCategory = filteredProduct.filter((product) => {
    return category ? product.category === category : true;
  });

  return (
    <div >
     
        {/* TITLE */}
      <h2 className="d-flex justify-content-center " style={{  margin: 0,fontWeight: "400" }}>NEW ARRIVALS</h2>
  
            {/* RIGHT SIDE */}
      <div className="d-flex justify-content-end align-items-center">
        {/* SEARCH BAR */}
         <div
      style={{
        position: "relative",
        width: "250px",
        margin: "1rem",
      }}
    >
        <Form.Control
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={handleSearch}
          style={{
            paddingLeft: "40px",
            borderRadius: "30px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            transition: "0.3s",
            fontSize: "0.95rem",
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
            e.target.style.transform = "scale(1.02)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
            e.target.style.transform = "scale(1)";
          }}
        />
       
      </div>
     </div>
     
     <div className="d-flex  justify-content-end">
      {/* FILTER */}
      <div className="d-flex gap-3 mb-4 flex-wrap " style={{margin: "1rem",gap: "1rem",alignItems: "center",width: "250px"}}>
        <Form.Select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Filter by category </option>
          <option value="Backbag">Backbag</option>
          <option value="Hanbag">Hanbag</option>
          <option value="Travelbag">Travelbag</option>
          <option value="Maternitybag">Maternitybag</option>
          <option value="Menbag">Menbag</option>
          <option value="poketmoney">poketmoney</option>
          <option value="Others">Others</option>
        </Form.Select>
      </div>
 </div>


    {/* cards section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "center",
          gap: "1rem",
          margin: "2rem",
        }}
      >
        {filterCategory.length === 0 ? (
          <p>Sorry no product found</p>
        ) : (
          filterCategory.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      
    </div>
    </div>
    
  );
}

export default ProductList;
