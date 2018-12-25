import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//components
import MenuItem from "./MenuItem";
import DropDown from "../util/DropDown";
import Card from "../../components/Card/Card";
import Modal from "../util/modal/Modal";
import { ReactComponent as ProtoIcon } from "../../assets/icons/proto-icon.svg";

//styles
import styles from "./CardSelector.module.css";
import theme from '../Theme.module.css'

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
      title: this.props.title,
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
              subtitle: x.template_card_name,
              "data-card-id": x.id,
              caption: x.name,
            });
          });
        });
    } else {
      cardList = [
        {
          "data-card-id": 62499,
          "date-template-id": 0,
          url:
            "https://cdn.protograph.pykih.com/99e448b6fcb668c5a3d4/index.html?view_cast_id=7a312bd07ab133968703ec4e&base_url=https://www.responsiblebiz.org",
          caption: "Test1",
          template_card_name: "Test",
        },
        {
          "data-card-id": 62499,
          "date-template-id": 0,
          url:
            "https://cdn.protograph.pykih.com/99e448b6fcb668c5a3d4/index.html?view_cast_id=7a312bd07ab133968703ec4e&base_url=https://www.responsiblebiz.org",
          caption: "Test2",
          template_card_name: "Test",
        },
      ];

      cardList.map(e => {
        e.key = e["data-card-id"];
        e.title = e.caption;
        e.subtitle = e.template_card_name;
        return e;
      });
    }

    return (
      <div className={styles["button"]}>
        <Modal
          isOpen={this.state.isOpen}
          onClose={this.hideModal}
          title="Insert Card"
        >
          <div className={theme.label}>Select</div>
          <DropDown
            options={cardList}
            onChange={e => this.handleChange(e, cardList)}
            placeHolder="None"
            key={this.state.isOpen}
          />
          <div className={theme.label}>Preview</div>
          <div className={styles["preview"]}>
            {this.state.card && (
              <Card attrs={this.state.card} isSelected={false} />
            )}
          </div>

          <div
            className={`${theme["btn"]} ${theme["btn--primary"]} ${theme["btn--md"]}`}
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
