import React, { Component } from 'react'
import PropTypes from 'prop-types'
import View from './View'
import Menu from './menu/Menu'
import { EditorState } from 'prosemirror-state'
import { buildSchema, parseHtml } from '../util/utilities'
import styles from './Editor.css'

class Editor extends Component {
  constructor (props) {
    super(props)

    this.createEditor = this.createEditor.bind(this)
    this.prepareCards = this.prepareCards.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.viewRef = React.createRef()
    this.schema = buildSchema(this.props.customNodes, this.props.customMarks)
    this.initialContent = {
      type: 'doc',
      attrs: { meta: {} },
      content: [{ type: 'paragraph' }]
    }
    this.htmlString =
      '<h2>December 2017 Announcement</h2>\n<p>It is still the case that when we think or read about gender, we think about women. And violence. In part, this is as it should be. It was women who made gender visible. Violence against them has been stark, discrimination universal. It continues to live on, even as it is denied.</p>\n<p>The challenge is not just that, women and gender minorities across the world bear brutal violence. It is that they have a vision, voice, and an agency to comment, reflect on some of the greatest crisis of our times: be it food security, national security, environmental justice, diplomatic relations.</p>\n<p>Women have been at the forefront in movements for Dalit rights, minority rights, protection of forests, the right to food. Theirs is a unique, diverse struggle against inequality.</p>\n<p>The reality of the urban working-class woman who is also a domestic, casual contract labourer battling multiple struggles: security of employment, space to live in a slum, sexual violence, wages, aspirations. She is often a rural woman, who has come to the city searching for work, to feed her family. In the village she worked outside her home. It was natural and necessary. The work was never recognised. The land she tilled tirelessly was never hers. The urban based woman goes through her own formidable challenges of negotiating hostile spaces. -</p>\n<p>Gender is the new conversation in these times. There is recognition, slow and grudging as it maybe, that gender must inform policy and planning.</p>\n<p>Women now occupy almost every conceivable role in public life. They run businesses, lead countries, build roads, participate in movements, create art and climb trees. And, they are no monolith. They can, and do assimilate patriarchal values.</p>\n<p>Any commentary on gender is incomplete without the full arc.</p>\n<p>At #GenderAnd we want to mainstream gender. This isn’t about adding a “customary woman” to the reportage, thereby balancing some notional equation. Or the belief that this is typically, “about women”. Another pitfall, we will guard against, that this is an additional “angle”, bestowed on a woman, in this case a woman journalist who has an interest in “gender”.</p>\n<p>Over the next four weeks, and in 2018 indianexpress.com will explore gender and the many axes on which it intersects. We will examine the invisibility of women’s work across sectors. We’ll explore the multitude of ongoing struggles against caste, class, religion, even as when focus on gender inequalities. Whether the goal is to “break glass ceilings” or smash records or access to power and justice, we are interested in how women and gender minorities are achieving it. There will be reportage, commentary, multimedia reports, data projects, reflecting on stories from history and reporting on lives of women and gender minorities today. Our reporters, writers and photographers will critically and holistically report on Gender.</p>\n'

    let initDate = Date.now()
    this.state = {
      lastChange: initDate,
      lastSubmit: initDate,
      cards: []
    }
  }

  componentDidMount () {
    this.createEditor()
  }

  createEditor () {
    /* Create the Editor State */
    const state = EditorState.create({
      doc: this.schema.nodeFromJSON(this.initialContent),
      schema: this.schema
    })
    this.setState({ editorState: state })
  }

  prepareCards () {
    if (this.state.lastChange > this.state.lastSubmit) {
      let cards = []
      this.state.editorState.doc.content.forEach(element => {
        if (
          cards.length === 0 ||
          (cards[cards.length - 1].data.length === 1 &&
            cards[cards.length - 1].data[0].type.name === 'card') ||
          element.type.name === 'card' ||
          (element.type.name === 'heading' && element.attrs.level === 2)
        ) {
          cards.push({
            'data-card-id': element.attrs['data-card-id'],
            'data-template-id': element.attrs['data-template-id'],
            data: [element]
          })
        } else {
          cards[cards.length - 1].data.push(element)
        }
      })
      return cards
    }
  }

  handleViewChange (e) {
    const editorState = e.view.state
    this.setState({
      editorChange: e,
      editorState: editorState,
      lastChange: Date.now()
    })
    this.props.onChange && this.props.onChange(editorState)
  }

  handleSubmit (e) {
    let cards = this.prepareCards()
    cards &&
      this.setState(
        { cards: cards, lastSubmit: Date.now() },
        this.props.onSubmit && this.props.onSubmit(cards)
      )
  }

  render () {
    console.log(this.state)

    if (this.state.editorState) {
      return (
        <div className='proto-editor'>
          <Menu editorChange={this.state.editorChange} schema={this.schema} />
          <View
            editorState={this.state.editorState}
            onChange={this.handleViewChange}
            schema={this.schema}
          />
          <button
            className='proto-button'
            // disabled={!this.props.isAllowed}
            onMouseDown={this.handleSubmit}
          >
            Submit
          </button>
          <pre>
            {this.state.editorState &&
              <code>
                {JSON.stringify(this.state.editorState.doc, null, 2)}
              </code>
            // <code>{this.state.editorState.toJSON()}</code>
            }
          </pre>
          <pre>{JSON.stringify(parseHtml(this.htmlString), null, 2)}</pre>
        </div>
      )
    } else {
      return <div />
    }
  }
}

// Editor.propTypes = propTypes;
// Editor.defaultProps = defaultProps;
export default Editor
