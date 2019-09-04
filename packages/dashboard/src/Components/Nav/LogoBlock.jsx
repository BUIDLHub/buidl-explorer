import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames';
import {
    NavbarBrand
} from 'reactstrap';

export default class LogoBlock extends React.Component {
    render() {
        let brand = (
            <div className={cn( align.justLeft, align.alignCenter, "flex-column", align.noMarginPad)}>
              <div className={cn( align.leftLeft, align.full, align.noMarginPad)}>
                <span className={cn(align.rightCenter, align.noMarginPad, "font-weight-bold", "text-black")} style={{fontSize: "48px"}}>My Block-</span>
                <span className={cn("font-weight-bold", "text-warning", align.noMarginPad)} style={{fontSize: "48px"}}>INSPECTOR</span>
              </div>
            </div>
          )
        return (
            <NavbarBrand href="#" onClick={this.props.goHome} className={cn(align.leftCenter, align.full, align.noMarginPad)}>
                {brand}
            </NavbarBrand>
        )
    }
}