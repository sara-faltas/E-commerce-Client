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

import logo from "../images/logobags.avif"

function MyNavbar() {
  // import the state from the context
  const { setIsLoggedIn, setLoggedUserId, isLoggedIn , loggedUserRole, setLoggedUserRole } =
    useContext(AuthContext);
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
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
           <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            MyShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/productList">
              Products
            </Nav.Link>

            {!isLoggedIn && (
              <>
                 <Nav.Link as={Link} to="/signup">
                    SignUp
                  </Nav.Link>
                 <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
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
                <button onClick={handleLogout}>
               
                  Logout
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
