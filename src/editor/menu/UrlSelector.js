import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import DropDown from '../util/DropDown';
import Card from '../../components/Card/Card';

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
    this.toggleSelector = this.toggleSelector.bind(this);

    this.targets = [
      { name: 'Same Page', value: '_top' },
      { name: 'New Page', value: '_blank' },
    ];

    this.state = { isOpened: false };
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

  toggleSelector(e) {
    let isOpened = this.state.isOpened;
    this.setState({ isOpened: !isOpened, card: null, cardIframe: null });
  }

  render() {
    let buttonProps = {
      selection: this.props.selection,
      run: this.props.isActive ? this.props.run : this.toggleSelector,
      isActive: this.props.isActive,
      isAllowed: this.props.isAllowed,
    };
    return (
      <div>
        <MenuItem {...buttonProps} />
        {this.state &&
          this.state.isOpened && (
            <div>
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
              <label>
                Target:
                <DropDown
                  options={this.targets}
                  onChange={e => {
                    let target = this.targets.find(x => x.name === e);
                    this.setState({ targetValue: target.value });
                  }}
                  placeHolder=""
                />
                />
              </label>
              <button onMouseDown={this.handleSubmit}>Submit</button>
              <button onMouseDown={this.toggleSelector}>Cancel</button>
            </div>
          )}
      </div>
    );
  }
}

UrlSelector.propTypes = propTypes;
// UrlSelector.defaultProps = defaultProps;
export default UrlSelector;
