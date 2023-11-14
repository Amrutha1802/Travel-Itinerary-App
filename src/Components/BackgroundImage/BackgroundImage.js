import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./BackgroundImage.css";

const BackgroundImage = ({ url, description }) => {
  return (
    <div className="my-container">
      <Container fluid>
        <Row className="justify-content-center">
          <Col>
            <div className="image-with-text-container">
              <img src={url} alt="Background" className="responsive-image" />
              <div className="overlay">
                <h1 className="overlay-text">{description}</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BackgroundImage;
