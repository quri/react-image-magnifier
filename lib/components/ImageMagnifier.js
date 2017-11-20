'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _propTypes = require('prop-types');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Magnifier = require('./Magnifier');

var _Magnifier2 = _interopRequireDefault(_Magnifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOffset(el) {
  var x = 0;
  var y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { x: x, y: y };
}

var ImageMagnifier = _react2.default.createClass({
  displayName: 'ImageMagnifier',

  propTypes: {
    size: _propTypes.number, // size of the magnifier window
    cursorOffset: _propTypes.shape({
      x: _propTypes.number.isRequired,
      y: _propTypes.number.isRequired
    }), // offset of the zoom bubble from the cursor
    src: _propTypes.string.isRequired, // URL of the image
    height: _propTypes.oneOfType([_propTypes.number, _propTypes.string]), // size of the non-zoomed-in image
    width: _propTypes.oneOfType([_propTypes.number, _propTypes.string]), // size of the non-zoomed-in image
    zoomImage: _propTypes.shape({
      height: _propTypes.number.isRequired,
      width: _propTypes.number.isRequired
    }), // size of the zoomed-in image
    style: _propTypes.object
  },

  portalElement: null,

  getDefaultProps: function getDefaultProps() {
    return {
      size: 200,
      cursorOffset: { x: 0, y: 0 },
      height: "auto",
      width: "100%"
    };
  },
  getInitialState: function getInitialState() {
    return {
      x: 0,
      y: 0,
      offsetX: -1,
      offsetY: -1
    };
  },
  componentDidMount: function componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    if (!this.portalElement) {
      this.portalElement = document.createElement('div');
      document.body.appendChild(this.portalElement);
    }
    this.componentDidUpdate();
  },
  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.body.removeChild(this.portalElement);
    this.portalElement = null;
  },
  onMouseMove: function onMouseMove(e) {
    var offset = getOffset(this.img);
    this.setState({
      x: e.x + window.pageXOffset,
      y: e.y + window.pageYOffset,
      offsetX: e.x - offset.x,
      offsetY: e.y - offset.y
    });
  },
  componentDidUpdate: function componentDidUpdate() {
    _reactDom2.default.render(_react2.default.createElement(_Magnifier2.default, {
      cursorOffset: this.props.cursorOffset,
      offsetX: this.state.offsetX,
      offsetY: this.state.offsetY,
      size: this.props.size,
      smallImage: {
        height: this.img.clientHeight,
        width: this.img.clientWidth
      },
      src: this.props.src,
      x: this.state.x,
      y: this.state.y,
      zoomImage: this.props.zoomImage
    }), this.portalElement);
  },
  render: function render() {
    var _this = this;

    return _react2.default.createElement('img', {
      ref: function ref(node) {
        return _this.img = node;
      },
      src: this.props.src,
      style: Object.assign({
        height: this.props.height,
        width: this.props.width
      }, this.props.style)
    });
  }
});

exports.default = ImageMagnifier;
module.exports = exports['default'];
