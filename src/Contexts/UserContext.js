import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserDataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const addUserToLocalStorage = (email) => {
    const newUser = { email, favorites: [] };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const setFavoritesInLocalStorage = (
    userEmail,
    id,
    images,
    name,
    review,
    description
  ) => {
    const newItem = { id, review, name, images, description };
    const updatedUsers = users.map((user) => {
      if (user.email === userEmail) {
        if (!user.favorites.some((item) => item.id === id)) {
          user.favorites.push(newItem);
        }
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const removeFromFavoritesInLocalStorage = (userEmail, itemId) => {
    const updatedUsers = users.map((user) => {
      if (user.email === userEmail) {
        user.favorites = user.favorites.filter((item) => item.id !== itemId);
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const getFavoritesByUserEmail = (userEmail) => {
    const user = users.find((user) => user.email === userEmail);
    return user ? user.favorites : [];
  };

  const checkAndAddUser = (email) => {
    const userExists = users.some((user) => user.email === email);
    if (!userExists) {
      addUserToLocalStorage(email);
    }
  };

  const addItineraryDetailsToLocalStorage = (
    userEmail,
    state,
    tripDates,
    notes,
    itineraryPlaces,
    budget,
    expenses
  ) => {
    const newPlan = {
      state,
      tripDates,
      notes,
      itineraryPlaces,
      budget,
      expenses,
    };

    const user = users.find((user) => user.email === userEmail);
    if (!user.plans) {
      user.plans = [];
    }

    const existingPlanIndex = user.plans.findIndex(
      (plan) =>
        plan.state === state &&
        JSON.stringify(plan.tripDates) === JSON.stringify(tripDates)
    );

    if (existingPlanIndex !== -1) {
      user.plans[existingPlanIndex] = {
        ...user.plans[existingPlanIndex],
        notes,
        itineraryPlaces,
        budget,
        expenses,
      };
    } else {
      user.plans.push(newPlan);
    }

    localStorage.setItem("users", JSON.stringify(users));
  };
  const getPlansOfUser = (userEmail) => {
    const user = users.find((user) => user.email === userEmail);
    return user ? user.plans : [];
  };

  const removePlans = (userEmail) => {
    const updatedUsers = users.map((user) => {
      if (user.email === userEmail) {
        user.plans = [];
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  function getPlanByEmailAndDates(email, state, tripStartDate, tripEndDate) {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.email === email);
    if (user && user.plans) {
      const matchingPlan = user.plans.find((plan) => {
        return (
          plan.state === state &&
          plan.tripDates[0] === tripStartDate &&
          plan.tripDates[1] === tripEndDate
        );
      });
      return matchingPlan || null;
    }
    return null;
  }
  function setNotesOfPlan(email, notes, state, tripStartDate, tripEndDate) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === email && user.plans) {
        user.plans.forEach((plan) => {
          if (
            plan.state === state &&
            plan.tripDates[0] === tripStartDate &&
            plan.tripDates[1] === tripEndDate
          ) {
            plan.notes = notes;
          }
        });
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
  function addTimingsToPlace(
    email,
    state,
    tripStartDate,
    tripEndDate,
    placeName,
    date,
    startTime,
    endTime
  ) {
    const timings = [startTime, endTime];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === email && user.plans) {
        user.plans.forEach((plan) => {
          if (
            plan.state === state &&
            plan.tripDates[0] === tripStartDate &&
            plan.tripDates[1] === tripEndDate
          ) {
            if (plan.itineraryPlaces) {
              plan.itineraryPlaces.forEach((itinerary) => {
                if (itinerary.date === date) {
                  const foundPlace = itinerary.places.find(
                    (place) => place.name === placeName
                  );
                  if (foundPlace) {
                    foundPlace.time = timings;
                  }
                }
              });
            }
          }
        });
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  function addExpenseToPlan(
    email,
    state,
    tripStartDate,
    tripEndDate,
    newExpense
  ) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === email && user.plans) {
        user.plans.forEach((plan) => {
          if (
            plan.state === state &&
            plan.tripDates[0] === tripStartDate &&
            plan.tripDates[1] === tripEndDate
          ) {
            if (!plan.expenses) {
              plan.expenses = [];
            }
            plan.expenses.push(newExpense);
          }
        });
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
  function setBudgetOfPlan(email, state, tripStartDate, tripEndDate, budget) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === email && user.plans) {
        user.plans.forEach((plan) => {
          if (
            plan.state === state &&
            plan.tripDates[0] === tripStartDate &&
            plan.tripDates[1] === tripEndDate
          ) {
            plan.budget = budget;
          }
        });
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
  function addPlaceToUserPlan(
    email,
    state,
    tripStartDate,
    tripEndDate,
    date,
    name,
    url,
    time
  ) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newPlace = { name, url };
    newPlace.time = time;

    const updatedUsers = users.map((user) => {
      if (user.email === email && user.plans) {
        user.plans.forEach((plan) => {
          if (
            plan.state === state &&
            plan.tripDates[0] === tripStartDate &&
            plan.tripDates[1] === tripEndDate
          ) {
            if (!plan.itineraryPlaces) {
            }
            const itineraryIndex = plan.itineraryPlaces.findIndex(
              (itinerary) => itinerary.date === date
            );
            if (itineraryIndex < 0) {
              const obj = { date };
              plan.itineraryPlaces.push(obj);
              const index = plan.itineraryPlaces.findIndex(
                (itinerary) => itinerary.date === date
              );
              plan.itineraryPlaces[index].places = [newPlace];
            }
            if (itineraryIndex !== -1) {
              plan.itineraryPlaces[itineraryIndex].places.push(newPlace);
            }
          }
        });
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
  const fetchItPlaces = (email, state, tripDates, dateInfo) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.email === email);

    if (user && user.plans) {
      const matchingPlan = user.plans.find((plan) => {
        return (
          plan.state === state &&
          plan.tripDates[0] === tripDates[0] &&
          plan.tripDates[1] === tripDates[1]
        );
      });

      if (matchingPlan && matchingPlan.itineraryPlaces) {
        const matchingPlaces = matchingPlan.itineraryPlaces
          .filter((place) => place.date === dateInfo)
          .map((place) => place.places);

        if (matchingPlaces.length > 0) {
          return matchingPlaces;
        }
      }
    }

    return "Places not found";
  };

  const removePlanOfUser = (email, stateName, tripDates) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === email);

    if (user) {
      user.plans = user.plans.filter(
        (plan) =>
          !(
            plan.state === stateName &&
            plan.tripDates[0] === tripDates[0] &&
            plan.tripDates[1] === tripDates[1]
          )
      );
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const contextValue = {
    users,
    checkAndAddUser,
    addUserToLocalStorage,
    setFavoritesInLocalStorage,
    getFavoritesByUserEmail,
    removeFromFavoritesInLocalStorage,
    addItineraryDetailsToLocalStorage,
    getPlansOfUser,
    removePlans,
    getPlanByEmailAndDates,
    setNotesOfPlan,
    selectedPlan,
    setSelectedPlan,
    addPlaceToUserPlan,
    addExpenseToPlan,
    setBudgetOfPlan,
    addTimingsToPlace,
    fetchItPlaces,
    removePlanOfUser,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
