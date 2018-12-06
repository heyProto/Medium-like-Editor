import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.js';
import DropdownMenuItem from './DropdownMenuItem';
import CardSelector from './CardSelector.js';
import UrlSelector from './UrlSelector.js';
import './Menu.css'

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
};

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  isAllowed = (e) => {
    if (e.section === 'transform') {
      if (this.props.editorChange.menuItems.find(x => x.title === 'Superscript').isActive === true && e.title === 'Subscript') {
        return false
      }
      else if (this.props.editorChange.menuItems.find(x => x.title === 'Subscript').isActive === true && e.title === 'Superscript') {
        return false
      }
      if (e.title === 'Link' && !this.props.editorChange.selectedText) { //link disabled when nothing selected
        return false
      }
      else if (this.props.editorChange.selectedNode) { //marks disabled when card selected
        return false
      }
      else {
        return true
      }
    }
    if (e.title === 'Horizontal Rule' && this.props.editorChange.selectedText) {
      return false
    }
    else {
      return true
    }
  }

  render() {
    console.log(this.props.editorChange)
    return (
      <div className="proto-menu">
        {this.props.editorChange &&
          this.props.editorChange.menuItems.map(e => {
            if (e.type === 'button') {
              return (
                <MenuItem key={e.title}
                  {...e}
                  isAllowed={this.isAllowed(e)}
                  selection={this.props.editorChange.selection}
                />
              );
            } else if (e.type === 'dropdown') {
              return <DropdownMenuItem key={e.title} {...e} isAllowed={this.isAllowed(e)} />;
            } else if (e.type === 'url') {
              return <UrlSelector key={e.title} {...e} isAllowed={this.isAllowed(e)} />;
            } else if (e.type === 'card') {
              return <CardSelector key={e.title} {...e} isAllowed={this.isAllowed(e)} />;
            }
          })}
      </div>
    );
  }
}

Menu.propTypes = propTypes;
// Menu.defaultProps = defaultProps;
export default Menu;
