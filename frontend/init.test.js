/* global require */

const React = require("react");

var mockCssModules = require("mock-css-modules");
mockCssModules.register([".css", ".scss"]);

const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

const { JSDOM } = require("jsdom");
const { document } = new JSDOM(
  "<!doctype html><html><body></body></html>"
).window;
const window = document.defaultView;

const chai = require("chai");

const { expect } = chai;

const toJson = require("enzyme-to-json").default;
const snapshot = require("snap-shot-it");

const sinon = require("sinon");

Object.assign(global, {
  React,
  document,
  window,
  shallow,
  mount,
  chai,
  expect,
  sinon,
  snapshot,
  toJson
});
