import React from "react";
import * as align from 'Constants/alignments'
import cn from 'classnames'
import {
  Row,
  Col,
  Button
} from 'reactstrap'

import Recovery from './recovery';
import Nav from 'Components/Nav';
import Search from 'Components/Search';
import Analytics from 'Components/Analytics';
import BlockList from 'Components/BlockList';
import TxnList from 'Components/TxnList';

export default class Main extends React.Component {
  render() {
    const {
      recoveryProgress,
      realtimeEnabled
    } = this.props;

    if(recoveryProgress.total > 0 && recoveryProgress.progress < recoveryProgress.total) {
      return (
        <Recovery />
      )
    }

    let label = "";
    if(realtimeEnabled) {
      label = "Start Web3"
    } else  {
      label = "Stop Web3"
    }

    return (
      <Row className={cn(align.topCenter, align.full, align.noMarginPad)}>
        <Col md="10" className={cn(align.topCenter, align.noMarginPad)}>
          <Nav />
        </Col>
        <Col md="10" className={cn(align.topCenter, align.noMarginPad)}>
          <Search />
        </Col>
        <Col md="10" className={cn(align.topCenter, align.noMarginPad)}>
          <Analytics />
        </Col>
        <Col md="10" className={cn(align.topCenter, "mt-5", "mb-5", align.noMarginPad)}>
          <div className={cn(align.full, align.noMarginPad)}>
            <Row className={cn(align.leftCenter, align.full, align.noMarginPad)}>
              <Col md="6" className={cn(align.leftCenter, align.noMarginPad)}>
                <BlockList />
              </Col>
              <Col md="6" className={cn(align.leftCenter, align.noMarginPad)}>
                <TxnList />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    )
  }
}
