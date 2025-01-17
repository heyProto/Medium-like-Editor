import React, { Component } from "react";
import PropTypes from "prop-types";
import View from "./View";
import Menu from "./menu/Menu";
import { EditorState } from "prosemirror-state";
import { buildSchema, parseHtml } from "../util/utilities";
import { Schema, DOMParser, DOMSerializer } from "prosemirror-model";
import styles from "./Editor.module.css";
import theme from './Theme.module.css'

class Editor extends Component {
  constructor(props) {
    super(props);

    this.createEditor = this.createEditor.bind(this);
    this.prepareCards = this.prepareCards.bind(this);
    this.escapeHTML = this.escapeHTML.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.viewRef = React.createRef();
    this.schema = buildSchema(this.props.customNodes, this.props.customMarks);
    this.initialContent = {
      type: "doc",
      attrs: { meta: {} },
      content: [{ type: "paragraph" }],
    };

    let initDate = Date.now();
    this.state = {
      lastChange: initDate,
      lastSubmit: initDate,
      cards: [],
    };
  }

  componentDidMount() {
    this.createEditor();
  }

  createEditor() {
    if (this.props.cards) {
      this.initialContent.content = this.props.cards;
    }
    /* Create the Editor State */
    const state = EditorState.create({
      doc: this.schema.nodeFromJSON(this.initialContent),
      schema: this.schema,
    });
    this.setState({ editorState: state });
  }

  prepareCards() {
    if (this.state.lastChange > this.state.lastSubmit) {
      let cards = [];

      this.state.editorState.doc.content.forEach(element => {
        if (
          cards.length === 0 ||
          (cards[cards.length - 1].data.length === 1 &&
            cards[cards.length - 1].data[0].type.name === "card") ||
          element.type.name === "card" ||
          (element.type.name === "heading" && element.attrs.level === 2)
        ) {
          cards.push({
            "data-card-id": element.attrs["data-card-id"],
            "data-template-id": element.attrs["data-template-id"],
            data: [element],
          });
        } else {
          cards[cards.length - 1].data.push(element);
        }
      });
      return cards;
    }
  }

  escapeHTML(htmlString) {
    let div = document.createElement("div");
    div.innerText = htmlString;
    return div.innerHTML;
  }

  handleViewChange(e) {
    const editorState = e.view.state;
    this.setState({
      editorChange: e,
      editorState: editorState,
      lastChange: Date.now(),
    });
    this.props.onChange && this.props.onChange(editorState);
  }

  handleSubmit(e) {
    let cards = this.prepareCards();
    if (cards) {
      cards.forEach(card => {
        let fragment = DOMSerializer.fromSchema(this.schema).serializeFragment(
          card.data
        );
        let tmp = document.createElement("div");
        tmp.appendChild(fragment);
        card.htmlString = tmp.innerHTML;
      });
      this.setState(
        { cards: cards, lastSubmit: Date.now() },
        this.props.onSubmit && this.props.onSubmit(cards)
      );
    }
  }

  render() {
    if (this.state.editorState) {
      return (
        <div className={styles["proto-editor"]}>
          <Menu
            editorChange={this.state.editorChange}
            schema={this.schema}
            cards_request={this.props.cards_request}
          />
          <View
            editorState={this.state.editorState}
            onChange={this.handleViewChange}
            schema={this.schema}
          />
          <div
            className={`${theme["btn"]} ${theme["btn--primary"]} ${theme["btn--lg"]}`}
            // disabled={!this.props.isAllowed}
            onMouseDown={this.handleSubmit}
          >
            Submit
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

// Editor.propTypes = propTypes;
// Editor.defaultProps = defaultProps;

export default Editor;
