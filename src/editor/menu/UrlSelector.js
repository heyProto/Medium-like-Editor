import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import DropDown from '../util/DropDown';
import Card from '../../components/Card/Card';
import './UrlSelector.css'

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  children: PropTypes.object,
  command: PropTypes.func,
  isActive: PropTypes.bool,
  isAllowed: PropTypes.bool,
};

class UrlSelector extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.targets = [
      { name: 'Same Page', value: '_top' },
      { name: 'New Page', value: '_blank' },
    ];

    this.state = { isOpened: false,
                    targetValue: '_blank' };

    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  handleClick() {
    // attach/remove event handler
    if (!this.state.isOpened) {
      document.addEventListener('click', this.handleClickOutside, false);
    } else {
      document.removeEventListener('click', this.handleClickOutside, false);
    }

    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  }

  handleClickOutside(e) {
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.validateUrl();
    this.toggleSelector();
    this.props.run({
      href: this.state.urlValue,
      title: this.state.titleValue,
      target: this.state.targetValue,
    });
  }

  validateUrl() {}

  render() {
    let buttonProps = {
      selection: this.props.selection,
      run: this.props.isActive ? this.props.run : this.handleClick,
      isActive: this.props.isActive,
      isAllowed: this.props.isAllowed,
      faIcon: this.props.faIcon
    };
    let contentDisplay = (this.state.isOpened) ? 'inherit' : 'none'

    return (
      <div className="url-selector-button" ref={node => { this.node = node; }}>
        <MenuItem {...buttonProps} />
            <div className="url-selector" style={{display: contentDisplay}}>
              <label>
                Url:
                <input
                  type="text"
                  value={this.state.urlValue}
                  onChange={e => {
                    this.setState({ urlValue: e.target.value });
                  }}
                />
              </label>
              <label>
                Title:
                <input
                  type="text"
                  value={this.state.titleValue}
                  onChange={e => {
                    this.setState({ titleValue: e.target.value });
                  }}
                />
              </label>
              
              <button onMouseDown={this.handleSubmit}>Submit</button>
              <button onMouseDown={this.toggleSelector}>Cancel</button>
            </div>
      </div>
    );
  
  }
}

// Target code
//              <label>
//                 Target:
//                 <DropDown
//                   options={this.targets}
//                   onChange={e => {
//                     let target = this.targets.find(x => x.name === e);
//                     this.setState({ targetValue: target.value });
//                   }}
//                   placeHolder=""
//                 />
//               </label>

UrlSelector.propTypes = propTypes;
// UrlSelector.defaultProps = defaultProps;
export default UrlSelector;
