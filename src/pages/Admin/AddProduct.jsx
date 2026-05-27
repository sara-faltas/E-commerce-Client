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
  const [edition, setEdition] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      image: imageUrl,
      title: title,
      description: description,
      category: category,
      price: price,
      size: size,
      stock: stock,
      edition: edition,
    };

    try {
      const response = await service.post(
        "/product/create",
        body,
      );
      navigate("/productList");
    } catch (error) {
      console.log(error);
    }
  };

  // ***********handling upload photo *****************
  // add to component where you are creating an item

  // below state will hold the image URL from cloudinary. This will come from the backend.
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
    }
  };

  return (
    <div>
      <h3 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Add New Product
      </h3>

      <form style={{ margin: "2rem" }}>

        <InputGroup className="mb-2" style={{ marginTop: "2rem" }}>
          <Form.Group controlId="formFile" className="mb-3">
            {/* <Form.Label>Upload image</Form.Label> */}
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={image}
              onChange={handleFileUpload}
              disabled={isUploading}
              type="file"
            />
          </Form.Group>
          {/* to render a loading message or spinner while uploading the picture */}
          {isUploading ? <h6>... uploading image</h6> : null}

          {/* below line will render a preview of the image from cloudinary */}
          {imageUrl ? (
            <div >
              <img src={imageUrl} alt="img" width={60} height={60}/>
            </div>
          ) : null}
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
export default AddProduct;
