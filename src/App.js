import React from "react";
import logo from "./images/logo.png";
import "./stylesheets/theme.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

//pages
import Home from "./pages/home";
import NotFound from "./pages/404NotFound";
import FirstPage from "./pages/firstpage";
import Login from "./pages/serviceAuth/login";
import CreateAccount from "./pages/serviceAuth/createaccount";
import ProfileMain from "./pages/profile";
import Manage from "./pages/manage";
import * as firebase from "firebase/app";
import Welcome from "./pages/welcome";

const config = {
  apiKey: "AIzaSyAVszaSF75TZlMid0mT0BrSJJkesexGotE",
  authDomain: "kyro-f3c7f.firebaseapp.com",
  databaseURL: "https://kyro-f3c7f.firebaseio.com",
  projectId: "kyro-f3c7f",
  storageBucket: "kyro-f3c7f.appspot.com",
  messagingSenderId: "1102882325",
  appId: "1:1102882325:web:331f737c9f3880a2"
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={FirstPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/serviceAuth/login" component={Login} />
          <Route exact path="/serviceAuth/create" component={CreateAccount} />
          <Route exact path="/profile" component={ProfileMain} />
          <Route exact path="/manageacc" component={Manage} />
          <Route exact path="/404NoTFoUnD" component={NotFound} />
          <Redirect to="/404NoTFoUnD" />
        </Switch>
      </Router>
    );
  }
}
firebase.initializeApp(config);
export default App;
