import React, { Component } from "react";
import styles from "./Modal.module.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHideClassName: this.props.isOpen ? "show" : "hide",
    };
  }

  render() {
    return (
      <div
        className={`${styles.modal} ${
          this.props.isOpen ? styles.show : styles.hide
        }`}
      >
        <section className={styles["modal-main"]}>
          {this.props.children}
          <div
            className="btn btn--md btn--secondary"
            onClick={this.props.onClose}
          >
            Close
          </div>
        </section>
      </div>
    );
  }
}
