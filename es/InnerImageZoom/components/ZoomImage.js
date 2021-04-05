import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

var ZoomImage = function ZoomImage(_ref) {
  var src = _ref.src,
      fadeDuration = _ref.fadeDuration,
      top = _ref.top,
      left = _ref.left,
      isZoomed = _ref.isZoomed,
      onLoad = _ref.onLoad,
      onDragStart = _ref.onDragStart,
      onDragEnd = _ref.onDragEnd,
      onClose = _ref.onClose;
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("img", {
    className: "iiz__zoom-img " + (isZoomed ? 'iiz__zoom-img--visible' : ''),
    style: {
      top: top,
      left: left,
      transition: "linear " + fadeDuration + "ms opacity, linear " + fadeDuration + "ms visibility"
    },
    src: src,
    onLoad: onLoad,
    onTouchStart: onDragStart,
    onTouchEnd: onDragEnd,
    onMouseDown: onDragStart,
    onMouseUp: onDragEnd,
    draggable: "false",
    alt: ""
  }), onClose && /*#__PURE__*/React.createElement("button", {
    className: "iiz__btn iiz__close " + (isZoomed ? 'iiz__close--visible' : ''),
    style: {
      transition: "linear " + fadeDuration + "ms opacity, linear " + fadeDuration + "ms visibility"
    },
    onClick: onClose,
    "aria-label": "Zoom Out"
  }));
};

ZoomImage.propTypes = process.env.NODE_ENV !== "production" ? {
  src: PropTypes.string,
  fadeDuration: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  isZoomed: PropTypes.bool,
  onLoad: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onClose: PropTypes.func
} : {};
export default ZoomImage;