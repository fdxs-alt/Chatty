import React from "react";
import { css } from "@emotion/core";
import RotateLoader from "react-spinners/RotateLoader";
import styles from "../styles/Dashboard.module.css";
const override = css`
  display: block;
  background-color: blue;
  border: red;
`;
const Spinner = ({ loading,size }) => {
  return (
    <div className={styles.load}>
      <RotateLoader
        css={override}
        size={size}
        color={"#123abc"}
        loading={loading}
      />
    </div>
  );
};

export default Spinner;
