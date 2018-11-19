import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  children: PropTypes.object,
  command: PropTypes.func,
  isActive: PropTypes.func,
  isAllowed: PropTypes.func,
};

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);

    this.setState({
      disabled:
        this.props.isAllowed && !this.props.isAllowed(this.props.editorState),
      active:
        this.props.isActive && this.props.isActive(this.props.editorState),
    });
  }

  handleMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.command(this.props.editorState, this.props.dispatchTransaction);
  }

  render() {
    return (
      <button
        className="proto-menuitem"
        disabled={this.state.disabled}
        active={this.state.active}
        onMouseDown={this.handleMouseDown}
      >
        {this.props.children}
      </button>
    );
  }
}

MenuItem.propTypes = propTypes;
// MenuItem.defaultProps = defaultProps;
export default MenuItem;
