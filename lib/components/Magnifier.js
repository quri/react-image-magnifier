"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Magnifier = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Magnifier = exports.Magnifier = function Magnifier(props) {
  var bgX = (props.x * props.zoomRatio.x - props.size / 2) * -1;
  var bgY = (props.y * props.zoomRatio.y - props.size / 2) * -1;

  return _reactDom2.default.createPortal(_react2.default.createElement("div", {
    style: {
      cursor: "none",
      position: "absolute",
      display: "block",
      borderRadius: "100%",
      boxShadow: "\n            0 0 0 4px rgba(255, 255, 255, 1),\n            0 0 7px 7px rgba(0, 0, 0, 0.25),\n            inset 0 0 40px 2px rgba(0, 0, 0, 0.25)\n          ",
      left: props.x,
      top: props.y,
      marginLeft: props.size / 2 * -1,
      marginTop: props.size / 2 * -1,
      width: props.size,
      height: props.size,
      background: "url(" + props.src + ") no-repeat",
      backgroundPosition: bgX + "px " + bgY + "px"
    }
  }), document.getElementById("ImageMagnifier"));
};

Magnifier.propTypes = {
  size: _propTypes2.default.number.isRequired, // size of the magnifier window
  src: _propTypes2.default.string.isRequired, // URL of the image
  x: _propTypes2.default.number.isRequired, // x position
  y: _propTypes2.default.number.isRequired, // y position
  zoomRatio: {
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired
  } // zoom ratio
};

exports.default = Magnifier;