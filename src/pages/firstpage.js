import React from "react";
import "../stylesheets/theme.css";
import logo from "../images/logo.png";
import logofoot from "../images/oie_E7N2Kl0Sn5QA.png";
import { Link } from "react-router-dom";

export default class FirstPage extends React.Component {
  componentDidMount() {
    document.title = "Kyro, Introducing new social platform.";
  }
  render() {
    return (
      <div className="firstbody">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="kyro-app" />
            <div className="beta">
              <p>BETA</p>
            </div>
          </div>
          <div className="action">
            <Link to="/serviceAuth/login">Login</Link>
            <Link to="/serviceAuth/create">Sign up</Link>
          </div>
        </div>
        <div className="section">
          <h1>
            Ready to explore,
            <br />A new exciting journey.
          </h1>
          <p>Create a new account.</p>
          <br />
          <Link to="/serviceAuth/create">Start Now</Link>
        </div>
        <div className="footer">
          <div className="left-foot">
            <img src={logofoot} />
            <ul>
              <li>About Us</li>
              <li>Data Protection</li>
            </ul>
          </div>
          <div className="right-foot">
            <p>Image by Sunyu Kim</p>
          </div>
        </div>
      </div>
    );
  }
}
