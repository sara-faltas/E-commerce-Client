import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import service from "../services/index.services";



// we creating the component
const AuthContext = createContext();

function AuthWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isAuthenticating, setIsAuthenticating]=useState(true)
  const [loggedUserRole,setLoggedUserRole]=useState()
  
  
  // this function to verify user with the backend
  async function authenticateUser() {
    const authToken = localStorage.getItem("authToken");

    if (!authToken){
        setIsAuthenticating(false)
    return; // if there is no token don't call the backend!
    }

    // call the backed
    try {
      const response = await service.get("/auth/verify");
      //assume the token is valid
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setLoggedUserRole(response.data.payload.role)
      setIsAuthenticating(false)
    } catch (error) {
      console.log(error)
     
      //assume the token is NOT valid
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsAuthenticating(false)
      setLoggedUserRole(null)
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  if (isAuthenticating){
    return<h3>Authenticating user...</h3>
  }

  const passedContext = {
    isLoggedIn,
    setIsLoggedIn,
    loggedUserId,
    setLoggedUserId,
    loggedUserRole,
    setLoggedUserRole
  };
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

// we do export only without default because we pass more than once
export { AuthWrapper, AuthContext };
