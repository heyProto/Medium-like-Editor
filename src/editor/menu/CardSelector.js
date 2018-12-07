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

    this.state = { isOpened: false, cardList: null };
  }

  componentDidMount() {
    let cardList = [
      {
        url:
          'https://cdn.protograph.pykih.com/99e448b6fcb668c5a3d4/index.html?view_cast_id=7a312bd07ab133968703ec4e&base_url=https://www.responsiblebiz.org',
        size: 75,
        height: 419,
        align: 'center',
        caption: 'Image',
        'data-card-id': 62499,
        'data-template-id': '47',
      },
    ];

    cardList.map(e => {
      e.key = e['data-card-id'];
      e.title = e.caption;
      return e;
    });

    this.setState({ cardList });
  }

  hideModal = () => {
    this.setState({ isOpened: false });
  };

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.toggleSelector();
    this.props.run(this.state.card);
  }

  handleChange(e) {
    let card = this.state.cardList.find(x => x.key === e);

    this.setState({
      card: card,
    });

    console.log(card);
  }

  toggleSelector(e) {
    let isOpened = this.state.isOpened;
    this.setState({ isOpened: !isOpened, card: null });
  }

  render() {
    let buttonProps = {
      faIcon: this.props.faIcon,
      selection: this.props.selection,
      run: this.toggleSelector,
      isActive: this.props.isActive,
      isAllowed: this.props.isAllowed,
    };

    return (
      <div>
        <Modal isOpened={this.state.isOpened} handleClose={this.hideModal}>
          <DropDown
            options={this.state.cardList}
            onChange={this.handleChange}
            placeHolder="Select Card"
          />
          <div className="card-preview">
            {this.state.card && (
              <Card attrs={this.state.card} isSelected={false} />
            )}
          </div>

          <button disabled={!this.state.card} onClick={this.handleSubmit}>
            Submit
          </button>
        </Modal>
        <MenuItem {...buttonProps}>
          <ProtoIcon style={{ height: '25px', width: '25px' }} />
        </MenuItem>
      </div>
    );
  }
}

const Modal = ({ handleClose, isOpened, children }) => {
  const showHideClassName = isOpened
    ? 'modal display-block'
    : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

CardSelector.propTypes = propTypes;
// CardSelector.defaultProps = defaultProps;
export default CardSelector;

// {this.state && this.state.isOpened && (
//           <div
//             className="card-selector-content"
//             style={{ display: contentDisplay }}
//           >
//
//           </div>
//         )}
