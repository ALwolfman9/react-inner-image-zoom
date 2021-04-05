import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

var Image = function Image(_ref) {
  var src = _ref.src,
      srcSet = _ref.srcSet,
      sizes = _ref.sizes,
      sources = _ref.sources,
      width = _ref.width,
      height = _ref.height,
      hasSpacer = _ref.hasSpacer,
      alt = _ref.alt,
      isZoomed = _ref.isZoomed,
      fadeDuration = _ref.fadeDuration;
  var createSpacer = width && height && hasSpacer;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: createSpacer ? height / width * 100 + "%" : null
    }
  }, sources && sources.length > 0 ? /*#__PURE__*/React.createElement("picture", null, sources.map(function (source, i) {
    return /*#__PURE__*/React.createElement(Fragment, {
      key: i
    }, source.srcSet && /*#__PURE__*/React.createElement("source", {
      srcSet: source.srcSet,
      sizes: source.sizes,
      media: source.media,
      type: source.type
    }));
  }), /*#__PURE__*/React.createElement("img", {
    className: "iiz__img " + (isZoomed ? 'iiz__img--hidden' : '') + " " + (createSpacer ? 'iiz__img--abs' : ''),
    style: {
      transition: "linear 0ms opacity " + (isZoomed ? fadeDuration : 0) + "ms, linear " + fadeDuration + "ms visibility " + (isZoomed ? fadeDuration : 0) + "ms"
    },
    src: src,
    srcSet: srcSet,
    sizes: sizes,
    width: width,
    height: height,
    alt: alt
  })) : /*#__PURE__*/React.createElement("img", {
    className: "iiz__img " + (isZoomed ? 'iiz__img--hidden' : '') + " " + (createSpacer ? 'iiz__img--abs' : ''),
    style: {
      transition: "linear 0ms opacity " + (isZoomed ? fadeDuration : 0) + "ms, linear " + fadeDuration + "ms visibility " + (isZoomed ? fadeDuration : 0) + "ms"
    },
    src: src,
    srcSet: srcSet,
    sizes: sizes,
    width: width,
    height: height,
    alt: alt
  }));
};

Image.propTypes = process.env.NODE_ENV !== "production" ? {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  sources: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  hasSpacer: PropTypes.bool,
  alt: PropTypes.string,
  fadeDuration: PropTypes.number,
  isZoomed: PropTypes.bool
} : {};
export default Image;