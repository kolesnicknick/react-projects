import React, {Component} from 'react';
import PropTypes from "prop-types";

class Clear extends Component {
    static propTypes = {
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired
    };

    render() {
        return (
            <div>
                {this.props.showClear && (<button className="btn-block btn btn-black" onClick={this.props.clearUsers}>Clear</button>)}
            </div>
        );
    }
}

export default Clear;