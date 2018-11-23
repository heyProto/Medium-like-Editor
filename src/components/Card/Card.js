/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  attrs: PropTypes.object.isRequired,
};

const Card = props => {
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
  const cardStyle = {
    width: cardWidth,
    margin: cardMargin,
    float: cardFloat,
  };

  return (
    <div className="card-wrapper" style={cardStyle}>
      {attrs.url && (
        <iframe
          data-card-id={attrs.id}
          title={attrs.caption}
          src={attrs.url}
          height={`${attrs.height}px`}
          allowFullScreen
          frameBorder="0"
        />
      )}
      {!attrs.url && <div className="empty-iframe">Enter Source URL</div>}
    </div>
  );
};

Card.propTypes = propTypes;
export default Card;