import React, { useEffect, useState } from 'react'
import service from "../services/index.services";
import ProductCard from "../components/ProductCard";



function ProductList() {
    
  const [activeTab, setActiveTab] = useState("all");
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get (`${import.meta.env.VITE_SERVER_URL}/api/product`,)
      setData(response.data)
      setProduct(response.data)
      // call a private route here...

    } catch (error) {
      console.log(error)
    }
  }

  // loading handler here

  if(!dataOnlyForLoggedUsers){
    return <h1>loading...</h1>
  }


  //this to filter by product category
  const displayedProducts = product.filter((product) => {
    return category ? product.category === category : true;
  });

  return (
    <div>
      
      {displayedProducts.length === 0 ? (
          <p>Check Product later, we are working to fix the problem</p>
        ) : (
          displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product}  />
          ))
        )}
    </div>
  )
}

export default ProductList