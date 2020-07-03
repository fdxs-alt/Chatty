import React from "react";
import styles from "../styles/Modal.module.css";
const Modal = ({ setOpen, open, children }) => {
  return (
    <div className={open ? styles.modalDisplay : styles.modalNoDisplay}>
      <div className={styles.modalMain}>
        {children}
        <button onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
