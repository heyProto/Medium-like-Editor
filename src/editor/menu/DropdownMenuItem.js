import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem.js';
import './DropdownMenuItem.css';

library.add(faAngleUp, faAngleDown);

const propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  children: PropTypes.object,
  command: PropTypes.func,
  isActive: PropTypes.bool,
  isAllowed: PropTypes.bool,
  level: PropTypes.number,
};

class DropdownMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      selected: this.props.placeHolder,
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClick() {
    if (!this.state.isOpened) {
      document.addEventListener('click', this.handleClickOutside, false);
    } else {
      document.removeEventListener('click', this.handleClickOutside, false);
    }

    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  }

  handleClickOutside(e) {
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  handleSelect(name) {
    if (this.state.selected !== name) {
      this.setState({
        selected: name,
      });
      this.props.onChange(name);
    }
  }

  render() {
    const list = this.props.options;
    const { isOpened, selected } = this.state;
    let contentDisplay = isOpened ? 'inherit' : 'none';

    return (
      <div
        className="dd-menuitem-container"
        ref={node => {
          this.node = node;
        }}
      >
        <div className="proto-menuitem" disabled onClick={() => this.handleClick()}>
          <div className="dd-menuitem-header-title" active={list.some(x=> x.isActive)? 'true' : 'false'}>{selected}</div>
        </div>
        <div className="dd-menuitem-content" style={{ display: contentDisplay }}>
          {list.map(e => {
            return (
              <MenuItem key={e.title} {...e} isAllowed={true}>
                {e.title}
              </MenuItem>
            );
          })}
        </div>
      </div>
    );
  }
}

DropdownMenuItem.propTypes = propTypes;
// DropdownMenuItem.defaultProps = defaultProps;
export default DropdownMenuItem;
