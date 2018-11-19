import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return <div className="proto-menu" />;
  }
}

Menu.propTypes = propTypes;
// Menu.defaultProps = defaultProps;
export default Menu;
