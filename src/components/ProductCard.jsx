import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";


import backpack from "../images/backpack.webp";

function ProductCard(props) {
    
   const navigate = useNavigate();

  return (
<div>
      <Card
        style={{
          width: "18rem",
          padding: "1rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "100%",
        }}
      >
        
        <Card.Img variant="top" src={props.product.image} />
        
        <Card.Body>
          <Card.Title>{props.product.title}</Card.Title>
          <Card.Text>{props.product.description}</Card.Text>
          
          <Button
            style={{ margin: "0.5rem" }}
            variant="primary"
            onClick={() => {
              navigate(`/Product/${props.product._id}`);
            }}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
    </div>


   
  );
}

export default ProductCard;
