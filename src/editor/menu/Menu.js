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

  render() {
    return (
      <div className="proto-menu">
        {this.props.editorChange &&
          this.props.editorChange.menuItems.map(e => {
            if (e.type === 'button') {
              return (
                <MenuItem
                  {...e}
                  selection={this.props.editorChange.selection}
                />
              );
            } else if (e.type === 'dropdown') {
              return <DropdownMenuItem {...e} />;
            } else if (e.type === 'prompt') {
              return <UrlSelector {...e} />;
            } else {
              return <CardSelector {...e} />;
            }
          })}
      </div>
    );
  }
}

Menu.propTypes = propTypes;
// Menu.defaultProps = defaultProps;
export default Menu;
