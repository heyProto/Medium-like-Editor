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
    this.handleViewChange = this.handleViewChange.bind(this);

    this.viewRef = React.createRef();
    this.schema = buildSchema(this.props.customNodes, this.props.customMarks);
    this.initialContent = {
      type: 'doc',
      attrs: { meta: {} },
      content: [{ type: 'paragraph' }],
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

  dispatchTransaction(tx) {
    const editorState = this.state.editorState.apply(tx);
    this.setState({ editorState: editorState });
    this.props.onChange && this.props.onChange(editorState);
  }

  handleViewChange(e) {
    const editorState = e.view.state;
    this.setState({
      editorChange: e,
      editorState: editorState,
    });
    this.props.onChange && this.props.onChange(editorState);
  }

  render() {
    if (this.state) {
      console.log(this.state);
      return (
        <div className="proto-editor">
          <Menu
            editorChange={this.state.editorChange}
            dispatchTransaction={this.dispatchTransaction}
            schema={this.schema}
          />
          <View
            editorState={this.state.editorState}
            onChange={this.handleViewChange}
            schema={this.schema}
          />
          <pre>
            {this.state.editorState.doc && (
              <code>{JSON.stringify(this.state.editorState.doc, null, 2)}</code>
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
