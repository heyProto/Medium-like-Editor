import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import DropDown from "../util/DropDown";
import Card from "../../components/Card/Card";
import axios from "axios";
import "./CardSelector.css";
import { ReactComponent as ProtoIcon } from "../../assets/icons/proto-icon.svg";
// window.axios = axios

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  children: PropTypes.object,
  command: PropTypes.func,
  isActive: PropTypes.bool,
  isAllowed: PropTypes.bool,
};

class CardSelector extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleSelector = this.toggleSelector.bind(this);

    this.state = { isOpened: false };
  }

  hideModal = () => {
    this.setState({ isOpened: false });
  };

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.toggleSelector();
    if (this.state.card) {
      let card = this.state.card;
      this.props.run({
        url: card.url,
        caption: card.title,
        "data-card-id": card.key,
        "data-template-id": card["data-template-id"],
      });
    }
  }

  handleChange(e, cardList) {
    let card = cardList.find(x => x.key === e);

    this.setState({
      card: card,
    });
  }

  toggleSelector(e) {
    let isOpened = this.state.isOpened;
    this.setState({ isOpened: !isOpened, card: null });
  }

  render() {
    let buttonProps = {
      faIcon: this.props.faIcon,
      selection: this.props.selection,
      run: this.toggleSelector,
      isActive: this.props.isActive,
      isAllowed: this.props.isAllowed,
    };

    let cards_request = this.props.cards_request;
    let cardList = [];
    if (cards_request) {
      axios
        .get(cards_request.url, {
          headers: { "Access-Token": cards_request.token },
        })
        .then(function(response) {
          response.data.forEach(x => {
            cardList.push({
              url: x.iframe_url,
              title: x.name,
              key: x.id,
              "data-template-id": x.template_card_id,
            });
          });
        });
    }

    return (
      <div className="card-selector-button">
        <Modal isOpened={this.state.isOpened} handleClose={this.hideModal}>
          <h3 className="modal-heading">Insert Card</h3>
          <DropDown
            options={cardList}
            onChange={e => this.handleChange(e, cardList)}
            placeHolder="Select Card"
            width="100px"
          />
          <div className="card-preview">
            {this.state.card && (
              <Card attrs={this.state.card} isSelected={false} />
            )}
          </div>

          <div
            className="proto-button"
            disabled={!this.state.card}
            onClick={this.handleSubmit}
          >
            Submit
          </div>
        </Modal>
        <MenuItem {...buttonProps}>
          <ProtoIcon style={{ height: "20px", width: "20px" }} />
        </MenuItem>
      </div>
    );
  }
}

const Modal = ({ handleClose, isOpened, children }) => {
  const showHideClassName = isOpened
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="proto-button-close" onClick={handleClose}>
          Close
        </div>
      </section>
    </div>
  );
};

CardSelector.propTypes = propTypes;
// CardSelector.defaultProps = defaultProps;
export default CardSelector;

// {this.state && this.state.isOpened && (
//           <div
//             className="card-selector-content"
//             style={{ display: contentDisplay }}
//           >
//
//           </div>
//         )}
