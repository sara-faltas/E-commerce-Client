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
        console.log(error)
        navigate("/error")
      }
    }

    // ... contact backend to register the user
  };

  return (
   
      <div>
      <h3 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        SIGN UP
      </h3>
      <h6 style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Please fill in the information below:
      </h6>
      <form style={{ margin: "2rem" }}>
       
        <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            First name
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
            Last name
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
            E-mail
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

         
          <button onClick={handleSignup}
          style={{
            width: "100%",
            marginTop: "1rem",
            backgroundColor: "#dfa871",
            border: "none",
            borderRadius: "10px",
            padding: "0.7rem",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#ae8a64")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dfa871")}
         >
            Create Account
          </button>

          {errorMsg && <p>{errorMsg}</p>}
       
       
        </form>
    </div>


  );
}

export default Signup;
