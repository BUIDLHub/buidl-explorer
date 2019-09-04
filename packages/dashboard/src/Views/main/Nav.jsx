import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import classNames from "classnames";
import * as align from "Constants/alignments";
import mainStyles from "./main.module.scss";

export default class Navi extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand className={classNames(["text-white"])} href="/">
            <span className={classNames([mainStyles.title])}>
              Block-
              <span className={classNames([mainStyles.orange])}>Inspector</span>
            </span>
          </NavbarBrand>
          
        </Navbar>
      </div>
    );
  }
}
