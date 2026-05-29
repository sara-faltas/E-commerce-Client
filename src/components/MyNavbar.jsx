import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import { Button } from "bootstrap";
import { Navigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

import logo from "../images/authenticLogo.png";

function MyNavbar() {
  // import the state from the context
  const {
    setIsLoggedIn,
    setLoggedUserId,
    isLoggedIn,
    loggedUserRole,
    setLoggedUserRole,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    //destroy the token
    localStorage.removeItem("authToken");
    //revert the states to their initial value
    setIsLoggedIn(false);
    setLoggedUserId(null);
    setLoggedUserRole(null);

    //navigate the user to public page
    Navigate("/login");
  }

  return (
    <Navbar
      expand="sm"
      className="py-0"
      style={{
        backgroundColor: "white",
        height: "50px",
        position: "sticky",
        top: 0,
        zIndex: 1055,
        overflow: "visible",
      }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="authentic bags logo"
            src={logo}
            className="navbar-brand"
            width={140}
            height={80}
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "auto",
            padding: "0.35rem 0.5rem",
            marginLeft: "auto",
          }}
        />

        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{
            zIndex: 1060,
            backgroundColor: "white",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/productList">
              Products
            </Nav.Link>
         </Nav>
         <Nav className="ms-auto">
            {!isLoggedIn && (
              <>
                {/* <Nav.Link as={Link} to="/signup">
                  SignUp
                </Nav.Link> */}
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{
                    fontSize: "1.2rem",
                    display: "inline-flex",
                    alignItems: "center",
                    color: "#8B6B4A",
                    width: "auto",
                    margin: "0 0.25rem",
                  }}
                >
                  <FiUser />
                </Nav.Link>
                 
                    {/* <Nav.Link as={Link} to="/userProfile">
                    🛒
                  </Nav.Link> */}
              </>
            )}
            {isLoggedIn && (
              <>
                {loggedUserRole === "admin" ? (
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  
                ) : (
                  <Nav.Link as={Link} to="/userProfile">
                    Profile 
                  </Nav.Link>
                  
                )}
                 <Nav.Link as={Link} to="/Favorite">
                    ❤️
                  </Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
