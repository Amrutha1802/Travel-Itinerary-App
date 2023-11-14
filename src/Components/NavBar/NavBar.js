import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Form, FormControl } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import "./NavBar.css";

const fetchStates = async () => {
  const response = await axios.get(`http://localhost:4000/states`);
  return response.data;
};
const NavBar = () => {
  const { logout, user } = useAuth();
  const [searchState, setSearchState] = useState("");
  const [searchUnionTerritory, setSearchUnionTerritory] = useState("");
  const {
    data: states,
    isLoading: areStatesLoading,
    isError,
  } = useQuery(["states"], () => fetchStates());
  if (areStatesLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  const statesData = states.filter((state) => state.type === "state");
  const unionTerritoriesData = states.filter(
    (territory) => territory.type === "territory"
  );

  const filteredStatesData = statesData.filter((item) =>
    item.name.toLowerCase().includes(searchState.toLowerCase())
  );
  const filteredUnionTerritoriesData = unionTerritoriesData.filter((item) =>
    item.name.toLowerCase().includes(searchUnionTerritory.toLowerCase())
  );
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link className="link navbar-title" to="/home">
            Home
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto flex-lg-row justify-content-lg-around align-items-lg-center align-items-sm-start">
            <div>
              <NavDropdown
                title="States"
                id="responsive-nav-dropdown"
                className="mx-lg-6 px-lg-4 navbar-title"
              >
                <Form className="px-3 py-2">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={searchState}
                    onChange={(e) => setSearchState(e.target.value)}
                  />
                </Form>
                <NavDropdown.Divider />
                {filteredStatesData.map((state) => (
                  <NavDropdown.Item key={state.id}>
                    <Link
                      className="link"
                      to={`/tourist-places-in/${state.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/${state.id}`}
                    >
                      {state.name}
                    </Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
            <div>
              <NavDropdown
                title="Union Territories"
                id="responsive-nav-dropdown"
                className="text-center mx-lg-6 px-lg-4 navbar-title"
              >
                <Form className="px-3 py-2">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={searchUnionTerritory}
                    onChange={(e) => setSearchUnionTerritory(e.target.value)}
                  />
                </Form>
                <NavDropdown.Divider />
                {filteredUnionTerritoriesData.map((territory) => (
                  <NavDropdown.Item key={territory.id}>
                    <Link
                      className="link"
                      to={`/tourist-places-in/${territory.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/${territory.id}`}
                    >
                      {territory.name}
                    </Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
            <Nav.Link
              as={Link}
              to="/favorites"
              className="mx-lg-6 px-lg-5 navbar-title"
            >
              <span className="navbar-title">Favorites</span>
            </Nav.Link>
            <div>
              {user && (
                <Nav.Link
                  as={Link}
                  to="/plans"
                  className="mx-lg-6 px-lg-5 navbar-title"
                >
                  <span className="navbar-title">Plans</span>
                </Nav.Link>
              )}
            </div>
            <div>
              <Nav.Link
                className="mx-lg-6 px-lg-5 align-items-sm-start navbar-title"
                onClick={handleLogout}
              >
                <span className="navbar-title">Logout</span>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
