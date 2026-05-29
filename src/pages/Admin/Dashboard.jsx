import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UsersList from "./UsersList";

function Dashboard() {
  return (
    <div className="container py-3">
      <div className="row g-4">
        <aside className="col-lg-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h4 className="mb-3">Admin Panel</h4>
              <div className="d-grid gap-2">
                <Button as={Link} to="/dashboard" variant="primary" className="text-start">Dashboard</Button>
                <Button as={Link} to="/addProduct" variant="outline-secondary" className="text-start">Add New Product</Button>
                <Button as={Link} to="/productList" variant="outline-secondary" className="text-start">All Products</Button>
                <Button as={Link} to="/users" variant="outline-secondary" className="text-start">Users</Button>
              </div>
            </Card.Body>
          </Card>
        </aside>

        <main className="col-lg-9">
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <h2 className="mb-1">Dashboard</h2>
              <p className="text-muted mb-0">Overview of your store activity and admin tools.</p>
            </Card.Body>
          </Card>

          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <p className="text-muted mb-1">Products</p>
                  <h3 className="mb-0">Live catalog</h3>
                  <small className="text-muted">Manage all product listings from the products view.</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <p className="text-muted mb-1">Users</p>
                  <h3 className="mb-0">Registered shoppers</h3>
                  <small className="text-muted">Track user activity and account growth.</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <p className="text-muted mb-1">Sales</p>
                  <h3 className="mb-0">Quick insights</h3>
                  <small className="text-muted">Use this page as your admin overview hub.</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <h5 className="mb-3">Store activity</h5>
              <div className="d-grid gap-3">
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>New users</span>
                    <strong>68%</strong>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-success" style={{ width: "68%" }} />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Products added</span>
                    <strong>52%</strong>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-primary" style={{ width: "52%" }} />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Reviews posted</span>
                    <strong>41%</strong>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar bg-warning" style={{ width: "41%" }} />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;