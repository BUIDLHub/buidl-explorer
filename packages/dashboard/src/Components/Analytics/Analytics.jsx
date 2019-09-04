import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames';
import {
    Row,
    Col
} from 'reactstrap';
import Metrics from './AnalyticBox';

export default class Analytics extends React.Component {
    render() {
        const {
            metrics
        } = this.props;

        return (
            <Row className={cn(align.leftCenter, align.full, align.noMarginPad)}>
                <Col md="7" className={cn(align.leftCenter, align.noMarginPad)}>
                    <Metrics metrics={metrics} />
                </Col>
                <Col md="5" className={cn(align.allCenter, align.noMarginPad)}>
                    Chart
                </Col>
            </Row>
        )
    }
}
