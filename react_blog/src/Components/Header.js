import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Button,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
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
            <Link to="/tags" className="pl-2 text-white">
              Tags
            </Link>
          )}
        </NavbarText>

        <NavbarText className="pr-2 text-secondary">
          {token ? (
            <Link to="/admin/categories" className="pl-2 text-white">
              Categories
            </Link>
          ) : (
            <Link to="/categories" className="pl-2 text-white">
              Categories
            </Link>
          )}
        </NavbarText>

        <NavbarText className="pr-2 text-secondary">
          {token ? (
            <Link to="/admin/posts" className="pl-2 text-white">
              Posts
            </Link>
          ) : (
            <Link to="/" className="pl-2 text-white">
              Posts
            </Link>
          )}
        </NavbarText>

        {/* <NavbarText className="pr-2 text-primary">
            {token ? (
              <div>
                <FaUser className="usericon" /> {user}
              </div>
            ) : (
              ""
            )}
          </NavbarText> */}

        <UncontrolledDropdown>
          <DropdownToggle nav>
            {token ? (
              <div>
                <FaUser className="usericon" /> {user}
              </div>
            ) : (
              <Button>
                <Link to="/login" className="pl-2 text-white">
                  Sign in
                </Link>
              </Button>
            )}
          </DropdownToggle>
          <DropdownMenu center>
            <DropdownItem>Posts</DropdownItem>
            <DropdownItem>Categories</DropdownItem>
            <DropdownItem>Tags</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>Logout</DropdownItem>
            {/* <DropdownItem>
              <Button className="btn-sm">
                {token ? (
                  <Button onClick={logout} className="signout" />
                ) : (
                  <Link to="/login" className="pl-2 text-white">
                    Sign in
                  </Link>
                )}
              </Button>
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* <NavbarText>
            <Button className="btn-sm">
              {token ? (
                <FaSignOutAlt onClick={logout} className="signout" />
              ) : (
                <Link to="/login" className="pl-2 text-white">
                  Sign in
                </Link>
              )}
            </Button>
          </NavbarText> */}
      </Collapse>
    </Navbar>
  );
};

export default Header;
