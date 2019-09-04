import React from 'react';
import * as align from 'Constants/alignments';
import cn from 'classnames';
import {
    Row,
    Col 
} from 'reactstrap';
import {toastr} from 'react-redux-toastr';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text: ''
        };
        [
          'keyDown',
          'updateText',
          'doSearch'
        ].forEach(fn=>this[fn] = this[fn].bind(this));
      }
    
      keyDown(e) {
        if(e.key === 'Enter') {
          let id = this.state.text;
          this.setState({
            text: ''
          }, ()=>this.props.runSearch(id))
        }
      }
    
      doSearch() {
        let id = this.state.text;
        if(!id) {
          toastr.error("Error", "Invalid api request ID");
        } else {
          this.setState({
            text: ''
          }, ()=>this.props.runSearch(id));
        }
      }
    
      updateText(e) {
        this.setState({
          text: e.target.value
        })
      }

    render() {
        const {
            className
        } = this.props;

        return (

            <Row className={cn("search-main", align.allCenter, align.full, "m-5", "pt-3", "pb-3")}>
                <Col md="12" className={cn(align.allCenter, "search-wrapper")}>
                    <Row className={cn(align.topCenter, align.full, "text-and-search")}>
                        <div className={cn(align.noMarginPad, align.full, "container")}>
                            <Row className={cn( "search-box","bg-light", "rounded", align.allCenter, align.full, )}>
                                <Col md="12" className={cn(align.leftCenter, "p-0", "m-0", "font-weight-light", "text-muted", "text-sz-md")}>
                                    <div className={cn("rounded",align.full, align.leftCenter)}>
                                        <i className={cn(align.allCenter, "search-icon fa fa-search", "p-3", "m-0", "bg-dark", "text-light")} onClick={this.doSearch} />
                                        <div className={cn("input-wrapper", align.full, align.leftCenter, align.noMarginPad)}>
                                            <input placeholder="hash, block, or address" className={cn(align.full, "ml-1", "m-0")}
                                                onChange={this.updateText}
                                                onKeyPress={this.keyDown}
                                            />
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                        
                    </Row>
                </Col>
            </Row>
            
        )
    }
}