import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../stylesheets/theme-main.css";
import userProfile from "../images/iconfinder_user-2_430127.svg";

class StatusImg extends React.Component {
  render() {
    return <img src={userProfile} />;
  }
}
function Status() {
  return (
    <div className="status">
      <div className="recent">
        <p>RECENT</p>
        <p>Statuses</p>
      </div>
      <StatusImg />
      <StatusImg />
      <StatusImg />
    </div>
  );
}

export default Status;
