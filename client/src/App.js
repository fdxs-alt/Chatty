import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegistePage";
import Dashboard from "./components/Dashboard";
const App = () => {

  if(localStorage.getItem("Authorization"))
    console.log(localStorage.getItem("Authorization"))
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
