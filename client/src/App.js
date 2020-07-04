import React,{useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegistePage";
import Dashboard from "./components/Dashboard";
import ChatRoom from './components/ChatRoom'
import Confirm from './components/Confrim'
import {connect} from 'react-redux'
import {getUser} from './redux/actions/AuthActions'
import PrivateRoute from './util/PrivateRoute'
const App = ({getUser}) => {

  useEffect(() => {
    getUser();
  }, [getUser])
  
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/chat" component={ChatRoom} />
        <Route path='/confirm' component={Confirm}/>
      </Switch>
    </Router>
  );
};

export default connect(null, {getUser})(App);
