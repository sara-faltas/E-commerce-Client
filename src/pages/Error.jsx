import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Error() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "100vh", padding: "2rem" }}
    >
      <h1
        style={{
          fontSize: "5rem",
          fontWeight: "700",
          color: "#8B5E3C",
          fontFamily: "Playfair Display, serif",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontFamily: "Poppins, sans-serif",
          marginBottom: "1rem",
          fontWeight: "600",
        }}
      >
        Oops! This page could not be found.
      </h2>

      <p
        style={{
          maxWidth: "600px",
          color: "#666",
          fontSize: "1rem",
          marginBottom: "2rem",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        The authentic bag you are looking for may have been moved,
        removed, or never existed. Explore our handcrafted Egyptian
        collections and discover timeless elegance.
      </p>

      {/* <img
        src="../images/404.jpg"
        alt="Elegant bag"
        style={{
          width: "300px",
          maxWidth: "100%",
          borderRadius: "16px",
          marginBottom: "2rem",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      /> */}

      <Button
        as={Link}
        to="/"
        variant="dark"
        style={{
          padding: "0.75rem 2rem",
          borderRadius: "8px",
          fontFamily: "Poppins, sans-serif",
          border: "none",
        }}
      >
        Back to Home
      </Button>
    </Container>
  );
}
  
export default Error

