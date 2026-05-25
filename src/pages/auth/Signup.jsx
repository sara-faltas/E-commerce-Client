import { Dropdown } from "bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { ToggleButton } from "react-bootstrap";

import service from "../../services/index.services";



function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    try {
      const response = await service.post("/auth/signup", body);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMsg(error.response.data.errorMessage);
      } else {
        // navigate to error page
      }
    }

    // ... contact backend to register the user
  };

  return (
   
      <div>
      <h3 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Sign up
      </h3>

      <form style={{ margin: "2rem" }}>
       
        <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            First Name
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </InputGroup>
      
       <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Last Name
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </InputGroup>

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

         
          <button onClick={handleSignup} >
            Create Account
          </button>

          {errorMsg && <p>{errorMsg}</p>}
       
       
        </form>
    </div>


  );
}

export default Signup;
