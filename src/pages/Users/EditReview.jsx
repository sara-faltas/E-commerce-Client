import { Dropdown } from "bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { ToggleButton } from "react-bootstrap";
import service from "../../services/index.services";


function EditReview(props) {

  const [reviewText, setReviewText] = useState("")
  const [rating, setRating]= useState("")

  const {productId,setShowEditReviewForm,reviewId,getReview}= props

  const navigate = useNavigate();

   useEffect(() => {
    getData();
  }, []);

  // function to get product details from the database
  const getData = async () => {
    try {
      const response = await service.get(
        `${import.meta.env.VITE_SERVER_URL}/api/review/${reviewId}`,
      );
      setReviewText(response.data.reviewText);
      setRating(response.data.rating);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e)=>{
      e.preventDefault();

      const body = {
        reviewText: reviewText,
        rating:rating,
      };
      try {
        const response = await service.patch( `${import.meta.env.VITE_SERVER_URL}/api/review/update/${reviewId}`,
        body,
      );
      setShowEditReviewForm(false)
      getReview()
      } catch (error) {
        console.log(error)
      }
    }

  return (
   <div>
      <h3 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
      Edit Review
      </h3>
      <form style={{ margin: "2rem" }}>
         
        <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default" required>
            Enter your review
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </InputGroup>
        

        <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default">
            Rating
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </InputGroup>
      

        <button
          style={{ margin: "1rem" }}
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Update your review
        </button>
      </form>

    </div>
  )
}
export default EditReview