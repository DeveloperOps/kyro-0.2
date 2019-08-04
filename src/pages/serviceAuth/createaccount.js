import React from "react";
import ReactDOM from "react-dom";
import logo from "../../images/logo.png";
import "../../stylesheets/loginsign.css";
import { Link } from "react-router-dom";
import googlelogo from "../../images/icon_google.png";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";

//call back function
function redirect() {
  window.location.href = "/welcome";
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
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let dataEmail = "";
  let dataPasswordAgain = "";
  if (document.getElementById("email").value.match(mailformat)) {
    invalidFlag = false;
    const dataEmail = document.getElementById("email").value.trim();
  } else {
    invalidFlag = true;
    let msg = "Please enter a valid E-Mail.";
    displayMsg(msg);
    display(invalidFlag);
  }
  if (document.getElementById("password").value.length === 0) {
    invalidFlag = true;
    let msg = "Please enter a password";
    displayMsg(msg);
    display(invalidFlag);
  } else {
    invalidFlag = false;
    const dataPassword = document.getElementById("password").value.trim();
  }
  if (
    document.getElementById("password-again").value ===
    document.getElementById("password").value
  ) {
    invalidFlag = false;
    const dataPasswordAgain = document
      .getElementById("password-again")
      .value.trim();
  } else {
    invalidFlag = true;
    let msg = "Passwords do not match";
    displayMsg(msg);
    display(invalidFlag);
  }
  if (document.getElementById("accept").checked === true) {
    invalidFlag = false;
    const dataEmail = document.getElementById("email").value.trim();
    const dataPasswordAgain = document
      .getElementById("password-again")
      .value.trim();
    firebase
      .auth()
      .createUserWithEmailAndPassword(dataEmail, dataPasswordAgain)
      .then(user => {
        redirect();
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          invalidFlag = true;
          let msg = "Email already exists";
          displayMsg(msg);
          display(invalidFlag);
        }
        if (errorCode == "auth/weak-password") {
          invalidFlag = true;
          let msg = "Weak Password (min:6-8)";
          displayMsg(msg);
          display(invalidFlag);
        }
      });
  } else {
    invalidFlag = true;
    let msg = "You do not accepted Terms.";
    displayMsg(msg);
    display(invalidFlag);
  }
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
      redirect();
    });
}
const captcha = "6LfDhK8UAAAAAFrGRg1UexmUl3oiA5apty2kt1lM";

// Default Application
export default class CreateAccount extends React.Component {
  componentDidMount() {
    document.title = "Kyro | Create a new account. ";
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="login-body">
        <div className="login">
          <img src={logo} alt="kyro-logo" />
          <div id="throw-error">
            <p className="invalid" id="msg" />
          </div>
          <div className="form-log">
            <label>Enter your E-mail :</label>
            <input id="email" type="text" name="email" />
            <label>Create a password :</label>
            <input id="password" type="password" name="password" />
            <label>Confirm your password :</label>
            <input id="password-again" type="password" name="password" />
            <label className="remember">
              <input type="checkbox" id="accept" name="iaccept" /> I accept
              terms & read about data protection.
            </label>
            <div className="captcha" />
            <button id="submit" onClick={getData}>
              Create
            </button>
            <div className="captcha">
              <div className="g-recaptcha" data-sitekey={captcha} />
            </div>
          </div>

          <p className="opt">or use any one of these.</p>
          <a onClick={googleAuth} className="google">
            <img src={googlelogo} alt="google" />
          </a>
          <p className="createone">
            Already have account,{" "}
            <Link to="/serviceAuth/login">login here.</Link>
          </p>
        </div>
      </div>
    );
  }
}
