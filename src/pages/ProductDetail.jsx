import service from "../services/index.services";
import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { ToggleButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import backpack from "../images/backpack.webp"

function ProductDetail() {
 
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  // function to get product details from the database
  const getData = async () => {
    try {
      const response = await service.get(
        `${import.meta.env.VITE_SERVER_URL}/api/product/${productId}`,
      );
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <h3>Loading...</h3>;

  const deleteProduct = async () => {
    try {
      const response = await service.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/product/delete/${recipeId}`,
      );
      navigate("/productList");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card
        style={{
          width: "30rem",
          margin: "2rem auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        
        <Card.Img variant="top" src={product.colors.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        
        <ListGroup.Item
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <ListGroup.Item>
            Price: {product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            Category: {product.category}
            </ListGroup.Item>
        <ListGroup.Item>
            Size: {product.size}
            </ListGroup.Item>
        </ListGroup.Item>


        <Card.Body>
          <button
            style={{ margin: "0.5rem" }}
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              navigate("/productList");
            }}
          >
            Back
          </button>
          <button
            style={{ margin: "0.5rem" }}
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/editProduct" + productId);
            }}
          >
            edit
          </button>
          <button
            style={{ margin: "0.5rem" }}
            type="button"
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            delete
          </button>
          
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Recipe</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              Are you sure you want to delete this recipe?
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  setShowDeleteModal(false);
                  deleteRecipe();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
}
export default ProductDetail