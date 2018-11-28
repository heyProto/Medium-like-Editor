import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import DropDown from '../util/DropDown';
import Card from '../../components/Card/Card';
import './CardSelector.css'

const propTypes = {
  editorState: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  children: PropTypes.object,
  command: PropTypes.func,
  isActive: PropTypes.bool,
  isAllowed: PropTypes.bool,
};

class CardSelector extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleSelector = this.toggleSelector.bind(this);

    this.state = { isOpened: false };
  }

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.toggleSelector();
    console.log('PROPS: ', this.props);
    this.props.run(this.state.cardIframe);
  }

  handleChange(e) {
    console.log(this, e);
    let card = (this.props['card-list'] || [{ id: 1, name: 'test' }]).find(
      x => x.name === e
    );

    let cardIframe = {
      url: 'dummy',
      caption: 'dummy',
    };

    this.setState({
      card: card,
      cardIframe: cardIframe,
    });
  }

  toggleSelector(e) {
    let isOpened = this.state.isOpened;
    this.setState({ isOpened: !isOpened, card: null, cardIframe: null });
  }

  render() {
    console.log(this.props)
    let buttonProps = {
      icon: this.props.icon,
      selection: this.props.selection,
      run: this.toggleSelector,
      isActive: this.props.isActive,
      isAllowed: this.props.isAllowed,
    };
    return (
      <div className="card-selector">
        <MenuItem {...buttonProps} />
        {this.state &&
          this.state.isOpened && (
            <div className="card-dropdown-content">
              <DropDown
                options={this.props['card-list'] || [{ id: 1, name: 'test' }]}
                onChange={this.handleChange}
                placeHolder="Select Card ..."
              />
              <button
                disabled={!this.state.card}
                onMouseDown={this.handleSubmit}
              >
                Submit
              </button>
              <button onMouseDown={this.toggleSelector}>Cancel</button>
              {this.state.cardIframe && (
                <div className="card-preview">
                  <Card attrs={this.state.cardIframe} />
                </div>
              )}
            </div>
          )}
      </div>
    );
  }
}

CardSelector.propTypes = propTypes;
// CardSelector.defaultProps = defaultProps;
export default CardSelector;
