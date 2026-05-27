import { Dropdown } from "bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { ToggleButton } from "react-bootstrap";

import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import service from "../../services/index.services";



function Login() {
  const { setIsLoggedIn, setLoggedUserId, setLoggedUserRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await service.post(
        "/auth/login",
        body,
      );
      // we need to store our authToken that came from backend in local storage
      localStorage.setItem("authToken", response.data.authToken);

      //update the auth context states accordingly
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setLoggedUserRole(response.data.payload.role);

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMsg(error.response.data.errorMessage);
      } else {
        // navigate to error page
      }
      // ... contact backend to validate user credentials
    }
  };
  return (
<div>
      <h3 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Login
      </h3>

      <form style={{ margin: "2rem" }}>
       
       <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Email
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={email}
            onChange={handleEmailChange}
            required
            type="email"
          />
        </InputGroup>

          <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Password
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={password}
            onChange={handlePasswordChange}
            required
            type="password"
          />
        </InputGroup>
          

          <button onClick={handleLogin} >
            Login
          </button>
          {errorMsg && <p>{errorMsg}</p>}
        </form>
   </div>
  );
}

export default Login;
