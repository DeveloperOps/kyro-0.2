import React from "react";
import "../stylesheets/theme-main.css";
import logo from "../images/logo.png";
import userProfile from "../images/iconfinder_user-2_430127.svg";
import { Link } from "react-router-dom";
import Status from "../comps/status";
import Frends from "../comps/frends";
import Feeds from "../comps/feeds";
import Posts from "../comps/posts";
import moreOpt from "../images/more.png";
import search from "../images/outline-search-24px.svg";
import logout from "../images/outline-exit_to_app-24px.svg";
import manage from "../images/outline-settings-24px.svg";
import * as firebase from "firebase/app";
import "firebase/auth";

function sideBar() {
  document.querySelector(".sidebar").classList.toggle("active");
}

function welcome() {
  var storage = firebase.storage();
  var storageRef = storage.ref();
  const user = firebase.auth().currentUser;
  let name = user.displayName;
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

  document.getElementById("name").innerHTML = name.slice(0, 14);
}
// Signout function
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

export default class Home extends React.Component {
  componentDidMount() {
    document.title = "Home | Kyro";
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        welcome(user);
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
          <button className="logout" onClick={signout}>
            <img src={logout} />
            <p>Logout</p>
          </button>
          <Frends />
        </div>
        <div className="body-content">
          <Status />
          <Posts />
          <div className="all-feeds">
            <Feeds />
            <Feeds />
          </div>
          <Frends />
        </div>
      </div>
    );
  }
}
