import { useEffect, useState } from "react";
import service from "../../services/index.services";
import ProductCard from "../../components/ProductCard";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context"; 


function favorite() {
  
  const [ favorites,setFavorites ]= useState([])
  const { isLoggedIn, loggedUserRole, loggedUserId } = useContext(AuthContext);

  useEffect(() => {
    getFavorite()
  }, [])
  const getFavorite = async ()=>{
    const response = await service.get(`favorite`)
    setFavorites(response.data)
    console.log("favorites:", favorites);
  }

  return <div>
    <h3>favorites</h3>

{favorites.length === 0 ? (
          <p>There is no favorite product yet</p>
        ) : (
    favorites.map((product) => (
   <ProductCard product={product} key={product._id}></ProductCard>)
   ))}
   </div>;
}
export default favorite;
