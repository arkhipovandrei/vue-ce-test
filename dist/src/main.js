"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MybidFrom = void 0;
var _vue = require("vue");
var _MybidFromCe = _interopRequireDefault(require("./components/MybidFrom.ce.vue"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MybidFrom = exports.MybidFrom = (0, _vue.defineCustomElement)(_MybidFromCe.default);
customElements.define('mybid-from', MybidFrom);