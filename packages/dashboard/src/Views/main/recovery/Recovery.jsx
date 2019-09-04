import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames'
import {
    Row,
    Col,
    Progress
} from 'reactstrap'

export default class Recovery extends React.Component {
    render() {
        const {
            progress
        } = this.props;

        return (
            <Row className={cn(align.topCenter, align.full, align.noMarginPad)}>
                <Col md="10" className={cn(align.topCenter, "mt-5", "mb-5", align.noMarginPad)}>
                    <h2 className={cn("font-weight-light")}>
                        Block Recovery Progress
                    </h2>
                    <span className={cn("font-weight-light", "text-1")}>
                        Reading blocks and transactions to catch up to top of chain...
                    </span>
                </Col>
                <Col md="10" className={cn(align.topCenter, "mt-5", "mb-5", align.noMarginPad)}>
                    <div className={cn("font-weight-light", "text-1")}>
                        Processing block {progress.progress} of {progress.total}...
                    </div>
                    <div className={cn(align.noMarginPad, align.full)}>
                        <Progress value={(progress.progress/progress.total)*100} color="success" />
                    </div>
                </Col>
            </Row>
        )
    }
}