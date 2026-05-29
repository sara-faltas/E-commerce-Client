import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import service from "../../services/index.services";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); 
        const response = await service.get( "/user/all", );
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        Navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!users) {
      return "No users endpoint is available yet."
  }

  if (loading) {
    return (
      <Card className="shadow-sm border-0">
        <Card.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 mb-0">Loading users...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title className="mb-3">All users</Card.Title>
        <Card.Text className="text-muted">A quick view of the users currently registered in the store.</Card.Text>

        {users.length === 0 ? (
          <Alert variant="info">No users found.</Alert>
        ) : (
          <ListGroup variant="flush">
            {users.map((user) => (
              <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{user.firstName}{user.lastName}</strong>
                  <div className="text-muted small">{user.email}</div>
                </div>
                <span className="badge bg-primary rounded-pill">{user.role || "user"}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default UsersList;
