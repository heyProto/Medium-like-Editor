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

        <section className={styles["main"]}>
        <div className={styles["heading"]}>{this.props.title}</div>
        <div className={styles["content"]}>
          {this.props.children}
          <div
            className="btn btn--secondary btn--md"
            onClick={this.props.onClose}
          >
            Close
          </div>
        </div>
        </section>
      </div>
    );
  }
}
