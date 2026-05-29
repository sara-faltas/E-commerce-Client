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
import EditReview from "./Users/EditReview";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";

import backpack from "../images/backpack.webp";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModalReview, setShowDeleteModalReview] = useState(false);
  const { isLoggedIn, loggedUserRole, loggedUserId } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [ShowEditReviewForm, setShowEditReviewForm] = useState(false);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const isFav = favorites.some((product) => product._id === productId);

  // function to get product details from the database
  const getData = async () => {
    try {
      const response = await service.get(
        `${import.meta.env.VITE_SERVER_URL}/api/product/${productId}`,
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const getFavorites = async () => {
    try {
      const response = await service.get(
        `${import.meta.env.VITE_SERVER_URL}/api/favorite`,
      );

      setFavorites(response.data); // array of products
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (!product)
    return (
      <Button disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        Loading...
      </Button>
    );

  const deleteProduct = async () => {
    try {
      const response = await service.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/product/delete/${productId}`,
      );
      navigate("/productList");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await service.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/review/delete/${reviewId}`,
      );
      getReview();
    } catch (error) {
      console.log(error);
      navigate("/error");
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
      navigate("/error");
    }
  };

  const handleFavorite = async () => {
    try {
      await service.put(
        `${import.meta.env.VITE_SERVER_URL}/api/favorite/${productId}`,
      );
      //refresh favorites after cheange
      getFavorites();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <Card
        style={{
          width: "30rem",
          margin: "2rem auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {isLoggedIn && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite();
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
                background: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                fontSize: "20px",
              }}
            >
              {isFav ? "❤️" : "🤍"}
            </button>
          </>
        )}

        <Card.Img
          style={{ width: "30rem", height: "30rem" }}
          variant="top"
          src={product.image}
          alt={product.title}
        />

        <Card.Body style={{ textAlign: "left" }}>
          <Card.Title
            style={{
              fontSize: "2rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            {product.title}
          </Card.Title>
          <Card.Text
            style={{ color: "#777", fontSize: "1rem", marginBottom: "0.4rem" }}
          >
            {product.description}
          </Card.Text>
          <Card.Text
            style={{ color: "#777", fontSize: "1rem", marginBottom: "0.4rem" }}
          >
            {product.price} € tax incl.
          </Card.Text>
        </Card.Body>

        <ListGroup.Item
          style={{
            color: "#777",
            fontSize: "1rem",
            marginBottom: "0.4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            textAlign: "left",
            padding: "1rem",
          }}
        >
          <ListGroup.Item> {product.category}</ListGroup.Item>
          <ListGroup.Item>Size of {product.size} cm</ListGroup.Item>
          <ListGroup.Item>Made of {product.material}</ListGroup.Item>
          <ListGroup.Item>Color of {product.color}</ListGroup.Item>
        </ListGroup.Item>

        {/* // show review section  */}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={getReview}>
              ⭐⭐⭐⭐⭐ ({reviews.length} Reviews)
            </Accordion.Header>
            <Accordion.Body>
              {showReviews && reviews.length === 0 ? (
                <h6>No reviews yet</h6>
              ) : (
                reviews.map((review) => (
                  <Card key={review._id} className="mb-3">
                    <Card.Body className="d-flex gap-3">
                      <Card.Title>{review.user.firstName}</Card.Title>
                      <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= review.rating ? "⭐" : "☆"}
                          </span>
                        ))}
                      </div>
                      {/* REVIEW TEXT */}
                      <Card.Text style={{ marginBottom: 0, color: "#555" }}>
                        {" "}
                        {review.reviewText}{" "}
                      </Card.Text>
                      {/* ACTION ICONS */}
                      {isLoggedIn &&
                        (loggedUserId === review.user?._id ||
                          loggedUserRole === "admin") && (
                          <div className="d-flex gap-3 align-items-center ml-auto justify-content-end">
                            {/* EDIT */}
                            <FiEdit2
                              style={{
                                cursor: "pointer",
                                color: "#8B6B4A",
                                fontSize: "18px",
                              }}
                              onClick={() => setShowEditReviewForm(true)}
                            />
                          </div>
                        )}
                      {isLoggedIn &&
                        (loggedUserId === review.user?._id ||
                          loggedUserRole === "admin") && (
                          <div className="d-flex gap-3 align-items-center ml-auto justify-content-end">
                            {/* DELETE */}
                            <FiTrash2
                              style={{
                                cursor: "pointer",
                                color: "#8B6B4A",
                                fontSize: "18px",
                              }}
                              onClick={() => setShowDeleteModalReview(true)}
                            />
                          </div>
                        )}

                      {/* ***************handle the popup for adding a review ******* */}
                      <Modal
                        show={showReviewForm}
                        onHide={() => setShowReviewForm(false)}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add Review</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <AddReview
                            productId={productId}
                            setShowReviewForm={setShowReviewForm}
                            getReview={getReview}
                          />
                        </Modal.Body>
                      </Modal>
                      {/* ***************handle the popup for editing a review ******* */}
                      <Modal
                        show={ShowEditReviewForm}
                        onHide={() => setShowEditReviewForm(false)}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Review</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <EditReview
                            productId={productId}
                            reviewId={review._id}
                            setShowEditReviewForm={setShowEditReviewForm}
                            getReview={getReview}
                          />
                        </Modal.Body>
                      </Modal>
                      {/* **********handle the popup for deletion a review ******* */}
                      <Modal
                        show={showDeleteModalReview}
                        onHide={() => setShowDeleteModalReview(false)}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Review</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          Are you sure you want to delete this Review?
                        </Modal.Body>

                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowDeleteModaReview(false)}
                          >
                            Cancel
                          </Button>

                          <Button
                            variant="danger"
                            onClick={() => {
                              setShowDeleteModalReview(false);
                              deleteReview(review._id);
                            }}
                          >
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Card.Body>
                  </Card>
                ))
              )}
              {isLoggedIn && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(true)}
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                      backgroundColor: "#dfa871",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.7rem",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#ae8a64")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#dfa871")
                    }
                  >
                    Add review
                  </button>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* // check if user is logged in ? */}

        <Card.Body className="d-flex justify-content-evenly" >
          <button
            style={{ borderRadius: "8px",}}
            type="button"
             className="d-flex align-items-center gap-2 shadow-sm"
            onClick={() => {
              navigate("/productList");
            }}
          >
            <FiArrowLeft />
            Back
          </button>

          {isLoggedIn && loggedUserRole === "admin" && (
            <>
              <button
               variant="outline-primary"
                style={{ borderRadius: "8px" }}
                type="button"
                className="d-flex align-items-center gap-2"
                onClick={() => {
                  navigate(`/editProduct/${productId}`);
                }}
              >
                 <FiEdit2 />
                edit
              </button>

              <button
                variant="outline-danger"
                style={{ borderRadius: "8px" }}
                type="button"
               className="d-flex align-items-center gap-2"
                onClick={() => setShowDeleteModal(true)}
              >
                 <FiTrash2 />
                delete
              </button>
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
