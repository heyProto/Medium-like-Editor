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
    console.log("SCHEMA", this.props.schema, "STATE", this.props.editorState);
    return <div className="proto-menu" />;
  }
}

Menu.propTypes = propTypes;
// Menu.defaultProps = defaultProps;
export default Menu;
