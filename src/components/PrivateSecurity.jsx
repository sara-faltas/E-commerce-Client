// this is the wrapper coponenet to display pages only to users that is logged in 
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function PrivateSecurity(props) {
  
  const {isLoggedIn}= useContext(AuthContext)
  
  if(isLoggedIn){
return props.children
  }else{
    return <Navigate to="/login" />
  }
    
}
export default PrivateSecurity