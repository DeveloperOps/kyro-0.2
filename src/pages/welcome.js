import React from "react";
import "../stylesheets/theme-main.css";
import logo from "../images/logo.png";
import fakeperson from "../images/baseline-perm_identity-24px.svg";
import { Link } from "react-router-dom";
import "../stylesheets/new.css";
import userEdit from "../images/iconfinder_user_profile_edit_103781.svg";
import userProfile from "../images/iconfinder_user-2_430127.svg";
import moreOpt from "../images/more.png";
import search from "../images/outline-search-24px.svg";
import logout from "../images/outline-exit_to_app-24px.svg";
import manage from "../images/outline-settings-24px.svg";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "firebase/firebase-storage";

function onceCreate(user) {
  if (user.displayName !== "new_user" && user.displayName == null) {
    createUser();
  }
}
//Creating User
function createUser() {
  const firebasedb = firebase.database();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const photoURL = document.getElementById("user-profile").src;
  user.updateProfile({ displayName: "new_user", photoURL: photoURL }).then();
  const ref = firebasedb.ref("users");
  const userdb = {
    username: "new_user",
    firstTime: true
  };
  ref.child(userId).set(userdb);
}

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      window.location = "/";
    })
    .catch(function(error) {
      // An error happened.
    });
}

function welcome() {
  var storage = firebase.storage();
  var storageRef = storage.ref();
  const user = firebase.auth().currentUser;
  onceCreate(user);
  let name = user.displayName;
  let email = user.email;
  storageRef
    .child(`${user.uid}/profiles`)
    .getDownloadURL()
    .then(function(url) {
      let _PREVIEW_URL = url;
      document.getElementById("user-profile").setAttribute("src", _PREVIEW_URL);
    })
    .catch(function(error) {
      // Handle any errors
    });
  if (name !== null) {
    document.getElementById("name").innerHTML = name.slice(0, 10);
    document.getElementById("welcomename").innerHTML =
      "Welcome, " + name.slice(0, 10) + "...";
  } else {
    document.getElementById("name").innerHTML = email.slice(0, 10);
    document.getElementById("welcomename").innerHTML =
      "Welcome, " + email.slice(0, 10) + "...";
  }
}

function preview() {
  let file = document.querySelector("#photo").files[0];
  if (file !== undefined) {
    let _PREVIEW_URL = URL.createObjectURL(file);
    document.querySelector("#profile-update").setAttribute("src", _PREVIEW_URL);
  }
}

function submit() {
  const firebasedb = firebase.database();
  var storage = firebase.storage();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  var storageRef = storage.ref();
  const ref = firebasedb.ref("users");
  var userRef = storageRef.child(`${user.uid}`);
  var profileRef = userRef.child("profiles");
  const photoFile = document.getElementById("photo").files[0];
  let _URL_PHOTO;
  if (photoFile !== undefined) {
    let _URL_PHOTO = URL.createObjectURL(photoFile);
    profileRef.put(photoFile).then(function(snapshot) {
      console.log("Uploaded a blob or file!");
    });
  } else {
    _URL_PHOTO = null;
  }
  const display = document.getElementById("username").value;
  user.updateProfile({ displayName: display, photoURL: _URL_PHOTO }).then();
  const userdbupdate = {
    username: display,
    firstTime: false
  };
  ref.child(userId).update(userdbupdate, function(error) {
    if (error) {
      console.log(error);
    } else {
      window.location.href = "/home";
    }
  });
}

function sideBar() {
  document.querySelector(".sidebar").classList.toggle("active");
}

export class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <Link to="/profile">
          <img src={userProfile} id="user-profile" alt="user" />
        </Link>
        <div className="text">
          <h2 id="name" />
          <Link to="/manageacc">
            <img className="manage-desktop" src={manage} />
            <p className="man">Manage</p>
          </Link>
        </div>
      </div>
    );
  }
}

export class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <input type="text" placeholder="Search for peoples, places" />
      </div>
    );
  }
}

export default class Welcome extends React.Component {
  componentDidMount() {
    document.title = "Welcome | Kyro";
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        welcome();
      } else {
        window.location = "/serviceAuth/login";
      }
    });
  }
  render() {
    return (
      <div>
        <div className="header-home">
          <div className="logo-container">
            <img src={logo} alt="kyro-webapp" />
            <div className="beta">
              <p>BETA</p>
            </div>
          </div>
          <Search />
          <div className="search-mobile">
            <button>
              <img src={search} />
            </button>
          </div>
          <Profile />
          <div className="more-opt">
            <button onClick={sideBar}>
              <img src={moreOpt} />
            </button>
          </div>
        </div>
        <div className="sidebar">
          <button className="logout">
            <img src={manage} />
            <p>Manage</p>
          </button>
          <button className="logout">
            <img src={logout} onClick={signout} />
            <p>Logout</p>
          </button>
        </div>
        <div className="body-content-welcome">
          <h1 id="welcomename" />
          <div className="intro">
            <p>We are glad that you signed up.</p>
            <p>Just tell us about more, so we can finish your profile.</p>
          </div>
          <div className="update-profile">
            <img src={userEdit} className="icon-edit" alt="Edit Profile" />
            <h2>Profile Setup</h2>
            <div className="profile-image">
              <p>
                <strong>1. Choose your profile image,</strong>
              </p>
              <img src={userProfile} id="profile-update" alt="user" />
              <input
                type="file"
                id="photo"
                onChange={preview}
                accept="image/jpg,image/png"
              />
              <p>
                <strong>2. Choose your username,</strong>
              </p>
              <div className="username">
                <label>Pick your Username: </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Create a username."
                />
              </div>
              <button onClick={submit}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
