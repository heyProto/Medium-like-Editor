import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import DropDown from '../util/DropDown';
import Card from '../../components/Card/Card';
import './CardSelector.css';
import { ReactComponent as ProtoIcon } from '../../assets/icons/proto-icon.svg';

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
    this.props.run(this.state.cardIframe);
  }

  handleChange(e) {
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
    let buttonProps = {
      faIcon: this.props.faIcon,
      selection: this.props.selection,
      run: this.toggleSelector,
      isActive: this.props.isActive,
      isAllowed: this.props.isAllowed,
    };

    let contentDisplay = this.state.isOpened ? 'inherit' : 'none';
    return (
      <div className="card-selector-button">
        <MenuItem {...buttonProps}>
          {/* <img src={icon} /> */}
          <ProtoIcon style={{ height: '25px', width: '25px' }} />
        </MenuItem>
        {this.state && this.state.isOpened && (
          <div
            className="card-selector-content"
            style={{ display: contentDisplay }}
          >
            <DropDown
              options={this.props['card-list'] || [{ id: 1, name: 'test' }]}
              onChange={this.handleChange}
              placeHolder="Select Card ..."
            />
            <button disabled={!this.state.card} onMouseDown={this.handleSubmit}>
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
