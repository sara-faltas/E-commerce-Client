import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import react from "react";
import Carousel from "react-bootstrap/Carousel";

import sample from "../images/sample.jpg";
import header from "../images/header.jpg";

function HomePage() {
  return (
    <div>
      <img
        src={header}
        alt="ecommerce header"
        className="header-image"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <Container
        style={{
          margin: "2rem 2rem 4rem auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <p style={{  fontWeight:"bold" , fontFamily:"sans-serif" , textAlign:"center", marginBottom:"2rem", fontStyle:"italic"}}>
          “Every piece we create is more than a bag — it’s a companion for your
          journey, carrying your style through everyday moments and
          unforgettable memories.”
        </p>
        <p>
          Welcome to authentic Egyptian craftsmanship where elegance meets
          tradition. Our bags are designed with high-quality materials and
          timeless style to reflect confidence and modern Egyptian creativity.
          Each piece is made to be part of your story — combining style,
          durability, and everyday elegance.
        </p>

        <Carousel
          data-bs-theme="dark"
          style={{ width: "100%", height: "100%" }}
        >
          <Carousel.Item interval={1000}>
            <img src={sample} text="First slide" className="d-block w-100" />
            <Carousel.Caption>
              <h3>Check lastest collection</h3>
              <p>You can browse more bags here.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img text="Second slide" src={sample} className="d-block w-100" />
            <Carousel.Caption>
              <h3>Check what in SALE!</h3>
              <p> HURRY UP! and choose from very nice models </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
}

export default HomePage;
