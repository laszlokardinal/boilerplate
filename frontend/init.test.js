/* global require */

const React = require("react");

/*
    MOCK CSS MODULES
*/
var mockCssModules = require("mock-css-modules");
mockCssModules.register([".css", ".scss"]);

/*
    ENZYME
*/
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

const { JSDOM } = require("jsdom");
const { document } = new JSDOM(
  "<!doctype html><html><body></body></html>"
).window;
const window = document.defaultView;

/*
    SINON
*/
const sinon = require("sinon");

/*
    CHAI
*/
const chai = require("chai");
const { expect } = chai;

const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const chaiDiff = require('chai-diff');
chai.use(chaiDiff);

const chaiEnzyme = require('chai-enzyme');
chai.use(chaiEnzyme);

// const snapshot = require("snap-shot-it");


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
