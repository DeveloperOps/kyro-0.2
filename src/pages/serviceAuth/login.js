import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import React from "react";
import logo from "../../images/logo.png";
import "../../stylesheets/loginsign.css";
import { Link } from "react-router-dom";
import googlelogo from "../../images/icon_google.png";

function loginUser() {
  const firebasedb = firebase.database();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  firebasedb
    .ref(`users/${userId}`)
    .once("value")
    .then(gotData);
}
function gotData(data) {
  console.log(data);
  if (data.val().firstTime) {
    window.location.href = "/welcome";
  } else {
    window.location.href = "/home";
  }
}
//Invalid Message Function
let invalidFlag = false;
function displayMsg(msg) {
  const invalMsg = document.getElementById("msg");
  invalMsg.innerHTML = msg;
}

//Invalid Flag
function display(invalidFlag) {
  const invalid = document.getElementById("throw-error");
  if (invalidFlag === true) {
    invalid.setAttribute("style", "display:block;");
  } else {
    invalid.setAttribute("style", "display:none;");
  }
}

function getData() {
  const email = document.getElementById("email").value;
  const key = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, key)
    .then(loginUser)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      if (
        errorCode == "auth/user-not-found" ||
        errorCode == "auth/wrong-password"
      ) {
        invalidFlag = true;
        let msg = "Wrong Email and Password.";
        displayMsg(msg);
        display(invalidFlag);
      }

      // ...
    });
}

//Google Authentication
function googleAuth() {
  const provider = new firebase.auth.OAuthProvider("google.com");
  provider.addScope("profile");
  provider.addScope("email");
  provider.addScope("openid");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      // This gives you the OAuth Access Token for that provider.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      loginUser();
    });
}

export default class Login extends React.Component {
  componentDidMount() {
    document.title = "Kyro | Login to your account. ";
  }
  render() {
    return (
      <div className="login-body">
        <div className="login">
          <img src={logo} />
          <div id="throw-error">
            <p className="invalid" id="msg" />
          </div>
          <div className="form-log">
            <label>Email :</label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Enter E-mail address."
            />
            <label>Password :</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password."
            />
            <label className="remember">
              <input type="checkbox" name="Remember me" /> Remember me
            </label>
            <a href="" className="forgot">
              Forgot password ?
            </a>
            <button onClick={getData}>Log in</button>
          </div>
          <p className="opt">or use any one of these.</p>
          <a href="" className="google" onClick={googleAuth}>
            <img src={googlelogo} />
          </a>
          <p className="createone">
            Don't have account yet,{" "}
            <Link to="/serviceAuth/create">Create one.</Link>
          </p>
        </div>
      </div>
    );
  }
}
