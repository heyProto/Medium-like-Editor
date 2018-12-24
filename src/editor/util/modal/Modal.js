import React, { Component } from "react";

//styles
import styles from "./Modal.module.css";
import theme from '../../Theme.module.css';

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
        <div className={styles["heading"]}>{this.props.title}
         <div
            className={styles["close-button"]}
            onClick={this.props.onClose}
          >
            ×
          </div></div>
        <div className={styles["content"]}>
          {this.props.children}
        </div>
        </section>
      </div>
    );
  }
}
