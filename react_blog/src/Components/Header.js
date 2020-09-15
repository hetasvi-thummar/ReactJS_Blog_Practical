import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { FaComments, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <div>
      <Navbar className="header-bg shadow mb-3" light expand="md">
        <NavbarBrand>
          <FaComments className="header-logo" />
          <Link to="/" className="header-title-label">
            Blogs
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-3" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/categories">Categories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tags">Tags</NavLink>
            </NavItem>
          </Nav>
          {token ? (
            <UncontrolledDropdown>
              <DropdownToggle nav>
                <div className="user-box">
                  <FaUserCircle className="usericon" /> {user}
                </div>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/admin/posts">Posts</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/categories">Categories</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/tags">Tags</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout} className="text-center">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <Button className="header-signin-btn mr-4">
              <FaUserCircle className="usericon" />
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
