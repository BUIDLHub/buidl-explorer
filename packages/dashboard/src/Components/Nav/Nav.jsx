import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames';
import {
    Row,
    Col,
    Nav,
    Navbar,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Logo from './LogoBlock';

export default class BINav extends React.Component {
    render() {
        const {
            web3Running
        } = this.props;

        let barClass = cn("top-nav", align.full);
        let navItems = (
            <React.Fragment>

              <NavItem className={cn(align.allCenter,"mr-2")}>
                <NavLink className={cn("text-dark")} href="#" onClick={this.props.toSettings} >
                  Settings
                </NavLink>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Network
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.props.toggleNetwork}>
                    {web3Running?"Stop Realtime":"Start Realtime"}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </React.Fragment>
          )
        return (
            <Navbar light expand="sm" className={cn(barClass)}>
                <Row className={cn(align.allCenter, align.full, align.noMarginPad)}>
                    <Col md="12" className={cn(align.leftCenter, align.noMarginPad)}>
                    <Row className={cn(align.allCenter, align.noMarginPad, align.full)}>
                        <Col md="4" className={cn(align.leftCenter, align.noMarginPad)}>
                            <Logo goHome={this.props.goHome}/>
                        </Col>

                        <Col md="8" className={cn(align.rightCenter, align.noMarginPad)}>
                            <Nav navbar className={cn("ml-auto", "text-md", "font-weight-light", "p-0")}>
                                {navItems}
                            </Nav>
                        </Col>
                    </Row>
                    </Col>
                </Row>
            </Navbar>
        )
    }
}