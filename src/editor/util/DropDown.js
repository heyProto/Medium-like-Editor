import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "../menu/MenuItem.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./DropDown.module.css";

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
      selectedTitle: null,
      selectedCard: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClick() {
    if (!this.state.isOpened) {
      document.addEventListener("click", this.handleClickOutside, false);
    } else {
      document.removeEventListener("click", this.handleClickOutside, false);
    }

    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  }

  handleClickOutside() {
    document.removeEventListener("click", this.handleClickOutside, false);
    this.setState({
      isOpened: false,
    });
  }

  handleSelect(key) {
    const list = this.props.options;
    if (this.state.selectedCard !== key) {
      this.setState(prevState => ({
        selectedCard: key,
        isOpened: !prevState.isOpened,
        selectedTitle: list.find(x => x.key === key).title,
      }));
      this.props.onChange(key);
      this.setState({ selectedCard: null });
    }
    console.log(this.state);
  }

  render() {
    const list = this.props.options;
    const type = this.props.ddtype;
    const { isOpened, selectedCard, selectedTitle } = this.state;
    let width = this.props.width ? this.props.width : "100%";
    let contentDisplay = isOpened ? "block" : "none";
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
              {this.props.faIcon ? (
                <FontAwesomeIcon icon={this.props.faIcon} size="lg" />
              ) : (
                this.props.placeHolder
              )}
            </div>
          </div>
          <div
            className="dd-menuitem-content"
            style={{ display: contentDisplay }}
          >
            {list.map(e => {
              return (
                <MenuItem key={e.title} {...e} isAllowed={true}>
                  {e.faIcon ? (
                    <FontAwesomeIcon icon={e.faIcon} size="lg" />
                  ) : (
                    e.title
                  )}
                </MenuItem>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles["editor-dropdown"]}>
          <div className={styles["content"]}>
            <div
              className={styles["header"]}
              onClick={() => this.handleClick()}
              style={{ width: width }}
            >
              <div className={styles["header__title"]}>
                {selectedTitle || this.props.placeHolder}
              </div>
              {isOpened ? (
                <FontAwesomeIcon
                  icon="angle-up"
                  style={{ padding: "0px 2px 0px 0px", float: "right" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon="angle-down"
                  style={{ padding: "0px 2px 0px 0px", float: "right" }}
                />
              )}
            </div>
            {isOpened && (
              <div className={styles["list"]} style={{ width: width }}>
                {list.map(item => {
                  return (
                    <div
                      className={styles["list__item"]}
                      style={{ width: width }}
                      key={item.key}
                      onClick={e => this.handleSelect(item.key)}
                    >
                      <div className={styles["list__title"]}>{item.title}</div>
                      {item.subtitle && (
                        <div className={styles["list__subtitle"]}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

DropDown.propTypes = propTypes;
// DropDown.defaultProps = defaultProps;
export default DropDown;
