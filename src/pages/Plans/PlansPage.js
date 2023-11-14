import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar.js";
import { useAuth } from "../../Contexts/AuthContext.js";
import { useUserContext } from "../../Contexts/UserContext.js";
import { useTripPlanContext } from "../../Contexts/TripPlanContext.js";
import axios from "axios";
import { useQuery } from "react-query";
import StateTripCard from "../../Components/StateTripCard/StateTripCard.js";
import { Row } from "react-bootstrap";

const fetchStates = async () => {
  const response = await axios.get(`http://localhost:4000/states`);
  return response.data;
};
const PlansPage = () => {
  const { user } = useAuth();
  const { getPlansOfUser } = useUserContext();
  const { planDetails, setPlanDetails } = useTripPlanContext();
  useEffect(() => {
    setPlanDetails(getPlansOfUser(user?.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    data: statesData,
    isLoading: areStatesLoading,
    isError,
  } = useQuery(["states"], () => fetchStates());
  if (areStatesLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="plans-page-body">
      <NavBar />
      <h1>Plans</h1>
      <div>
        <Row xs={1} lg={3} md={3}>
          {planDetails?.map((plan, index) => {
            return (
              <StateTripCard
                key={index}
                statesData={statesData}
                state={plan.state}
                tripDates={plan.tripDates}
              />
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default PlansPage;
