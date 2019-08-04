import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../stylesheets/theme-main.css";
import userProfile from "../images/iconfinder_user-2_430127.svg";

class Posts extends React.Component {
  render() {
    return (
      <div className="posts">
        <div className="profile">
          <img src={userProfile} id="user-profile" />
        </div>
        <div className="postarea">
          <textarea placeholder="Write Something about today ..." />
        </div>
        <div className="postfooter">
          <button className="button">POST</button>
          <button className="location">Locate</button>
          <button className="feeling">Feeling</button>
          <button className="photo-video">Media</button>
          <div className="empty-div" />
        </div>
      </div>
    );
  }
}

export default Posts;
