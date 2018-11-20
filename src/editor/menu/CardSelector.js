import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'prosemirror-menu';
import DropDown from '../util/DropDown';

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
    this.toggleSelector = this.toggleSelector.bind(this);

    this.setState({ isOpened: false });
  }

  // componentDidMount() {
  //   this.setState({
  //     disabled:
  //       this.props.isAllowed && !this.props.isAllowed(this.props.editorState),
  //     active:
  //       this.props.isActive && this.props.isActive(this.props.editorState),
  //   });
  // }

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.toggleSelector();
    this.props.run();
  }

  handleChange(e) {
    let card = this.props['card-list'].find(x => x.name === e);

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
    this.setState({ isOpened: !isOpened });
  }

  render() {
    console.log(this.props);
    let buttonProps = this.props;
    delete buttonProps['card-list'];
    buttonProps.run = this.handleButtonDown;
    return (
      <MenuItem {...buttonProps}>
        <div>
          <DropDown
            options={this.props['card-list']}
            onChange={this.handleChange}
            placeHolder="Select Card ..."
          />
          <button disabled={!this.state.card} onMouseDown={this.handleSubmit}>
            Submit
          </button>
          <button onMouseDown={this.toggleSelector}>Cancel</button>
          {this.state.cardIframe && (
            <div className="card-preview">
              <iframe
                title={this.state.cardIframe.caption}
                src={this.state.cardIframe.url}
              />
            </div>
          )}
        </div>
      </MenuItem>
    );
  }
}

CardSelector.propTypes = propTypes;
// CardSelector.defaultProps = defaultProps;
export default CardSelector;
