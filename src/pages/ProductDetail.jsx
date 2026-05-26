import service from "../services/index.services";
import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { ToggleButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Accordion from "react-bootstrap/Accordion";
import AddReview from "./Users/AddReview";

import backpack from "../images/backpack.webp";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isLoggedIn, loggedUserRole, loggedUserId } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <h3>Loading...</h3>;

  const deleteProduct = async () => {
    try {
      const response = await service.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/product/delete/${productId}`,
      );
      navigate("/productList");
    } catch (error) {
      console.log(error);
    }
  };

  const getReview = async () => {
    try {
      const response = await service.get(
        `${import.meta.env.VITE_SERVER_URL}/api/review/product/${productId}/reviews`,
      );
      setShowReviews(true);
      setReviews(response.data);
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
        <Card.Img variant="top" src={product.image} />
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
          <ListGroup.Item>Price: {product.price}</ListGroup.Item>
          <ListGroup.Item>Category: {product.category}</ListGroup.Item>
          <ListGroup.Item>Size: {product.size}</ListGroup.Item>
        </ListGroup.Item>

        {/* // show review section  */}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={getReview}>
              Show Reviews
            </Accordion.Header>
            <Accordion.Body>
              {showReviews && reviews.length === 0 ? (
                <h6>No reviews yet</h6>
              ) : (
                reviews.map((review) => (
                  <Card key={review._id} className="mb-3">
                    <Card.Body>
                      {/* <Card.Title>{review.user.firstName}</Card.Title> */}
                      <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= review.rating ? "⭐" : "☆"}
                          </span>
                        ))}
                      </div>
                      <Card.Text> {review.reviewText} </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* // check if user is logged in ? */}

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

          {isLoggedIn && loggedUserRole === "admin" && (
            <>
              <button
                style={{ margin: "0.5rem" }}
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/editProduct/${productId}`);
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
            </>
          )}

          {isLoggedIn && loggedUserRole === "user" && (
            <>
              <button
                style={{ margin: "0.5rem" }}
                type="button"
                className="btn btn-primary"
                onClick={() => setShowReviewForm(true)}
              >
                Add review
              </button>

              {showReviewForm && (
                <AddReview productId={productId} setShowReviewForm={setShowReviewForm} getReview={getReview} />
              )}
            </>
          )}

          {/* *************************** */}
          {/* **********handle the popup for deletion ******* */}
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              Are you sure you want to delete this product?
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
                  deleteProduct();
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

export default ProductDetail;
