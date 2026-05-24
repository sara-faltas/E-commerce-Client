import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import MyButton from "../../components/MyButton";

function Login() {
  const { setIsLoggedIn, setLoggedUserId } = useContext(AuthContext);
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
      const response = await axios.post(
        "http://localhost:5005/api/auth/login",
        body,
      );
      // we need to store our authToken that came from backend in local storage
      localStorage.setItem("authToken", response.data.authToken);

      //update the auth context states accordingly
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);

      console.log(response.data);
      navigate("/private-page");
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
          Login
        </Typography>

        <form >
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

          <MyButton onClick={handleLogin} bgColor="darkred" hoverColor="brown">
            Login
          </MyButton>
          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </Box>
    </Box>
  );
}

export default Login;
