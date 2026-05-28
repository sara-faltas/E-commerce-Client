
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

function AddReview(props) {

  const [reviewText, setReviewText] = useState("")
  const [rating, setRating]= useState("")

  const {productId,setShowReviewForm,getReview}= props

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      e.preventDefault();

      const body = {
        reviewText: reviewText,
        rating:rating,
        product: productId,
      };
      try {
        const response = await service.post( `${import.meta.env.VITE_SERVER_URL}/api/review/create`,
        body,
      );
      setShowReviewForm(false)
      getReview()
      } catch (error) {
        console.log(error)
        navigate("/error")
      }
    }
    

  return (
    <div>
      <h3 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
      Add Review
      </h3>
      <form onSubmit={handleSubmit} style={{ margin: "2rem" }}>
         
        <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-default" required>
            Enter your review
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
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
            type="number"
          />
        </InputGroup>
      

        <button
          style={{ margin: "1rem" }}
          type="submit"
          className="btn btn-primary"
        >
          Post your review
        </button>
      </form>

    </div>
    
  )
}
export default AddReview