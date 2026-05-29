import { useEffect, useRef, useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Modal,
  Badge,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../../services/index.services";
import { Link } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  

  useEffect(() => {
    getProfile();
    getReviews();
  }, []);

  const getProfile = async () => {
    try {
      const response = await service.get("/user/profile");
      setUser(response.data);
      setFirstName(response.data.firstName || "");
      setLastName(response.data.lastName || "");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const getReviews = async () => {
    try {
      const response = await service.get("/user/reviews");
      setReviews(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await service.put("/user/update", { firstName, lastName });
      setUser((prev) => ({ ...prev, firstName, lastName }));
      setShowProfileModal(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await service.put("/user/update-password", { oldPassword, newPassword });
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const response = await service.post("/upload", uploadData);
      setUser((prev) => ({ ...prev, image: response.data.imageUrl }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Button disabled>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          Loading...
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: "1100px" }}>
      <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
        <Card.Body style={{ background: "linear-gradient(135deg, #fffaf5 0%, #f7f9ff 100%)" }}>
          <Row className="g-4 align-items-center">
            <Col md={4} className="text-center text-md-start border-end">
              <div className="d-flex flex-column align-items-center align-items-md-start gap-3">
                <div
                  className="rounded-circle border border-4 border-light shadow-sm d-flex align-items-center justify-content-center"
                  style={{ width: "140px", height: "140px", overflow: "hidden", backgroundColor: "#f0f2f5" }}
                >
                  <img
                    src={user.image || "./src/images/profileSample.svg"}
                    alt="profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div className="text-center text-md-start">
                  <h3 className="mb-1">{user.firstName} {user.lastName}</h3>
                  <p className="text-muted mb-2">{user.email}</p>
                  <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill">Member</Badge>
                </div>

                <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                  <Button disabled variant="outline-dark" onClick={() => fileInputRef.current?.click()}>
                    {isUploading ? "Uploading..." : "Upload image"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                  <Button disabled   variant="dark" onClick={() => setShowProfileModal(true)}>Manage your data</Button>
                  <Button disabled variant="outline-secondary" onClick={() => setShowPasswordModal(true)}>Update password</Button>
                </div>
              </div>
            </Col>

            <Col md={8}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <h5 className="mb-3">My profile</h5>
                  <Row className="g-3">
                    <Col sm={6}>
                      <Card className="border-0 bg-light rounded-3 p-3 h-100">
                        <small className="text-uppercase text-muted">First name</small>
                        <strong className="fs-5">{user.firstName}</strong>
                      </Card>
                    </Col>
                    <Col sm={6}>
                      <Card className="border-0 bg-light rounded-3 p-3 h-100">
                        <small className="text-uppercase text-muted">Last name</small>
                        <strong className="fs-5">{user.lastName}</strong>
                      </Card>
                    </Col>
                    <Col sm={6}>
                      <Card className="border-0 bg-light rounded-3 p-3 h-100 ">
                        <small className="text-uppercase text-muted">Email</small>
                        <strong className="fs-6">{user.email}</strong>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mt-4 border-0 shadow-sm rounded-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h5 className="mb-1">My reviews</h5>
              <p className="text-muted mb-0">Show or hide the reviews you wrote.</p>
            </div>
            <Button variant="outline-dark" size="sm" onClick={() => setShowReviews((prev) => !prev)}>
              {showReviews ? "Hide reviews" : "Show reviews"}
            </Button>
          </div>

          {showReviews && (
            <div>
              {reviews.length === 0 ? (
                <p className="text-muted mb-0">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <Card key={review._id} className="mb-3 border-0 bg-light rounded-3 p-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <strong>
                        Product{review.product?.title || "Product"}
                        </strong>
                      <span className="text-warning">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                    </div>
                    <p className="mb-0 text-muted">{review.reviewText}</p>
                  </Card>
                ))
              )}
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update your personal details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProfileUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowProfileModal(false)}>Cancel</Button>
              <Button variant="dark" type="submit">Save changes</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Old password</Form.Label>
              <Form.Control type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
              <Button variant="dark" type="submit">Change password</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default UserProfile;