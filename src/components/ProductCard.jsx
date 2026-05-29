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
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={() => {
          navigate(`/Product/${props.product._id}`);
        }}
      >
        
        <Card.Img variant="top" src={props.product.image}  
        style={{
         height: "200px",
         objectFit: "cover",
         borderRadius: "10px",
        }}/>
        
        <Card.Body  style={{textAlign: "left",}}>
          <Card.Title style={{fontSize: "1rem", fontWeight: "500", marginBottom: "0.5rem",}}>{props.product.title}</Card.Title>
          <Card.Text style={{ color: "#777",  fontSize: "0.9rem", marginBottom: "0.4rem", }}>{props.product.category}</Card.Text>
          <Card.Text  style={{ color: "#999", fontSize: "0.95rem",fontWeight: "300", }}>{props.product.price}€ </Card.Text>
        </Card.Body>
      </Card>
    </div>


   
  );
}

export default ProductCard;
