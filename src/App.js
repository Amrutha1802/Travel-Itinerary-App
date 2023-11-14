import "./App.css";
import Main from "./Components/Main.js";
import SignupForm from "./Components/SignUp.js";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.js";
import { AuthProvider } from "./Contexts/AuthContext.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import ForgotPassword from "./Components/ForgotPassword.js";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import StatePlan from "./Components/State-Plan/StatePlan.js";
import TouristPlaces from "./Components/TouristPlaces/TouristPlaces.js";
import Favorites from "./Components/Favorites/Favorites.js";
import PlansPage from "./Components/Plans/PlansPage";
import PlanNewTrip from "./Components/PlanNewTrip/PlanNewTrip.js";
import { UserDataProvider } from "./Contexts/UserContext";
import { PlanDataProvider } from "./Contexts/PlanContext";
import { DateContextProvider } from "./Contexts/DateContext";
import { ItineraryDataProvider } from "./Contexts/ItineraryContext";
import { TripPlanDataProvider } from "./Contexts/TripPlanContext.js";

const queryClient = new QueryClient();
function App() {
  //
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserDataProvider>
          <PlanDataProvider>
            <DateContextProvider>
              <ItineraryDataProvider>
                <TripPlanDataProvider>
                  <div className="App">
                    <Routes>
                      <Route exact path="/" element={<Main />}></Route>
                      <Route path="signup" element={<SignupForm />}></Route>
                      <Route
                        path="/home"
                        element={
                          <ProtectedRoute>
                            <Home />
                          </ProtectedRoute>
                        }
                      ></Route>
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      ></Route>
                      <Route
                        path="/tourist-places-in/:statename/:stateId"
                        element={
                          <ProtectedRoute>
                            <TouristPlaces />
                          </ProtectedRoute>
                        }
                      ></Route>
                      <Route
                        path="/favorites"
                        element={
                          <ProtectedRoute>
                            <Favorites />
                          </ProtectedRoute>
                        }
                      ></Route>
                      <Route
                        path="/plans"
                        element={
                          <ProtectedRoute>
                            <PlansPage />
                          </ProtectedRoute>
                        }
                      ></Route>
                      <Route
                        path="/plan-a-new-trip"
                        element={
                          <ProtectedRoute>
                            <PlanNewTrip />
                          </ProtectedRoute>
                        }
                      ></Route>
                      <Route
                        path="/plans/trip-plan/:stateName/:firstDate/:lastDate"
                        element={
                          <ProtectedRoute>
                            <StatePlan />
                          </ProtectedRoute>
                        }
                      ></Route>
                    </Routes>
                  </div>
                </TripPlanDataProvider>
              </ItineraryDataProvider>
            </DateContextProvider>
          </PlanDataProvider>
        </UserDataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
