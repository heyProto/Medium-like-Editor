import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
};

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	this.props.editorChange && console.log('Editor change at menu:', this.props.editorChange);
    return (
    	<div className="proto-menu">
    	{this.props.editorChange && this.props.editorChange.menuItems.map(e => <MenuItem {...e} selection={this.props.editorChange.selection} />)}
    	</div>);
  }
}


Menu.propTypes = propTypes;
// Menu.defaultProps = defaultProps;
export default Menu;
