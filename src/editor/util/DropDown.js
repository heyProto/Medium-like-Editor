import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleUp, faAngleDown);

const propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
};

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      selected: null,
    };
  }

  handleClickOutside() {
    this.setState({
      isOpened: false,
    });
  }

  handleSelect(key) {
    if (this.state.selected !== key) {
      this.setState(prevState => ({
        selected: key,
      isOpened: !prevState.isOpened,
      }));
      this.props.onChange(key);
      this.setState({ selected: null })
    }
  }

  toggleList() {
    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  }

  render() {
    const list = this.props.options;
    const { isOpened, selected } = this.state;
    const selectedTitle = selected && list.find(x => x.key === selected).title;
    return (
      <div className="editor-dropdown">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">
            {selectedTitle || this.props.placeHolder}
          </div>
          {isOpened ? (
            <FontAwesomeIcon icon="angle-up" size="2x" />
          ) : (
            <FontAwesomeIcon icon="angle-down" size="2x" />
          )}
        </div>
        {isOpened && (
          <div className="dd-list">
            {list.map(item => (
              <div
                className="dd-list-item"
                key={item.key}
                onClick={e => this.handleSelect(item.key)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

DropDown.propTypes = propTypes;
// DropDown.defaultProps = defaultProps;
export default DropDown;
