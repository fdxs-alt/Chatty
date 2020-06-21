import React from "react";
import styles from "../styles/Menu.module.css";
import { connect } from "react-redux";
import { css } from "@emotion/core";
import RotateLoader	 from "react-spinners/RotateLoader";
import { Link } from "react-router-dom";

const override = css`

  display: block;
  margin: 0 auto;
  background-color: red;
  border: red;
`;

const Menu = ({ auth }) => {
  if (auth.isLoading || auth.isLoading == null)
    return (
      <div className={styles.loading}>
      <RotateLoader	
        css={override}
        size={200}
        color={"#123abc"}
        loading={auth.isLoading}
      />
      </div>
    );
  else
    return (
      <nav className={styles.navbar}>
        <div className={styles.hero}>
          <h1 className={styles.nick}>{auth.user.nick}</h1>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/options" className={styles.link}>
              My account
            </Link>
          </li>
          <li>
            <Link to="/create" className={styles.link}>
              Create new chat
            </Link>
          </li>
        </ul>
        <button className={styles.logout}>Log out</button>
        <h1 className={styles.logo}>Chatty</h1>
      </nav>
    );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(Menu);
