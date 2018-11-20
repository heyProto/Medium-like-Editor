import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faQuoteLeft, faMinus, faCode, faSubscript, faSuperscript, faStrikethrough, faLink, faListOl, faListUl } from '@fortawesome/free-solid-svg-icons';
import './MenuItem.css'

library.add(faBold, faItalic, faQuoteLeft, faMinus, faCode, faSubscript, faSuperscript, faStrikethrough, faLink, faListOl, faListUl);

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  children: PropTypes.object,
  command: PropTypes.func,
  isActive: PropTypes.bool,
  isAllowed: PropTypes.bool,
};

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     disabled:
  //       this.props.isAllowed && !this.props.isAllowed(this.props.editorState),
  //     active:
  //       this.props.isActive && this.props.isActive(this.props.editorState),
  //   });
  // }

  handleMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.run();
  }

  render() {
    console.log(this.props)
    return (
      <button
        className="proto-menuitem"
        disabled={!this.props.isAllowed}
        active={this.props.isActive ? 'true' : 'false'}
        onMouseDown={this.handleMouseDown}
      >
        <FontAwesomeIcon icon={this.props.icon} />
      </button>
    );
  }
}

MenuItem.propTypes = propTypes;
// MenuItem.defaultProps = defaultProps;
export default MenuItem;
