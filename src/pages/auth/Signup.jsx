import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/index.services";
import { Box, TextField, Button, Typography } from "@mui/material";
import MyButton from "../../components/MyButton";

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ width: 350, p: 4, backgroundColor: "white", borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Sign Up
        </Typography>

        <form>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            margin="normal"
          />
          <MyButton onClick={handleSignup} bgColor="darkred" hoverColor="brown">
            Create Account
          </MyButton>

          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </Box>
    </Box>
  );
}

export default Signup;
