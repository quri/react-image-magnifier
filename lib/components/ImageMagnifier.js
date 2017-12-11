"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageMagnifier = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Magnifier = require("./Magnifier");

var _Magnifier2 = _interopRequireDefault(_Magnifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getZoomRatio(src, zoomImage, img) {
  var image = new Image();
  image.src = src;
  return {
    x: (zoomImage && zoomImage.width || image.width) / img.clientWidth,
    y: (zoomImage && zoomImage.height || image.height) / img.clientHeight
  };
}

var ImageMagnifier = exports.ImageMagnifier = function (_React$Component) {
  _inherits(ImageMagnifier, _React$Component);

  function ImageMagnifier(props) {
    _classCallCheck(this, ImageMagnifier);

    var _this = _possibleConstructorReturn(this, (ImageMagnifier.__proto__ || Object.getPrototypeOf(ImageMagnifier)).call(this, props));

    _this.onMouseEnter = function () {
      return _this.setState({
        magnify: true
      });
    };

    _this.onMouseLeave = function () {
      return _this.setState({
        magnify: false
      });
    };

    _this.onMouseMove = function (e) {
      if (_this.img) {
        var box = _this.img.getBoundingClientRect();
        _this.setState({
          x: e.clientX - box.left + _this.props.cursorOffset.left,
          y: e.clientY - box.top + _this.props.cursorOffset.top
        });
      }
    };

    _this.renderMagnifier = function () {
      if (_this.img) {
        var ratios = getZoomRatio(_this.props.src, _this.props.zoomImage, _this.img);
        return _react2.default.createElement(_Magnifier2.default, {
          size: _this.props.magnifierSize,
          src: _this.props.src,
          x: _this.state.x,
          y: _this.state.y,
          zoomRatio: ratios
        });
      }
      return null;
    };

    _this.state = {
      magnify: false,
      x: 0,
      y: 0
    };
    return _this;
  }

  _createClass(ImageMagnifier, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.container) {
        this.container.addEventListener("mouseenter", this.onMouseEnter);
        this.container.addEventListener("mouseleave", this.onMouseLeave);
        this.container.addEventListener("mousemove", this.onMouseMove);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.container) {
        this.container.removeEventListener("mouseenter", this.onMouseEnter);
        this.container.removeEventListener("mouseleave", this.onMouseLeave);
        this.container.removeEventListener("mousemove", this.onMouseMove);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        {
          id: "React-Image-Magnifier__ImageMagnifier--Container",
          ref: function ref(node) {
            return _this2.container = node;
          },
          style: {
            cursor: "none"
          }
        },
        this.state.magnify && this.renderMagnifier(),
        _react2.default.createElement("img", {
          ref: function ref(img) {
            return _this2.img = img;
          },
          src: this.props.src,
          style: _extends({
            height: this.props.height,
            width: this.props.width
          }, this.props.style)
        })
      );
    }
  }]);

  return ImageMagnifier;
}(_react2.default.Component);

ImageMagnifier.propTypes = {
  src: _propTypes2.default.string.isRequired, // URL of the image
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), // size of the non-zoomed-in image
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), // size of the non-zoomed-in image
  magnifierSize: _propTypes2.default.number, // size of the magnifier window
  cursorOffset: _propTypes2.default.shape({
    left: _propTypes2.default.number.isRequired,
    top: _propTypes2.default.number.isRequired
  }), // offset of the zoom bubble from the cursor
  zoomImage: _propTypes2.default.shape({
    height: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired
  }), // size of the zoomed-in image
  style: _propTypes2.default.shape({})
};
ImageMagnifier.defaultProps = {
  magnifierSize: 200,
  cursorOffset: {
    left: 0,
    top: 0
  },
  height: "auto",
  width: "100%",
  zoomImage: null,
  style: {}
};
exports.default = ImageMagnifier;