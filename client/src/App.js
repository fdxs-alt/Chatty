import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegistePage";
import Dashboard from "./components/Dashboard";
import ChatRoom from "./components/ChatRoom";
import Confirm from "./components/Confirm";
import ResetByEmail from "./components/ResetByEmail";
import ResetPassword from "./components/ResetPassword";
import { connect } from "react-redux";
import { getUser } from "./redux/actions/AuthActions";
import PrivateRoute from "./util/PrivateRoute";
import Spinner from "./components/Spinner";
import Options from "./components/Options";
const App = ({ getUser, auth }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (auth.isLoading) return <Spinner loading={auth.isLoading} size={300} />;
  else
    return (
      <Router>
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <PrivateRoute path="/chat" component={ChatRoom} />
          <Route path="/confirm" component={Confirm} />
          <Route path="/reset" component={ResetPassword} />
          <Route path="/resetByEmail" component={ResetByEmail} />
          <PrivateRoute path="/options" component={Options} />
        </Switch>
      </Router>
    );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getUser })(App);
