import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames';
import {
    Row,
    Col
} from 'reactstrap';
import BlockRow from './BlockRow';

export default class BlockList extends React.Component {
    render() {
        const {
            blocks
        } = this.props;

        return (
            <Row className={cn("block-list-container", align.topCenter, align.full, align.noMarginPad)}>
                <Col md="11" className={cn(align.leftCenter, align.noMarginPad)}>
                    <h2 className={cn("text-dark", "font-weight-light")}>Latest Blocks</h2>
                </Col>
                <Col md="11" className={cn(align.topCenter, align.noMarginPad)}>
                    {
                        blocks.map((b,i)=>{
                            return (
                                <BlockRow block={b} key={i} />
                            )
                        })
                    }
                </Col>
            </Row>
        )
    }
}