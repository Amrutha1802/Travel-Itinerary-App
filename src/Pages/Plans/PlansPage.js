import React, { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext.js";
import { useUserContext } from "../../Contexts/UserContext.js";
import { useTripPlanContext } from "../../Contexts/TripPlanContext.js";
import StateTripCard from "./Components/StateTripCard/StateTripCard.js";
import { Row } from "react-bootstrap";

const PlansPage = () => {
  const { user } = useAuth();
  const { getPlansOfUser } = useUserContext();
  const { planDetails, setPlanDetails } = useTripPlanContext();
  useEffect(() => {
    setPlanDetails(getPlansOfUser(user?.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="plans-page-body">
      <h1>Plans</h1>
      <div>
        <Row xs={1} lg={3} md={3}>
          {planDetails?.map((plan, index) => {
            return (
              <StateTripCard
                key={index}
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
