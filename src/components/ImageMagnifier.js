import React from "react";
import PropTypes from "prop-types";
import Magnifier from "./Magnifier";

export class ImageMagnifier extends React.Component {
  static defaultProps = {
    size: 200,
    cursorOffset: {
      left: 0,
      top: 0,
    },
    height: "auto",
    width: "100%",
    zoomImage: null,
    style: {},
  };
  state = {
    magnify: false,
    x: 0,
    y: 0,
  };

  componentDidMount() {
    if (this.container) {
      this.container.addEventListener("mouseenter", this.onMouseEnter);
      this.container.addEventListener("mouseleave", this.onMouseLeave);
      this.container.addEventListener("mousemove", this.onMouseMove);
    }
  }

  componentWillUnmount() {
    if (this.container) {
      this.container.removeEventListener("mouseenter", this.onMouseEnter);
      this.container.removeEventListener("mouseleave", this.onMouseLeave);
      this.container.removeEventListener("mousemove", this.onMouseMove);
    }
  }

  onMouseEnter = () =>
    this.setState({
      magnify: true,
    });
  onMouseLeave = () =>
    this.setState({
      magnify: false,
    });
  onMouseMove = (e: SyntheticMouseEvent<*>) => {
    if (this.img) {
      const box = this.img.getBoundingClientRect();
      this.setState({
        x: e.clientX - box.left + this.props.cursorOffset.left,
        y: e.clientY - box.top + this.props.cursorOffset.top,
      });
    }
  };

  zoomRatio = () => {
    const image = new Image();
    image.src = this.props.src;
    return {
      x:
        ((this.props.zoomImage && this.props.zoomImage.width) || image.width) /
        this.img.clientWidth,
      y:
        ((this.props.zoomImage && this.props.zoomImage.height) ||
          image.height) / this.img.clientHeight,
    };
  };

  renderMagnifier = () => {
    if (this.img) {
      const ratios = this.zoomRatio();
      return (
        <Magnifier
          size={this.props.size}
          src={this.props.src}
          x={this.state.x}
          y={this.state.y}
          zoomRatio={ratios}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <div
        id="ImageMagnifier"
        ref={node => (this.container = node)}
        style={{
          cursor: "none",
          position: "relative",
        }}
      >
        {this.state.magnify && this.renderMagnifier()}{" "}
        <img
          ref={img => (this.img = img)}
          src={this.props.src}
          style={{
            height: this.props.height,
            width: this.props.width,
            ...this.props.style,
          }}
        />{" "}
      </div>
    );
  }
}

ImageMagnifier.propTypes = {
  src: PropTypes.string.isRequired, // URL of the image
  size: PropTypes.number, // size of the magnifier window
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // size of the non-zoomed-in image
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // size of the non-zoomed-in image
  cursorOffset: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }), // offset of the zoom bubble from the cursor
  zoomImage: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }), // size of the zoomed-in image
  style: PropTypes.shape({}),
};

export default ImageMagnifier;
