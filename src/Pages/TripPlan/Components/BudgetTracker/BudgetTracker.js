import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useItineraryContext } from "../../../../Contexts/ItineraryContext.js";
import ExpensesList from "../ExpensesList/ExpensesList.js";
import { useUserContext } from "../../../../Contexts/UserContext.js";
import { useAuth } from "../../../../Contexts/AuthContext.js";
import "./BudgetTracker.css";

const BudgetTracker = ({
  flag = "new",
  tripState = "default",
  tripExpenses = "default",
  tripDates = "default",
  tripBudget = 0,
}) => {
  const { user } = useAuth();
  const localExpenses = tripExpenses;
  const calculateTotalExpense = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };
  const { expenses, setExpenses, budget, setBudget } = useItineraryContext();
  const [budgetOfTrip, setBudgetOfTrip] = useState(parseInt(tripBudget));
  const { addExpenseToPlan, setBudgetOfPlan } = useUserContext();
  const [remainingBudget, setRemainingBudget] = useState(0);
  useEffect(() => {
    if (flag === "edit") {
      setRemainingBudget(budgetOfTrip - calculateTotalExpense(localExpenses));
      setBudgetOfPlan(
        user.email,
        tripState,
        tripDates[0],
        tripDates[1],
        budgetOfTrip
      );
    }
    setBudget(tripBudget);
  }, [
    budgetOfTrip,
    flag,
    tripBudget,
    setBudget,
    setBudgetOfPlan,
    localExpenses,
    user.email,
    tripState,
    tripDates,
  ]);

  if (flag === "edit") {
    setBudget(tripBudget);
  }
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: 0,
    description: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const categories = [
    "Food",
    "Travel",
    "Stay",
    "Activities",
    "Shopping",
    "Other",
  ];
  const handleBudgetChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || (inputValue > 0 && !isNaN(inputValue))) {
      setBudget(inputValue === "" ? 0 : parseInt(inputValue, 10));
    }
  };

  const handleBudgetOfTripChange = (e) => {
    setBudgetOfTrip(parseInt(e.target.value, 10));
    setBudgetOfPlan(
      user.email,
      tripState,
      tripDates[0],
      tripDates[1],
      budgetOfTrip
    );
  };
  const handleCategoryChange = (e) => {
    setNewExpense({ ...newExpense, category: e.target.value });
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value.replace(0, "");

    if (inputValue === "" || (!isNaN(inputValue) && isFinite(inputValue))) {
      setNewExpense({
        ...newExpense,
        amount: inputValue === "" ? 0 : parseInt(inputValue, 10),
      });
    }
  };

  const handleDescriptionChange = (e) => {
    setNewExpense({ ...newExpense, description: e.target.value });
  };
  const addExpense = () => {
    if (flag === "edit") {
      if (newExpense.amount > 0 && newExpense.category !== "") {
        localExpenses.push(newExpense);
        setNewExpense({ category: "", amount: 0, description: "" });
        addExpenseToPlan(
          user.email,
          tripState,
          tripDates[0],
          tripDates[1],
          newExpense
        );
      }
      setRemainingBudget(budgetOfTrip - calculateTotalExpense(localExpenses));
    } else {
      if (newExpense.amount > 0 && newExpense.category !== "") {
        setExpenses([...expenses, newExpense]);
        setNewExpense({ category: "", amount: 0, description: "" });
      }
    }
  };

  return (
    <div>
      <label className="budget-heading">Set Budget (Rupees):</label>
      {flag === "edit" ? (
        <input
          type="number"
          value={budgetOfTrip}
          onChange={handleBudgetOfTripChange}
        />
      ) : (
        <input
          type="number"
          value={budget === "" ? "" : budget}
          onChange={handleBudgetChange}
        />
      )}
      <br />
      <div>
        <div>
          {flag === "edit" && typeof remainingBudget === "number" && (
            <div>Remaining Budget: {remainingBudget} Rupees</div>
          )}
        </div>
        {flag !== "edit" && (
          <div>
            Remaining Budget:{" "}
            {budget > 0
              ? budget -
                expenses.reduce((sum, expense) => sum + expense.amount, 0)
              : 0}{" "}
            Rupees
          </div>
        )}
      </div>

      <button
        className="button-style expense-btn"
        onClick={() => {
          setIsFormVisible(!isFormVisible);
        }}
      >
        Add Expense
      </button>
      {isFormVisible &&
        (budget > 0 ? (
          <div>
            <label className="budget-heading">Category:</label>
            <select
              className="category-dropdown"
              value={newExpense.category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <br />
            {newExpense.amount === "" && <p>please select category</p>}
            <label>Description:</label>
            <input
              type="text"
              value={newExpense.description}
              onChange={handleDescriptionChange}
            />
            <br />
            <label>Amount (Rupees):</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={handleAmountChange}
            />
            <button className="button-style add-btn" onClick={addExpense}>
              Add
            </button>
          </div>
        ) : (
          <p>Please Enter Budget</p>
        ))}

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Expenses by Category:</Accordion.Header>
          <Accordion.Body>
            {flag === "edit" ? (
              <ExpensesList expenses={localExpenses} />
            ) : (
              <ExpensesList expenses={expenses} />
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default BudgetTracker;
