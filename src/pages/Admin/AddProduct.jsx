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

function AddProduct() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [ edition, setEdition] = useState("")


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await service.post(
        `${import.meta.env.VITE_SERVER_URL}/api/product/create`,
        body,
      );
      navigate("/productList");
    } catch (error) {
      console.log(error);
    }
  };



  return (
   <div>
      <h3 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Add New Product
      </h3>

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

        <InputGroup className="mb-4">
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
          style={{ margin: "1rem" }}
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
export default AddProduct