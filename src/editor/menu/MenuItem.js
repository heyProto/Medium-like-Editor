import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { library } from '@fortawesome/fontawesome-svg-core'
import Tooltip from '../util/Tooltip';
import styles from "./MenuItem.module.css";

import {
  faBold,
  faItalic,
  faUnderline,
  faQuoteLeft,
  faEllipsisH,
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

library.add(
  faBold,
  faItalic,
  faUnderline,
  faQuoteLeft,
  faEllipsisH,
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
      <div className={styles['item-div']}>
      <Tooltip message={this.props.title}>
        <button
          className={styles['item']}
          disabled={!this.props.isAllowed}
          active={this.props.isActive ? 'true' : 'false'}
          onMouseDown={this.handleMouseDown}
          key={this.props.title}
        >
          {this.props.children}
        </button>
      </Tooltip>
      </div>
    )
  }
}

MenuItem.propTypes = propTypes
// MenuItem.defaultProps = defaultProps;
export default MenuItem
