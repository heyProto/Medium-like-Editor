/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

// require('./video.scss');

const propTypes = {
	attrs: PropTypes.object.isRequired,
	// options: PropTypes.object.isRequired,
	isSelected: PropTypes.bool.isRequired,
	// isEditable: PropTypes.bool.isRequired,
};

const Video = (props)=> {
	const attrs = props.attrs;
	const figFloat = attrs.align === 'left' || attrs.align === 'right'
		? attrs.align
		: 'none';
	let figMargin = '0em auto 1em';
	if (attrs.align === 'left') { figMargin = '1em 1em 1em 0px'; }
	if (attrs.align === 'right') { figMargin = '1em 0px 1em 1em'; }
	const figWidth = attrs.align === 'full'
		? '100%'
		: `${attrs.size}%`;
	const figStyle = {
		width: figWidth,
		margin: figMargin,
		float: figFloat,
	};

	return (
		<div className="figure-wrapper">
			<figure className={`video ${props.isSelected ? 'isSelected' : ''}`} style={figStyle}>
				<video
					controls
					src={attrs.url}
					preload="metadata"
				/>
				{attrs.caption &&
					<figcaption dangerouslySetInnerHTML={{ __html: attrs.caption }} />
				}
			</figure>
		</div>
	);
};

Video.propTypes = propTypes;
export default Video;
