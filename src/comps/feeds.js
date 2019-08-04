import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../stylesheets/theme-main.css";
import userProfile from "../images/iconfinder_user-2_430127.svg";
import commentIcon from "../images/baseline-comment-24px.svg";
import heartIcon from "../images/baseline-favorite-24px.svg";
import moreVertical from "../images/baseline-more_horiz-24px.svg";
import postimage from "../images/postimage.jpg";

function Feeds() {
  return (
    <div className="feeds">
      <div className="feed-header">
        <img src={userProfile} />
        <div className="text">
          <h4>Suryanshu Sharma</h4>
          <p>23h</p>
        </div>
        <img src={moreVertical} className="moreicon" />
      </div>
      <div className="post-image">
        <img src={postimage} />
      </div>
      <div className="feed-footer">
        <div className="heart">
          <img src={heartIcon} />
        </div>
        <p className="num">2M</p>
        <div className="heart">
          <img src={commentIcon} />
        </div>
        <p className="num">100</p>
        <p className="commented">
          <strong>deepak101: </strong>This is awesome.
        </p>
      </div>
    </div>
  );
}
export default Feeds;
