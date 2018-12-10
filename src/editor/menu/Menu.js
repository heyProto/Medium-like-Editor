import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuItem from './MenuItem.js'
import DropdownMenuItem from './DropdownMenuItem'
import CardSelector from './CardSelector.js'
import UrlSelector from './UrlSelector.js'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func
}

class Menu extends Component {
  constructor (props) {
    super(props)
  }

  isAllowed = e => {
    if (e.title === 'Styled Blockquote' && this.props.editorChange.selectedNode) {
      return false;
    }
    if (e.section === 'transform') {
      if (
        this.props.editorChange.menuItems.find(x => x.title === 'Superscript')
          .isActive === true &&
        e.title === 'Subscript'
      ) {
        return false
      } else if (
        this.props.editorChange.menuItems.find(x => x.title === 'Subscript')
          .isActive === true &&
        e.title === 'Superscript'
      ) {
        return false
      }
      if (e.title === 'Link' && !this.props.editorChange.selectedText) {
        // link disabled when nothing selected
        return false
      } else if (this.props.editorChange.selectedNode) {
        // marks disabled when card selected
        return false
      } else {
        return true
      }
    }
    if (e.title === 'Horizontal Rule' && this.props.editorChange.selectedText) {
      return false
    } else {
      return true
    }
  }

  render () {
    console.log(this.props.editorChange)
    return (
      <div className='proto-menu'>
        {this.props.editorChange &&
          this.props.editorChange.menuItems.map(e => {
            e.isAllowed = this.isAllowed(e)
            if (e.type === 'button') {
              return (
                <MenuItem {...e} selection={this.props.editorChange.selection}>
                  <FontAwesomeIcon icon={e.faIcon} size='lg' />
                </MenuItem>
              )
            } else if (e.type === 'dropdown') {
              return <DropdownMenuItem {...e} />
            } else if (e.type === 'prompt') {
              switch (e.title) {
                case 'Card':
                  return (
                    <CardSelector {...e} cards_request={this.props.cards_request} />
                  )
                case 'Link':
                  return <UrlSelector {...e} />
              }
            }
          })}
      </div>
    )
  }
}

Menu.propTypes = propTypes
// Menu.defaultProps = defaultProps;
export default Menu
