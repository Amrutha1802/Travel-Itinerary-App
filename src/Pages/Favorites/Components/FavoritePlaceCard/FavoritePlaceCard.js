import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useUserContext } from "../../../../Contexts/UserContext.js";
import { useAuth } from "../../../../Contexts/AuthContext.js";
const FavoritePlaceCard = ({ id, images, name, review, description }) => {
  const { user } = useAuth();
  const { removeFromFavoritesInLocalStorage } = useUserContext();
  const handleRemoveFromFavorites = () => {
    removeFromFavoritesInLocalStorage(
      user.email,
      id,
      images,
      name,
      review,
      description
    );
  };
  return (
    <Col key={id} className="d-flex">
      <Card className="mx-5 my-3 card-container shadow">
        <div className="image-container">
          <Card.Img
            className="card-image"
            variant="top"
            src={images[0].url}
            alt={name}
          />
        </div>
        <div className="position-absolute top-0 end-0 p-2">
          <div className="bg-white text-dark p-2">
            <strong>{review}</strong>/5
          </div>
        </div>
        <Card.Body>
          <Card.Title className="text-center mt-2 mb-4">{name}</Card.Title>
          <hr />
          <Card.Text className="d-flex justify-content-around">
            <span style={{ color: "black" }} title={description}>
              {description?.substring(0, 100)}...
            </span>
          </Card.Text>
          <div className="d-flex justify-content-between mt-3">
            <Button className="btn" onClick={handleRemoveFromFavorites}>
              Remove from favorites
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FavoritePlaceCard;
