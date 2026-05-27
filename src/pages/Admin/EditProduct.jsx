import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../../services/index.services";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { ToggleButton } from "react-bootstrap";

import AddProduct from "./AddProduct";
import ProductDetail from "../ProductDetail";


function EditProduct() {
   const { productId } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [ edition, setEdition] = useState("")

  /*************************** */
  useEffect(() => {
    getData();
  }, []);

  // function to get product details from the database
  const getData = async () => {
    try {
      const response = await service.get(
        `${import.meta.env.VITE_SERVER_URL}/api/product/${productId}`,
      );
      setTitle(response.data.title);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setSize(response.data.size);
      setStock(response.data.stock);
      setCategory(response.data.category);
      setImage(response.data.image)
      setEdition(response.data.edition)
    
    } catch (error) {
      console.log(error);
    }
  };

  /********************************** */

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // transfer data in the body
    const body = {
      image:image,
      title: title,
      description: description,
      category: category,
      price:price,
      size:size,
      stock:stock,
      edition:edition
    };

    try {
      const response = await service.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/product/update/${productId}`,
        body,
      );
      navigate("/product/" + productId);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div>
      <h2 style={{ marginTop: "4rem", marginBottom: "2rem" }}>Edit Product</h2>

      <form style={{ margin: "2rem" }}>

        <InputGroup className="mb-2" style={{ marginTop: "2rem" }}>
          <InputGroup.Text id="inputGroup-sizing-default">
            Upload Image 
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-4" style={{ marginTop: "2rem" }}>
          <InputGroup.Text id="inputGroup-sizing-default">
            Title
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Description
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputGroup>
   <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Price
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </InputGroup>

         <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Stock
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </InputGroup>

         <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Size
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </InputGroup>

         <Form.Select
          className="mb-4"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
        >
          <option value="">Select edition </option>
          <option value="normal">normal</option>
          <option value="new">new collection</option>
          <option value="limited">limited collection</option>
          <option value="sale">sale</option>
        </Form.Select>

        <Form.Select
          className="mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category </option>
          <option value="Breakfast">Backbag</option>
          <option value="Brunch">Hanbag</option>
          <option value="Lunch">Travelbag</option>
          <option value="Chicken">Maternitybag</option>
          <option value="Beef">Menbag</option>
          <option value="Seafood">Portmoney</option>
          <option value="Others">Others</option>
        </Form.Select>
        


       

        <button
          style={{ margin: " 1rem " }}
          className="btn btn-primary"
          onClick={handleFormSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
}
export default EditProduct