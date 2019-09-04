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

export default class TxnRow extends React.Component {
    render() {
        const {
            txn
        } = this.props;
        let delta = Math.ceil(Date.now()/1000) - txn.timestamp;
        let ts = moment.duration(delta*1000).humanize();
        let toAddr = txn.to;
        if(!toAddr) {
            if(txn.receipt) {
                toAddr = txn.receipt.contractAddress || "unknown";
            } else {
                toAddr = "unknown";
            }
        }
        if(toAddr.length > 10) {
            toAddr = toAddr.substring(0, 10) + "...";
        }
        let iconClass = "fa fa-exchange";
        
        if(txn.input.length > 2) {
            iconClass = "fa fa-file-o";
        }
        if(!txn.receipt.status) {
            iconClass = "fa fa-exclamation-triangle";
        }
        return (
            <Row className={cn("txn-row", align.leftCenter, align.full, "border-bottom", align.noMarginPad)}>
                <Col md="1" className={cn(align.leftCenter, align.noMarginPad)}>
                    <i className={cn(iconClass, "text-muted", "text-2")} />
                </Col>
                <Col md="11" className={cn(align.leftCenter, align.noMarginPad)}>
                    <div className={cn(align.full, align.leftCenter, align.noMarginPad)}>
                        <Row className={cn(align.leftCenter, align.full, align.noMarginPad)}>
                            <Col md="4" className={cn(align.allCenter, align.noMarginPad)}>
                                <ColContent title={`${txn.hash.substring(0, 10)}...`} subTitle={`${ts} ago`} />
                            </Col>

                            <Col md="4" className={cn(align.allCenter, align.noMarginPad)}>
                                <ColContent title={txn.receipt.gasUsed} subTitle="gas used" /> 
                            </Col>

                            <Col md="4" className={cn(align.allCenter, align.noMarginPad)}>
                                <div className={cn("txn-col-content", align.topLeft, align.full, align.noMarginPad)}>
                                    <span className={cn("font-weight-light", "text-1")}>From: {`${txn.from.substring(0, 10)}...`}</span>
                                    <span className={cn("font-weight-light", "text-1")}>To: {toAddr}</span>
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
            <Row className={cn("txn-col-content", align.topCenter, align.noMarginPad)}>
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
