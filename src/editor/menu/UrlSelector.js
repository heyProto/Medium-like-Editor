import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import DropDown from "../util/DropDown";
import Modal from "../util/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./UrlSelector.css";
import { faLink } from "@fortawesome/free-solid-svg-icons";

library.add(faLink);

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  children: PropTypes.object,
  command: PropTypes.func,
  isActive: PropTypes.bool,
  isAllowed: PropTypes.bool,
};

class UrlSelector extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);

    this.targets = [
      { key: "top", title: "Same Page", value: "_top" },
      { key: "blank", title: "New Page", value: "_blank" },
    ];

    this.state = { isOpened: false, targetValue: "_blank", isOpen: false };
    this.toggleSelector = this.toggleSelector.bind(this);
  }

  hideModal = () => {
    this.setState({ isOpen: false });
  };

  toggleSelector(e) {
    let isOpen = this.state.isOpen;
    this.setState({ isOpen: !isOpen, card: null });
  }

  handleClick() {
    // attach/remove event handler
    if (!this.state.isOpened) {
      document.addEventListener("click", this.handleClickOutside, false);
    } else {
      document.removeEventListener("click", this.handleClickOutside, false);
    }

    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  }

  handleTargetChange(e) {
    let target = this.targets.find(x => x.key === e);

    this.setState({
      targetValue: target.value,
    });
  }

  handleClickOutside(e) {
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.validateUrl();
    this.toggleSelector();
    this.props.run({
      href: this.state.urlValue,
      title: this.state.titleValue,
      target: this.state.targetValue,
    });
  }

  validateUrl() {}

  render() {
    let buttonProps = {
      selection: this.props.selection,
      run: this.props.isActive ? this.props.run : this.toggleSelector,
      isActive: this.props.isActive,
      isAllowed: this.props.isAllowed,
      faIcon: this.props.faIcon,
    };
    let contentDisplay = this.state.isOpened ? "inherit" : "none";

    return (
      <div className="url-selector-button">
        <Modal
          isOpen={this.state.isOpen}
          onClose={this.hideModal}
          title="Insert Link"
        >
          <div className="input">
            <div className="label">Url</div>
            <input
              type="text"
              value={this.state.urlValue}
              onChange={e => {
                this.setState({ urlValue: e.target.value });
              }}
              style={{ width: "100%" }}
            />
          </div>
          <div className="input">
            <div className="label">Title</div>
            <input
              type="text"
              value={this.state.titleValue}
              onChange={e => {
                this.setState({ titleValue: e.target.value });
              }}
              style={{ width: "100%" }}
            />
          </div>
          <div className="input">
            <div className="label">Open in</div>
            <DropDown
              options={this.targets}
              onChange={e => this.handleTargetChange(e)}
              placeHolder="None"
              key={this.state.isOpen}
            />
          </div>

          <div
            className="btn btn--primary btn--md"
            onMouseDown={this.handleSubmit}
          >
            Submit
          </div>
        </Modal>
        <MenuItem {...buttonProps}>
          <FontAwesomeIcon icon={buttonProps.faIcon} size="lg" />
        </MenuItem>
      </div>
    );
  }
}

// Target code
//              <label>
//                 Target:
//                 <DropDown
//                   options={this.targets}
//                   onChange={e => {
//                     let target = this.targets.find(x => x.name === e);
//                     this.setState({ targetValue: target.value });
//                   }}
//                   placeHolder=""
//                 />
//               </label>

UrlSelector.propTypes = propTypes;
// UrlSelector.defaultProps = defaultProps;
export default UrlSelector;
