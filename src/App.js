import "./App.css";
import Main from "./Pages/MainPage/Main.js";
import SignupForm from "./Pages/SignUp.js";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import { AuthProvider } from "./Contexts/AuthContext.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import ForgotPassword from "./Pages/ForgotPassword.js";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import StatePlan from "./Pages/State-Plan/StatePlan.js";
import TouristPlaces from "./Pages/TouristPlaces/TouristPlaces.js";
import Favorites from "./Pages/Favorites/Favorites.js";
import PlansPage from "./Pages/Plans/PlansPage.js";
import PlanNewTrip from "./Pages/PlanNewTrip/PlanNewTrip.js";
import { UserDataProvider } from "./Contexts/UserContext";
import { PlanDataProvider } from "./Contexts/PlanContext";
import { DateContextProvider } from "./Contexts/DateContext";
import { ItineraryDataProvider } from "./Contexts/ItineraryContext";
import { TripPlanDataProvider } from "./Contexts/TripPlanContext.js";
import NavBar from "./Components/NavBar/NavBar.js";
import { useLocation } from "react-router-dom";
const queryClient = new QueryClient();
function App() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserDataProvider>
          <PlanDataProvider>
            <DateContextProvider>
              <ItineraryDataProvider>
                <TripPlanDataProvider>
                  {!isMainPage && <NavBar />}
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
