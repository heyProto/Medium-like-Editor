/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  attrs: PropTypes.object.isRequired,
};

class Card extends Component {
  constructor(props) {
    super(props);

    const attrs = props.attrs;
    const cardFloat =
      attrs.align === 'left' || attrs.align === 'right' ? attrs.align : 'none';
    let cardMargin = '0em auto 1em';
    if (attrs.align === 'left') {
      cardMargin = '1em 1em 1em 0px';
    }
    if (attrs.align === 'right') {
      cardMargin = '1em 0px 1em 1em';
    }
    const cardWidth = attrs.align === 'full' ? '100%' : `${attrs.size}%`;
    let cardStyle = {
      width: cardWidth,
      margin: cardMargin,
      float: cardFloat,
    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    let id = 'card-' + this.props.attrs['data-card-id'];
    // let element = document.getElementById(id);
    // let element = document.createElement("div");
    let element = this.cardRef.current;
    // if (element.firstChild) element.removeChild(element.firstChild);
    if (element) {
      const embed = new ProtoEmbed.initFrame(
        element,
        this.props.attrs.url,
        'col7'
      );
    }
    // this.setState({cardDOM: element})
  }

  render() {
    let attrs = this.props.attrs;
    return (
      <div
        id={'card-' + attrs['data-card-id']}
        className="card-wrapper"
        style={this.cardStyle}
        ref={this.cardRef}
      >
        {!attrs.url && <div className="empty-iframe">Enter Source URL</div>}
      </div>
    );
  }
}

Card.propTypes = propTypes;
export default Card;
