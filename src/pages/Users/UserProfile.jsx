import { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import service from "../../services/index.services";
import { Spinner } from "react-bootstrap";


function UserProfile() {
 
  const navigate =useNavigate()
   const [user, setUser] = useState(null);
   const [reviews, setReviews] = useState([]);


     useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const response = await service.get(
        `${import.meta.env.VITE_SERVER_URL}/api/user/profile`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error)
      navigate("/error");
    }
  };

    useEffect(() => {
    getReviews();
  }, []);
  const getReviews = async () => {
  try {
    const response = await service.get(
      `${import.meta.env.VITE_SERVER_URL}/api/user/reviews`
    );
    setReviews(response.data);
    console.log(response.data)
  } catch (error) {
    console.log(error);
    navigate("/error")
  }
};


  if (!user) {
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
  }
  

  return (
     <Container style={{ marginTop: "2rem" }}>
      
      {/* USER INFO CARD */}
      <Card className="p-3 mb-4 shadow-sm">
        <h3>
          Welcome {user.firstName} {user.lastName}
        </h3>
        <p>{user.email}</p>
        <h5>⭐ My Reviews</h5>

        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <Card key={review._id} className="mb-3 p-2">
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= review.rating ? "⭐" : "☆"}
                  </span>
                ))}
              </div>
              <p>{review.reviewText}</p>
              <p> Product Name:{review.product.title}</p>
            </Card> )
          )
        )}
     </Card>
    </Container>
  );

}
export default UserProfile