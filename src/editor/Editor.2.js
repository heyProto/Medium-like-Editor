import React, { Component } from 'react';
import { render } from 'react-dom';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from '../util/schema.js';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { menuBar } from 'prosemirror-menu';
import { buildMenuItems } from '../util/menu.js';
import './Editor.css';

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
});

const myPlugins = exampleSetup({ schema: mySchema, menuBar: false });

myPlugins.push(
  menuBar({
    content: buildMenuItems(mySchema).fullMenu,
    floating: true,
  })
);

export default class Editor extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
    };
  }
  componentDidMount() {
    this.view = new EditorView(this.editor, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(this.content),
        plugins: myPlugins,
      }),
      dispatchTransaction: transaction => {
        const { state, transactions } = this.view.state.applyTransaction(
          transaction
        );

        this.view.updateState(state);

        if (transactions.some(tr => tr.docChanged)) {
          this.props.onChange(state.doc);
        }

        this.forceUpdate();
      },
      handlePaste: (view, event, slice) => {
        console.log(event);
      },
    });
  }

  render() {
    return (
      <div ref={r => (this.editor = r)}>
        <div ref={r => (this.content = r)} />
      </div>
    );
  }
}
