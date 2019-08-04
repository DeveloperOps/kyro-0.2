import React from "react";
import { Search, Profile } from "./home";
import "../stylesheets/theme-main.css";
import "../stylesheets/profile.css";
import logo from "../images/logo.png";
import testCover from "../images/testcover.jpg";
import fakeperson from "../images/baseline-perm_identity-24px.svg";
import testimg from "../images/test.jpg";
const user = "Suryanshu Sharma";

export default class ProfileMain extends React.Component {
  componentDidMount() {
    document.title = user + "'s Profile | Kyro";
  }
  render() {
    return (
      <div>
        <div className="header-home">
          <div className="container">
            <img src={logo} alt="kyro-webapp" />
            <div className="beta">
              <p>BETA</p>
            </div>
          </div>
          <Search />
          <Profile />
        </div>
        <div className="profile-container">
          <div className="profile-cover">
            <img src={testCover} />
            <div className="profile-picture">
              <img src={testimg} />
            </div>
          </div>
          <div className="profile-details" />
          <div className="timeline" />
        </div>
      </div>
    );
  }
}
