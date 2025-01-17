import { Selection } from 'prosemirror-state'
import { DOMParser, Schema, Slice } from 'prosemirror-model'
import { defaultNodes, defaultMarks } from '../schemas'

export function docIsEmpty(doc) {
  return (
    doc.childCount === 0 ||
    (doc.childCount === 1 &&
      doc.firstChild.isTextblock &&
      doc.firstChild.content.size === 0)
  )
}

export function dispatchEmptyTransaction(editorView) {
  const emptyInitTransaction = editorView.state.tr
  editorView.dispatch(emptyInitTransaction)
}

export function buildSchema(customNodes = {}, customMarks = {}) {
  const schemaNodes = {
    ...defaultNodes,
    ...customNodes
  }
  const schemaMarks = {
    ...defaultMarks,
    ...customMarks
  }

  /* Filter out undefined (e.g. overwritten) nodes and marks */
  Object.keys(schemaNodes).forEach(nodeKey => {
    if (!schemaNodes[nodeKey]) {
      delete schemaNodes[nodeKey]
    }
  })
  Object.keys(schemaMarks).forEach(markKey => {
    if (!schemaMarks[markKey]) {
      delete schemaMarks[markKey]
    }
  })

  return new Schema({
    nodes: schemaNodes,
    marks: schemaMarks,
    topNode: 'doc'
  })
}

export const renderStatic = (
  schema = buildSchema(),
  nodeArray,
  editorProps
) => {
  return nodeArray.map((node, index) => {
    let children
    if (node.content) {
      children = renderStatic(schema, node.content, editorProps)
    }
    if (node.type === 'text') {
      const marks = node.marks || []
      children = marks.reduce((prev, curr) => {
        const MarkComponent = schema.marks[curr.type].spec.toStatic(curr, prev)
        return MarkComponent
      }, node.text)
    }

    const nodeWithIndex = node
    nodeWithIndex.currIndex = index
    const nodeOptions = editorProps.nodeOptions || {}
    const customOptions = nodeOptions[node.type] || {}
    const mergedOptions = {
      ...schema.nodes[node.type].defaultOptions,
      ...customOptions
    }
    const NodeComponent = schema.nodes[node.type].spec.toStatic(
      nodeWithIndex,
      mergedOptions,
      false,
      false,
      { ...editorProps, renderStaticMarkup: true },
      children
    )
    return NodeComponent
  })
}

export function getJSON(editorView) {
  return editorView.state.doc.toJSON()
}

export function getText(editorView, separator = '\n') {
  return editorView.state.doc.textBetween(
    0,
    editorView.state.doc.nodeSize - 2,
    separator
  )
}

export function getCollabJSONs(editorView, collabIds) {
  const collabPlugin = editorView.state.plugins.reduce((prev, curr) => {
    if (curr.key === 'collaborative$') {
      return curr
    }
    return prev
  }, undefined)

  return collabPlugin ? collabPlugin.getJSONs(collabIds) : null
}

export function importHtml(editorView, htmlString) {
  /* Create wrapper DOM node */
  const wrapperElem = document.createElement('div')

  /* Insert htmlString into wrapperElem to generate full DOM tree */
  wrapperElem.innerHTML = htmlString

  /* Generate new ProseMirror doc from DOM node */
  const newDoc = DOMParser.fromSchema(editorView.state.schema).parse(
    wrapperElem
  )

  /* Create transaction and set selection to the beginning of the doc */
  const tr = editorView.state.tr
  tr.setSelection(Selection.atStart(editorView.state.doc))
  tr.replaceSelection(new Slice(newDoc.content, 0, 0))

  /* Dispatch transaction to setSelection and insert content */
  editorView.dispatch(tr)
}

export function parseHtml(htmlString, doc) {
  const wrapperElem = (doc || document).createElement('div')

  wrapperElem.innerHTML = htmlString

  const newDoc = DOMParser.fromSchema(buildSchema()).parse(wrapperElem)

  return newDoc
}

export function focus(editorView) {
  editorView.focus()
}
