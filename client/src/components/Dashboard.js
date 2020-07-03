import React from "react";
import ChatList from "./ChatList";
import Menu from "./Menu";
import styles from "../styles/Dashboard.module.css";
import { connect } from "react-redux";
import Spinner from './Spinner'
const Dashboard = ({ auth }) => {
  if (auth.isLoading || auth.isLoading == null)
    return <Spinner loading={auth.isLoading} size={300}/>
  else
    return (
      <div className={styles.container}>
        <Menu />
        <ChatList />
      </div>
    );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(Dashboard);
