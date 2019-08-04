import React from "react";

export default class Mobile extends React.Component {
  componentDidMount() {
    document.title = "Kyro Mobile";
  }
  render() {
    return <h1>this is a mobile site</h1>;
  }
}
