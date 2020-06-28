import React,{useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegistePage";
import Dashboard from "./components/Dashboard";
import ChatRoom from './components/ChatRoom'
import Confirm from './components/Confrim'
import {connect} from 'react-redux'
import {getUser} from './redux/actions/AuthActions'
const App = ({auth, getUser}) => {

  useEffect(() => {
    getUser();
  }, [getUser])
  
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/chat" component={ChatRoom} />
        <Route path='/confirm' component={Confirm}/>
      </Switch>
    </Router>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {getUser})(App);
