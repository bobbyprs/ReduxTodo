import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Header(props) {
  return (
    <div className="heado">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <center>Redux-ToDo</center>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {!props.authCredentials.fname ? (
              <NavItem className="my-auto mx-2">
                <Link to="/"></Link>{" "}
              </NavItem>
            ) : (
              <>
                <NavItem className="my-auto mx-2">
                  <Link to="/todolist">TodoList</Link>{" "}
                </NavItem>
                <NavItem className="my-auto mx-2">
                  <Link to="/visibilityfilter">ToDo Filter</Link>{" "}
                </NavItem>
              </>
            )}
          </Nav>
          <Nav>
            <NavItem className="my-auto mx-2">
              {props.authCredentials.fname}
            </NavItem>

            {props.authCredentials.fname ? (
              <NavItem className="my-auto mx-2">
                <Link to="/logout">Logout</Link>{" "}
              </NavItem>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {props.authCredentials.fname ? <h1>ReduxToDo</h1> : <></>}
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    authCredentials: state.authCredentials
  };
};

export default connect(mapStateToProps)(Header);
