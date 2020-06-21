import React from "react";
import ChatList from "./ChatList";
import Menu from "./Menu";
import styles from "../styles/Dashboard.module.css";
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Menu />
      <ChatList />
    </div>
  );
};

export default Dashboard;
