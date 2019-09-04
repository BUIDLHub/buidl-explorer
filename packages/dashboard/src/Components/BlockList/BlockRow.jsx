import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames';
import {
    Row,
    Col
} from 'reactstrap';
import moment from 'moment';


const LABEL_CLASS = cn("bi-label", align.leftLeft,  "text-left", "font-weight-light",
                                   "text-muted", "text-sz-sm", "m-0", "p-0");
const VALUE_CLASS = cn(align.leftLeft, "font-weight-bold",
                              "text-1", "text-center", "m-0", "p-0");

export default class BlockRow extends React.Component {
    render() {
        const {
            block
        } = this.props;
        let delta = Math.ceil(Date.now()/1000) - block.timestamp;
        let ts = moment.duration(delta*1000).humanize();

        return (
            <Row className={cn("block-row", align.leftCenter, align.full, "border-bottom", align.noMarginPad)}>
                <Col md="1" className={cn(align.leftCenter, align.noMarginPad)}>
                    <i className={cn("fa fa-cube", "text-muted", "text-2")} />
                </Col>
                <Col md="11" className={cn(align.leftCenter, align.noMarginPad)}>
                    <div className={cn("container", align.full, align.leftCenter, align.noMarginPad)}>
                        <Row className={cn(align.leftCenter, align.full, align.noMarginPad)}>
                            <Col md="4" className={cn(align.allCenter, align.noMarginPad)}>
                                <ColContent title={block.number} subTitle={`${ts} ago`} />
                            </Col>

                            <Col md="4" className={cn(align.allCenter, align.noMarginPad)}>
                                <ColContent title={`${block.miner.substring(0, 10)}...`} subTitle={`0 txns in ${ts}`} />
                            </Col>

                            <Col md="4" className={cn(align.allCenter, align.noMarginPad)}>
                                <div className={cn(align.topCenter, align.full, align.noMarginPad)}>
                                    
                                    <span className={cn("font-weight-light", "text-1")}>Contract Calls: {block.stats.contractCalls}</span>
                                    <span className={cn("font-weight-light", "text-1")}>Value Xfers: {block.stats.valueXfers}</span>
                                
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
}

class ColContent extends React.Component {
    render() {
        const {
            title,
            subTitle
        } = this.props;

        return (
            <Row className={cn("block-col-content", align.topCenter, align.noMarginPad)}>
                <Col md="12" className={cn(align.leftCenter, align.noMarginPad)}>
                    <div className={cn(align.noMarginPad, align.full)}>
                        <Row className={cn(align.leftCenter, align.full, align.noMarginPad)}>
                            <Col md="10" className={cn(VALUE_CLASS)}>
                                {title}
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md="12" className={cn(align.leftCenter, align.noMarginPad)}>
                    <Row className={cn(align.leftCenter, align.full, align.noMarginPad)}>
                        <Col md="10" className={cn(LABEL_CLASS)}>
                            {subTitle}
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}
