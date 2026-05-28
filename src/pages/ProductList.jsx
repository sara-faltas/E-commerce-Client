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

function ProductList() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");

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
      console.log(error)
        navigate("/error")
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

  //this to filter product by category
  const filterCategory = product.filter((product) => {
    return category ? product.category === category : true;
  });

  return (
    <div>
      <h2 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Product List</h2>

      <div className="d-flex gap-3 mb-4 flex-wrap">
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
