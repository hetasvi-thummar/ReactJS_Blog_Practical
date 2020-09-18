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

  const logOut = () => {
    if (localStorage.removeItem("jwt")) {
      history.push("/");
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <Navbar className="header-bg shadow mb-5" light expand="md">
        <NavbarBrand>
          <FaComments className="header-logo" />
          <NavLink href="/" className="header-title-label" title="home">
            Blogs
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-3" />
        <Collapse isOpen={isOpen} navbar className="m-3">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/categories" title="categories">
                Categories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tags" title="tags">
                Tags
              </NavLink>
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
                  <NavLink href="/admin/posts" title="posts">
                    Posts
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/categories" title="categories">
                    Categories
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/tags" title="tags">
                    Tags
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logOut} className="text-center">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <Button className="header-signin-btn mr-4">
              <FaUserCircle className="usericon" />
              <Link to="/login" title="login">
                Sign in
              </Link>
            </Button>
          )}
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;
