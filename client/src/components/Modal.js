import React from "react";
import styles from "../styles/Modal.module.css";
const Modal = ({ setOpen, open, children }) => {
  return (
    <div className={open ? styles.modalDisplay : styles.modalNoDisplay}>
      <div className={styles.modalMain}>
        <button className={styles.modalButton} onClick={() => setOpen(false)}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
