import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../../services/index.services";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { ToggleButton } from "react-bootstrap";
import { Navigate } from "react-router-dom";

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
  const [edition, setEdition] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");

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
      setImage(response.data.image);
      setEdition(response.data.edition);
      setImageUrl(response.data.image);
      setMaterial(response.data.material);
      setColor(response.data.color);
    } catch (error) {
      console.log(error)
        navigate("/error")
    }
  };

  /********************************** */

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // transfer data in the body
    const body = {
      image: imageUrl,
      title: title,
      description: description,
      category: category,
      price: price,
      size: size,
      stock: stock,
      edition: edition,
      material: material,
      color: color
    };

    try {
      const response = await service.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/product/update/${productId}`,
        body,
      );
      navigate("/product/" + productId);
    } catch (error) {
      console.log(error)
        navigate("/error")
    }
  };

  // handle update the photo
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  // below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //             |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await service.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload`,
        uploadData,
      );

      setImageUrl(response.data.imageUrl);

      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
     console.log(error)
        navigate("/error")
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: "4rem", marginBottom: "2rem" }}>Edit Product</h2>

      <form onSubmit={handleFormSubmit}style={{ margin: "2rem" }}>
        
        <InputGroup className="mb-2" style={{ marginTop: "2rem" }}>
          <Form.Group controlId="formFile" className="mb-3">
            {/* <Form.Label>Upload image</Form.Label> */}
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleFileUpload}
              disabled={isUploading}
              type="file"
            />
          </Form.Group>
          {/* to render a loading message or spinner while uploading the picture */}
          {isUploading ? <h6>... uploading image</h6> : null}

          {/* below line will render a preview of the image from cloudinary */}
          {imageUrl ? (
            <div>
              <img src={imageUrl} alt="img" width={60} height={60} />
            </div>
          ) : null}
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
            required
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
            Price €
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            type="number"
          />
        </InputGroup> 

         <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Material
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Color
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={color}
            onChange={(e) => setColor(e.target.value)}
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
          <InputGroup.Text id="inputGroup-sizing-default">Size</InputGroup.Text>
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
          <option value="Backbag">Backbag</option>
          <option value="Hanbag">Hanbag</option>
          <option value="Travelbag">Travelbag</option>
          <option value="Maternitybag">Maternitybag</option>
          <option value="Menbag">Menbag</option>
          <option value="poketmoney">poketmoney</option>
          <option value="Others">Others</option>
        </Form.Select>

        <button
          style={{ margin: " 1rem " }}
          className="btn btn-primary"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
export default EditProduct;
