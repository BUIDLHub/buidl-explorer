import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames';
import {
    Row,
    Col
} from 'reactstrap';
import Section from './Section';
import BlockInfo from './BlockInfo';
import TxnInfo from './TxnInfo';
import GasInfo from './GasInfo';
import FailureInfo from './FailureInfo';

export default class AnalyticBox extends React.Component {
    render() {
        const {
            metrics
        } = this.props;

        const {
            blockRange,
            txnCount,
            txnRate,
            gasConsumed,
            gasAverage,
            failCount,
            failGas
        } = metrics;

        return (
            <Row className={cn("metrics", align.topCenter, align.full, align.noMarginPad)}>
                <Col md="12" className={cn("metrics-box", align.vCenter, align.noMarginPad)}>
                    <Row className={cn(align.allCenter, align.full, align.noMarginPad)}>
                        <Col md="6" className={cn("border-right", "mt-2", "mb-2", align.vCenter)}>
                            <Section className="border-bottom">
                                <BlockInfo blockRange={blockRange} />
                            </Section>
                            <Section>
                                <TxnInfo txnCount={txnCount} txnRate={txnRate} />
                            </Section>
                        </Col>
                        <Col md="6" className={cn("border-right", align.vCenter)}>
                            <Section className="border-bottom">
                                <GasInfo gasConsumed={gasConsumed} gasAverage={gasAverage} />
                            </Section>
                            <Section>
                                <FailureInfo failCnt={failCount} failGas={failGas} />
                            </Section>
                        </Col>
                    </Row>
                </Col>
          </Row>
        )
    }
}
