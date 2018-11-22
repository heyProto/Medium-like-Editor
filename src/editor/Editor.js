import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './View';
import Menu from './menu/Menu';
import { EditorState } from 'prosemirror-state';
import { buildSchema } from '../util/utilities';
import styles from './Editor.css';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.createEditor = this.createEditor.bind(this);
    this.prepareCards = this.prepareCards.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.viewRef = React.createRef();
    this.schema = buildSchema(this.props.customNodes, this.props.customMarks);
    this.initialContent = {
      type: 'doc',
      attrs: { meta: {} },
      content: [{ type: 'paragraph' }],
    };
    this.state = {
      lastChange: Date.now(),
      lastSubmit: Date.now(),
      cards: [],
    };
  }

  componentDidMount() {
    this.createEditor();
  }

  createEditor() {
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
          element.type === 'card' ||
          (element.type === 'heading' && element.attrs.level === 2)
        ) {
          cards.push([element]);
        } else {
          cards[cards.length - 1].push(element);
        }
      });
      return cards;
    }
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
    cards &&
      this.setState(
        { cards: cards, lastSubmit: Date.now() },
        this.props.onSubmit && this.props.onSubmit(cards)
      );
  }

  render() {
    console.log(this.state);
    if (this.state.editorState) {
      return (
        <div className="proto-editor">
          <Menu editorChange={this.state.editorChange} schema={this.schema} />
          <View
            editorState={this.state.editorState}
            onChange={this.handleViewChange}
            schema={this.schema}
          />
          <button
            className="proto-button"
            // disabled={!this.props.isAllowed}
            onMouseDown={this.handleSubmit}
          >
            Submit
          </button>
          <pre>
            {this.state.editorState && (
              <code>{JSON.stringify(this.state.editorState.doc, null, 2)}</code>
              // <code>{this.state.editorState.toJSON()}</code>
            )}
          </pre>
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
