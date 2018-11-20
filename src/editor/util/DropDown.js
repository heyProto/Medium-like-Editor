import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      selected: this.props.placeHolder,
    };
  }

  handleClickOutside() {
    this.setState({
      isOpened: false,
    });
  }

  handleSelect(name) {
    if (this.state.selected !== name) {
      this.setState(
        {
          selected: name,
        },
        this.props.onChange(name)
      );
    }
  }

  toggleList() {
    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  }

  render() {
    const list = this.props.options;
    const { isOpened, selected, title } = this.state;
    return (
      <div className="editor-dropdown">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{title}</div>
          {isOpened ? (
            <FontAwesome name="angle-up" size="2x" />
          ) : (
            <FontAwesome name="angle-down" size="2x" />
          )}
        </div>
        {isOpened && (
          <ul className="dd-list">
            {list.map(item => (
              <li className="dd-list-item" key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

DropDown.propTypes = propTypes;
// DropDown.defaultProps = defaultProps;
export default DropDown;
