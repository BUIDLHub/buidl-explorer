import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';
import cn from 'classnames';
import * as align from 'Constants/alignments';


export default class Section extends React.Component {
  render() {
    const {
      className
    } = this.props;
    return (
      <Row className={cn("metric-section", className, align.leftCenter, align.full, "pt-2", align.noMarginPad)}>
        <Col md="12" className={cn(align.leftCenter, "p-0")}>
          {this.props.children}
        </Col>
      </Row>
    )
  }
}
