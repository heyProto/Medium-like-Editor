import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.js'
import CardSelector from './CardSelector.js'
import DropdownMenuItem from './DropdownMenuItem.js'

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
    	{this.props.editorChange && this.props.editorChange.menuItems.map(e => 
        {
          if (e.type === 'button') {
            return (<MenuItem {...e} selection={this.props.editorChange.selection} />)
          }
          else if (e.type === 'dropdown') {
            return (<DropdownMenuItem {...e} />)
          }
          else {
            return (<CardSelector {...e} />)
          }
        })}
    	</div>);
  }
}


Menu.propTypes = propTypes;
// Menu.defaultProps = defaultProps;
export default Menu;
