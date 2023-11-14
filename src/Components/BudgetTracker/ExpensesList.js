import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faCutlery } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { Card, Row } from "react-bootstrap";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import "./BudgetTracker.css";

const categoryIcons = {
  Food: faCutlery,
  Shopping: faCartShopping,
  Activities: faPersonWalking,
  Stay: faHotel,
  Travel: faPlane,
  Other: faFaceSmile,
};
const ExpensesList = ({ expenses }) => {
  if (expenses === null || expenses === undefined || expenses.length === 0) {
    return <p>No Expenses to display</p>;
  }
  return (
    <div className="expenses-list">
      <Row xs={1} lg={4} md={3}>
        {expenses.map((expense, index) => (
          <Card key={index} className="mx-5 my-5 cardStyle" variant="top">
            <div className="exp-icon">
              {expense.category && (
                <>
                  <div className="icon-container">
                    {expense.category !== "others" && (
                      <FontAwesomeIcon
                        icon={categoryIcons[expense.category]}
                        style={{ marginLeft: "15px", marginRight: "15px" }}
                      />
                    )}
                    <p className="exp-heading">{expense.category}</p>
                  </div>
                </>
              )}
            </div>
            <div className="exp-list">
              <div>
                {expense.description && <p>{expense.description}</p>}
                <span>
                  <p>{expense.amount} Rupees</p>
                </span>
              </div>
            </div>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default ExpensesList;
