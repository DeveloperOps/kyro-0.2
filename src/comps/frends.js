import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../stylesheets/theme-main.css";
import userProfile from "../images/iconfinder_user-2_430127.svg";
import audioicon from "../images/baseline-mic-24px.svg";
import moreVertical from "../images/baseline-more_vert-24px.svg";
class Freind extends React.Component {
  render() {
    return (
      <div className="user">
        <img src={userProfile} alt="user" />
        <div className="frends-text">
          <h4>Username</h4>
        </div>
        <img src={audioicon} className="audioicon" />
        <img src={moreVertical} className="more-vertical" />
      </div>
    );
  }
}
function Frends() {
  return (
    <div className="frends">
      <div className="frends-header">
        <p>Active Friends</p>
      </div>
      <Freind />
      <Freind />
    </div>
  );
}
export default Frends;
