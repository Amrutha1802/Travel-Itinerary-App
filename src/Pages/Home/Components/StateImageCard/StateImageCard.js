import { Card, Col } from "react-bootstrap";
import "./StateImageCard.css";

export default function StateImageCard({ id, logo, name, description }) {
  return (
    <>
      <Col key={id} className="d-flex">
        <Card className="mx-5 my-5 card-container shadow" variant="top">
          <div className="image-container">
            <Card.Img
              className="card-image"
              variant="top"
              src={logo}
              alt={name}
            />
          </div>
          <Card.Body className="white">
            <Card.Title
              className="text-center mt-2 mb-4 text-break state-name"
              style={{ color: "black" }}
            >
              {name}
            </Card.Title>
            <hr />
            <Card.Text className="d-flex justify-content-around state-desc">
              <span style={{ color: "black" }} title={description}>
                {description?.substring(0, 100)}...
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
