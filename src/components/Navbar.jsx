import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function Navbar() {

  // import the state from the context 
  const {setIsLoggedIn,setLoggedUserId,isLoggedIn} = useContext(AuthContext)
const navigate = useNavigate()

  function handleLogout(){
  //destroy the token
  localStorage.removeItem("authToken")
  //revert the states to their initial value
  setIsLoggedIn(false)
  setLoggedUserId(null)
  
  //navigate the user to public page 
  Navigate("/login")
}
  return (
    <nav>
      <Link to="/">Home</Link>
      {!isLoggedIn && <>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      </>}
      
      {isLoggedIn && <>
      <Link to="/ProductList">Product List</Link>
      <button onClick={handleLogout}>Logout</button>
      </>}
    </nav>
  );
}

export default Navbar;
