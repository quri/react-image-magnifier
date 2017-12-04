import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export const Magnifier = props => {
  const bgX = (props.x * props.zoomRatio.x - props.size / 2) * -1;
  const bgY = (props.y * props.zoomRatio.y - props.size / 2) * -1;

  return ReactDOM.createPortal(
    <div
      style={{
        cursor: "none",
        position: "absolute",
        display: "block",
        borderRadius: "100%",
        boxShadow: `
            0 0 0 4px rgba(255, 255, 255, 1),
            0 0 7px 7px rgba(0, 0, 0, 0.25),
            inset 0 0 40px 2px rgba(0, 0, 0, 0.25)
          `,
        left: props.x,
        top: props.y,
        marginLeft: props.size / 2 * -1,
        marginTop: props.size / 2 * -1,
        width: props.size,
        height: props.size,
        background: `url(${props.src}) no-repeat`,
        backgroundPosition: `${bgX}px ${bgY}px`,
      }}
    />,
    document.getElementById("ImageMagnifier"),
  );
};

Magnifier.propTypes = {
  size: PropTypes.number.isRequired, // size of the magnifier window
  src: PropTypes.string.isRequired, // URL of the image
  x: PropTypes.number.isRequired, // x position
  y: PropTypes.number.isRequired, // y position
  zoomRatio: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }, // zoom ratio
};

export default Magnifier;
