import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegistePage";
import Dashboard from "./components/Dashboard";
import ChatRoom from "./components/ChatRoom";
import Confirm from "./components/Confirm";
import ResetByEmail from './components/ResetByEmail'
import ResetPassword from "./components/ResetPassword";
import { connect } from "react-redux";
import { getUser } from "./redux/actions/AuthActions";
import PrivateRoute from "./util/PrivateRoute";
import Options from './components/Options'
const App = ({ getUser }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginPage} exact/>
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/chat" component={ChatRoom} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/resetByEmail" component={ResetByEmail} />
        <PrivateRoute path="/options" component={Options}/>
      </Switch>
    </Router>
  );
};

export default connect(null, { getUser })(App);
