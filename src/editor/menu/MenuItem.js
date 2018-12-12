import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faBold,
  faItalic,
  faUnderline,
  faQuoteLeft,
  faQuoteRight,
  faMinus,
  faCode,
  faSubscript,
  faSuperscript,
  faStrikethrough,
  faLink,
  faListOl,
  faListUl,
  faSquare
} from '@fortawesome/free-solid-svg-icons'
import './MenuItem.css'

library.add(
  faBold,
  faItalic,
  faUnderline,
  faQuoteLeft,
  faQuoteRight,
  faMinus,
  faCode,
  faSubscript,
  faSuperscript,
  faStrikethrough,
  faLink,
  faListOl,
  faListUl,
  faSquare
)

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  command: PropTypes.func,
  isActive: PropTypes.bool,
  isAllowed: PropTypes.bool
}

class MenuItem extends Component {
  constructor (props) {
    super(props)

    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  // componentDidMount() {
  //   this.setState({
  //     disabled:
  //       this.props.isAllowed && !this.props.isAllowed(this.props.editorState),
  //     active:
  //       this.props.isActive && this.props.isActive(this.props.editorState),
  //   });
  // }

  handleMouseDown (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.run()
  }

  render () {
    return (
      <div className='proto-menuitem-div'>
        <button
          className='proto-menuitem'
          disabled={!this.props.isAllowed}
          active={this.props.isActive ? 'true' : 'false'}
          onMouseDown={this.handleMouseDown}
          title={this.title}
          alt={this.title}
          key={this.title}
        >
          {this.props.children}
        </button>
      </div>
    )
  }
}

MenuItem.propTypes = propTypes
// MenuItem.defaultProps = defaultProps;
export default MenuItem
