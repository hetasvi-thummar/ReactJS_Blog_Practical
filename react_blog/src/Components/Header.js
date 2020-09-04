import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Button,
} from "reactstrap";
// import logo from "../Images/headerlogo.png";
import { useHistory } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const user = localStorage.getItem("username");

  const token = localStorage.getItem("jwt");

  const logout = () => {
    if (localStorage.removeItem("jwt")) {
      history.push("/");
    } else {
      history.push("/");
    }
  };

  return (
    <Container>
      <Navbar expand="md" className="header-bg">
        <NavbarBrand className="pr-2">
          <h2>Blogs</h2>
          {/* <img className="header-logo" src={logo} alt="logo" /> */}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <NavbarText>{/* <FaUser className="usericon" /> */}</NavbarText>
          <NavbarText className="pr-2 text-secondary">
            {token ? (
              <Link to="/admin/tags" className="pl-2 text-white">
                Tags
              </Link>
            ) : (
              ""
            )}
          </NavbarText>

          <NavbarText className="pr-2 text-secondary">
            {token ? (
              <Link to="/admin/categories" className="pl-2 text-white">
                categories
              </Link>
            ) : (
              ""
            )}
          </NavbarText>

          <NavbarText className="pr-2 text-primary">
            {token ? (
              <div>
                <FaUser className="usericon" /> {user}
              </div>
            ) : (
              ""
            )}
          </NavbarText>

          <NavbarText>
            <Button className="btn-sm">
              {token ? (
                <FaSignOutAlt onClick={logout} className="signout" />
              ) : (
                <Link to="/login" className="pl-2 text-white">
                  Sign in
                </Link>
              )}
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
