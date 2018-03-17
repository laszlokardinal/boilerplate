/* global require */

require("babel-polyfill");
require("./index.scss");

import React, { Component } from "react";
import ReactDOM from "react-dom";

import configureStore from "./store/configureStore.js";
import App from "./view/App.jsx";

const store = configureStore();

class Root extends Component {
  constructor(props) {
    super(props);

    props.store.subscribe(() => this.forceUpdate());
  }

  render() {
    const { store } = this.props;

    return <App state={store.getState()} dispatch={store.dispatch} />;
  }
}

ReactDOM.render(
  React.createElement(Root, { store }),
  document.getElementById("react-root")
);
