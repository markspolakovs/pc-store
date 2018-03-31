import * as React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
const Ionicon = require("react-ionicons");

import Cart from "../Cart/component";

interface State {
  isOpen: boolean;
}

export default class NavbarComponent extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  render() {
    return (
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Pupils' Committee Store</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink><Cart /></NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
