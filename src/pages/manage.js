import React from "react";

export default class Manage extends React.Component {
  componentDidMount() {
    document.title = "Manage your account | Kyro";
  }
  render() {
    return <h1>THis is Manage</h1>;
  }
}
