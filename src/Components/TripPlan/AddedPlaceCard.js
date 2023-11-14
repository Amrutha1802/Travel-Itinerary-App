import React from "react";
import { Card } from "react-bootstrap";
import { Space, TimePicker } from "antd";
import moment from "moment";
function AddedPlaceCard({ name, imageUrl, timings }) {
  return (
    <div>
      {" "}
      <Card className="mx-5 my-5 shadow" variant="top">
        <div className="image-container">
          <Card.Img
            className="card-image"
            variant="top"
            src={imageUrl}
            alt={name}
          />
        </div>
        <div className="buttons-container">
          <Card.Title
            className="text-center mt-3 mb-3 text-break state-name"
            style={{ color: "black" }}
          >
            {name}
          </Card.Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "20px", marginTop: "15px" }}>Timings</p>
            <Space direction="vertical" style={{ marginTop: "5px" }}>
              <TimePicker.RangePicker
                status="warning"
                format="HH:mm"
                defaultValue={
                  timings &&
                  timings.length === 2 &&
                  timings[0] !== null &&
                  timings[1] !== null
                    ? [moment(timings[0], "HH:mm"), moment(timings[1], "HH:mm")]
                    : undefined
                }
              />
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AddedPlaceCard;
