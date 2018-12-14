import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "../menu/MenuItem.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./DropDown.css";

library.add(faAngleUp, faAngleDown);

const propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string
};

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      selected: null
    };

    this.handleClick = this.handleClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
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

  handleClickOutside() {
    document.removeEventListener('click', this.handleClickOutside, false);
    this.setState({
      isOpened: false
    });
  }

  handleSelect(key) {
    if (this.state.selected !== key) {
      this.setState(prevState => ({
        selected: key,
        isOpened: !prevState.isOpened
      }));
      this.props.onChange(key);
      this.setState({ selected: null });
    }
  }

  toggleList() {
    this.setState(prevState => ({
      isOpened: !prevState.isOpened
    }));
  }

  render() {
    const list = this.props.options;
    const type = this.props.ddtype;
    const { isOpened, selected } = this.state;
    const selectedTitle = selected && list.find(x => x.key === selected).title;
    let width = this.props.width ? this.props.width : "100%";
    let contentDisplay = isOpened ? 'block' : 'none'
    if (type === "menu") {
      return (
        <div
          className="dd-menuitem-container"
          ref={node => {
            this.node = node;
          }}
        >
          <div className="proto-menuitem" onClick={() => this.handleClick()}>
            <div
              className="dd-menuitem-header-title"
              active={list.some(x => x.isActive) ? "true" : "false"}
            >
              {this.props.faIcon ? <FontAwesomeIcon icon={this.props.faIcon} size="lg" /> : this.props.placeHolder}
            </div>
          </div>
          <div className="dd-menuitem-content" style={{display: contentDisplay}}>
            {list.map(e => {
              return (
                <MenuItem key={e.title} {...e} isAllowed={true}>
                  {e.faIcon ? <FontAwesomeIcon icon={e.faIcon} size="lg" /> : e.title}
                </MenuItem>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor-dropdown">
          <div
            className="dd-header"
            onClick={() => this.toggleList()}
            style={{ width: width }}
          >
            <div className="dd-header-title">
              {selectedTitle || this.props.placeHolder}
            </div>
            {isOpened ? (
              <FontAwesomeIcon icon="angle-up" style={{ paddingLeft: "5px" }} />
            ) : (
              <FontAwesomeIcon
                icon="angle-down"
                style={{ paddingLeft: "5px" }}
              />
            )}
          </div>
          {isOpened && (
            <div className="dd-list" style={{ width: width }}>
              {list.map(item => (
                <div
                  className="dd-list-item"
                  style={{ width: width }}
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
}

DropDown.propTypes = propTypes;
// DropDown.defaultProps = defaultProps;
export default DropDown;
