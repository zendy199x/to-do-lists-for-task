import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
    render() {
        return (
        	<div className="row mt-15">
            {/*Search*/}
                <Search onSearch={ this.props.onSeach }/>
            {/*Sort*/}
                <Sort />
            </div>
        );
    }
}

export default Control;