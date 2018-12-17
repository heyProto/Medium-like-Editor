import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import DropDown from "../util/DropDown";
import Card from "../../components/Card/Card";
import axios from "axios";
import "./CardSelector.css";
import Modal from "../util/modal/Modal";
import { ReactComponent as ProtoIcon } from "../../assets/icons/proto-icon.svg";

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

    this.state = { isOpen: false };
  }

  hideModal = () => {
    this.setState({ isOpen: false });
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
    let isOpen = this.state.isOpen;
    this.setState({ isOpen: !isOpen, card: null });
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
              "data-card-id": x.id,
              caption: x.name,
            });
          });
        });
    }
    else {
      cardList = []

      cardList.map(e => {
        e.key = e['data-card-id']
        e.title = e.caption
        return e
      })
    }


    return (
      <div className="card-selector-button">
        <Modal isOpen={this.state.isOpen} onClose={this.hideModal} title="Insert Card">
          <DropDown
            options={cardList}
            onChange={e => this.handleChange(e, cardList)}
            label="Select"
            placeHolder="None"
            key={this.state.isOpen}
          />
          <div className="div-label">Preview</div>
          <div className="card-preview">
            {this.state.card && (
              <Card attrs={this.state.card} isSelected={false} />
            )}
          </div>

          <div
            className="btn btn--md btn--primary"
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

CardSelector.propTypes = propTypes;
// CardSelector.defaultProps = defaultProps;

export default CardSelector;
