import Container from "react-bootstrap/Container";


function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px 0",
        marginTop: "50px",
        textAlign: "center",
      }}
    >
      <Container>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Authentic Egyptian Bags. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
export default Footer