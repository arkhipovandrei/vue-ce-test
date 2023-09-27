"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vite = require("vite");
var _nodePath = _interopRequireDefault(require("node:path"));
var _pluginVue = _interopRequireDefault(require("@vitejs/plugin-vue"));
var _pluginBasicSsl = _interopRequireDefault(require("@vitejs/plugin-basic-ssl"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// https://vitejs.dev/config/
var _default = exports.default = (0, _vite.defineConfig)({
  plugins: [(0, _pluginBasicSsl.default)(), (0, _pluginVue.default)()],
  resolve: {
    alias: {
      "@": _nodePath.default.resolve(__dirname, "./src")
    }
  },
  server: {
    host: true,
    port: 3000
  }
});