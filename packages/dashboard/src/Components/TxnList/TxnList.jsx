import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames';
import {
    Row,
    Col
} from 'reactstrap';
import TxnRow from './TxnRow';


/*

                */
export default class TxnList extends React.Component {
    render() {
        const {
            txns
        } = this.props;
       
        return (
            <Row className={cn("txn-list-container", align.topCenter, align.full, align.noMarginPad)}>
                <Col md="11" className={cn(align.leftCenter, align.noMarginPad)}>
                    <h2 className={cn("text-dark", "font-weight-light")}>Latest Txns</h2>
                </Col>

                <Col md="11" className={cn(align.topCenter, align.noMarginPad)}>
                    {
                        txns.map((t,i)=>{
                            if(t.receipt) {
                                return (
                                    <TxnRow txn={t} key={i} />
                                )
                            }
                            return null;
                        })
                    }
                </Col>
                
            </Row>
        )
    }
}