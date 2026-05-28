import { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import service from "../../services/index.services";
import { Spinner } from "react-bootstrap";


function UserProfile() {
 
  const navigate =useNavigate()
   const [user, setUser] = useState(null);


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
    getProfile();
  }, []);

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
          {user.firstName} {user.lastName}
        </h3>
        <p>{user.email}</p>
        <span style={{ color: "gray" }}>Role: {user.role}</span>
      </Card>

    </Container>
  );
}
export default UserProfile