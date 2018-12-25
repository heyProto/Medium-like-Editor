import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Tooltip.module.css";


class Tooltip extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayTooltip: false
    }
    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }
  
  hideTooltip () {
    this.setState({displayTooltip: false})
    
  }
  showTooltip () {
    this.setState({displayTooltip: true})
  }

  render() {
    let message = this.props.message
    let position = this.props.position
    return (
      <div className={styles.tooltip}>{this.props.children}
        <span className={styles.text}>{this.props.message}</span>
      </div>
    )
  }
}

export default Tooltip;
