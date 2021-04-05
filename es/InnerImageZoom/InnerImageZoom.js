var _this = this;

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Image from './components/Image';
import ZoomImage from './components/ZoomImage';
import FullscreenPortal from './components/FullscreenPortal';

var InnerImageZoom = function InnerImageZoom(_ref) {
  var _ref$moveType = _ref.moveType,
      moveType = _ref$moveType === void 0 ? 'pan' : _ref$moveType,
      _ref$zoomType = _ref.zoomType,
      zoomType = _ref$zoomType === void 0 ? 'click' : _ref$zoomType,
      src = _ref.src,
      srcSet = _ref.srcSet,
      sizes = _ref.sizes,
      sources = _ref.sources,
      width = _ref.width,
      height = _ref.height,
      hasSpacer = _ref.hasSpacer,
      zoomSrc = _ref.zoomSrc,
      _ref$zoomScale = _ref.zoomScale,
      zoomScale = _ref$zoomScale === void 0 ? 1 : _ref$zoomScale,
      zoomPreload = _ref.zoomPreload,
      alt = _ref.alt,
      _ref$fadeDuration = _ref.fadeDuration,
      fadeDuration = _ref$fadeDuration === void 0 ? 150 : _ref$fadeDuration,
      fullscreenOnMobile = _ref.fullscreenOnMobile,
      _ref$mobileBreakpoint = _ref.mobileBreakpoint,
      mobileBreakpoint = _ref$mobileBreakpoint === void 0 ? 640 : _ref$mobileBreakpoint,
      hideCloseButton = _ref.hideCloseButton,
      hideHint = _ref.hideHint,
      className = _ref.className,
      afterZoomIn = _ref.afterZoomIn,
      afterZoomOut = _ref.afterZoomOut,
      _ref$zoomTypeTarget = _ref.zoomTypeTarget,
      zoomTypeTarget = _ref$zoomTypeTarget === void 0 ? 'image' : _ref$zoomTypeTarget;
  var img = useRef(null);
  var zoomImg = useRef(null);
  var imgProps = useRef({});

  var _useState = useState(zoomPreload),
      isActive = _useState[0],
      setIsActive = _useState[1];

  var _useState2 = useState(false),
      isTouch = _useState2[0],
      setIsTouch = _useState2[1];

  var _useState3 = useState(false),
      isZoomed = _useState3[0],
      setIsZoomed = _useState3[1];

  var _useState4 = useState(false),
      isFullscreen = _useState4[0],
      setIsFullscreen = _useState4[1];

  var _useState5 = useState(false),
      isDragging = _useState5[0],
      setIsDragging = _useState5[1];

  var _useState6 = useState(false),
      isValidDrag = _useState6[0],
      setIsValidDrag = _useState6[1];

  var _useState7 = useState(moveType),
      currentMoveType = _useState7[0],
      setCurrentMoveType = _useState7[1];

  var _useState8 = useState(0),
      left = _useState8[0],
      setLeft = _useState8[1];

  var _useState9 = useState(0),
      top = _useState9[0],
      setTop = _useState9[1];

  var handleMouseEnter = function handleMouseEnter(e) {
    setIsActive(true);
    zoomType === 'hover' && !isZoomed && handleClick(e);
  };

  var handleTouchStart = function handleTouchStart() {
    setIsTouch(true);
    setIsFullscreen(getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint));
    setCurrentMoveType('drag');
  };

  var handleClick = function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();

    if (isZoomed) {
      if (isTouch) {
        hideCloseButton && handleClose();
      } else {
        !isValidDrag && zoomOut();
      }

      return;
    }

    isTouch && setIsActive(true);

    if (zoomImg.current) {
      handleLoad({
        target: zoomImg.current
      });
      zoomIn(e.pageX, e.pageY);
    } else {
      imgProps.current.onLoadCallback = zoomIn.bind(_this, e.pageX, e.pageY);
    }
  };

  var handleLoad = function handleLoad(e) {
    zoomImg.current = e.target;
    zoomImg.current.setAttribute('width', zoomImg.current.naturalWidth * zoomScale);
    zoomImg.current.setAttribute('height', zoomImg.current.naturalHeight * zoomScale);
    imgProps.current.bounds = getBounds(img.current, false);
    imgProps.current.ratios = getRatios(imgProps.current.bounds, zoomImg.current);

    if (imgProps.current.onLoadCallback) {
      imgProps.current.onLoadCallback();
      imgProps.current.onLoadCallback = null;
    }
  };

  var handleMouseMove = function handleMouseMove(e) {
    var left = e.pageX - imgProps.current.offsets.x;
    var top = e.pageY - imgProps.current.offsets.y;
    left = Math.max(Math.min(left, imgProps.current.bounds.width), 0);
    top = Math.max(Math.min(top, imgProps.current.bounds.height), 0);
    setLeft(left * -imgProps.current.ratios.x);
    setTop(top * -imgProps.current.ratios.y);
  };

  var handleDragStart = function handleDragStart(e) {
    imgProps.current.offsets = getOffsets(e.pageX || e.changedTouches[0].pageX, e.pageY || e.changedTouches[0].pageY, zoomImg.current.offsetLeft, zoomImg.current.offsetTop);
    setIsDragging(true);

    if (!isTouch) {
      imgProps.current.eventPosition = {
        x: e.pageX,
        y: e.pageY
      };
    }
  };

  var handleDragMove = useCallback(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var left = (e.pageX || e.changedTouches[0].pageX) - imgProps.current.offsets.x;
    var top = (e.pageY || e.changedTouches[0].pageY) - imgProps.current.offsets.y;
    left = Math.max(Math.min(left, 0), (zoomImg.current.offsetWidth - imgProps.current.bounds.width) * -1);
    top = Math.max(Math.min(top, 0), (zoomImg.current.offsetHeight - imgProps.current.bounds.height) * -1);
    setLeft(left);
    setTop(top);
  }, []);

  var handleDragEnd = function handleDragEnd(e) {
    setIsDragging(false);

    if (!isTouch) {
      var moveX = Math.abs(e.pageX - imgProps.current.eventPosition.x);
      var moveY = Math.abs(e.pageY - imgProps.current.eventPosition.y);
      setIsValidDrag(moveX > 5 || moveY > 5);
    }
  };

  var handleMouseLeave = function handleMouseLeave(e) {
    currentMoveType === 'drag' && isZoomed ? handleDragEnd(e) : handleClose();
  };

  var handleClose = function handleClose() {
    zoomOut(function () {
      setTimeout(function () {
        zoomImg.current = null;
        imgProps.current = getDefaults();
        setIsActive(false);
        setIsTouch(false);
        setIsFullscreen(false);
        setCurrentMoveType(moveType);
      }, fadeDuration);
    });
  };

  var initialMove = function initialMove(pageX, pageY) {
    imgProps.current.offsets = getOffsets(window.pageXOffset, window.pageYOffset, -imgProps.current.bounds.left, -imgProps.current.bounds.top);
    handleMouseMove({
      pageX: pageX,
      pageY: pageY
    });
  };

  var initialDrag = function initialDrag(pageX, pageY) {
    var initialPageX = (pageX - (window.pageXOffset + imgProps.current.bounds.left)) * -imgProps.current.ratios.x;
    var initialPageY = (pageY - (window.pageYOffset + imgProps.current.bounds.top)) * -imgProps.current.ratios.y;
    imgProps.current.bounds = getBounds(img.current, isFullscreen);
    imgProps.current.offsets = getOffsets(0, 0, 0, 0);
    handleDragMove({
      changedTouches: [{
        pageX: initialPageX,
        pageY: initialPageY
      }],
      preventDefault: function preventDefault() {},
      stopPropagation: function stopPropagation() {}
    });
  };

  var zoomIn = function zoomIn(pageX, pageY) {
    setIsZoomed(true);
    currentMoveType === 'drag' ? initialDrag(pageX, pageY) : initialMove(pageX, pageY);
    afterZoomIn && afterZoomIn();
  };

  var zoomOut = function zoomOut(callback) {
    setIsZoomed(false);
    afterZoomOut && afterZoomOut();
    callback && callback();
  };

  var getDefaults = function getDefaults() {
    return {
      onLoadCallback: null,
      bounds: {},
      offsets: {},
      ratios: {},
      eventPosition: {}
    };
  };

  var getBounds = function getBounds(img, isFullscreen) {
    if (isFullscreen) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        left: 0,
        top: 0
      };
    }

    return img.getBoundingClientRect();
  };

  var getOffsets = function getOffsets(pageX, pageY, left, top) {
    return {
      x: pageX - left,
      y: pageY - top
    };
  };

  var getRatios = function getRatios(bounds, zoomImg) {
    return {
      x: (zoomImg.offsetWidth - bounds.width) / bounds.width,
      y: (zoomImg.offsetHeight - bounds.height) / bounds.height
    };
  };

  var getFullscreenStatus = function getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint) {
    return fullscreenOnMobile && window.matchMedia && window.matchMedia("(max-width: " + mobileBreakpoint + "px)").matches;
  };

  var zoomImageProps = {
    src: zoomSrc || src,
    fadeDuration: isFullscreen ? 0 : fadeDuration,
    top: top,
    left: left,
    isZoomed: isZoomed,
    onLoad: handleLoad,
    onDragStart: currentMoveType === 'drag' ? handleDragStart : null,
    onDragEnd: currentMoveType === 'drag' ? handleDragEnd : null,
    onClose: !hideCloseButton && isTouch ? handleClose : null
  };
  useEffect(function () {
    imgProps.current = getDefaults();
  }, []);
  useEffect(function () {
    getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint) && setIsActive(false);
  }, [fullscreenOnMobile, mobileBreakpoint]);
  useEffect(function () {
    if (!zoomImg.current) {
      return;
    }

    var eventType = isTouch ? 'touchmove' : 'mousemove';

    if (isDragging) {
      zoomImg.current.addEventListener(eventType, handleDragMove, {
        passive: false
      });
    } else {
      zoomImg.current.removeEventListener(eventType, handleDragMove);
    }
  }, [isDragging, isTouch, handleDragMove]);
  return /*#__PURE__*/React.createElement("figure", {
    className: "iiz " + (currentMoveType === 'drag' ? 'iiz--drag' : '') + " " + (className ? className : ''),
    style: {
      width: width
    },
    ref: img,
    onTouchStart: isZoomed ? null : handleTouchStart,
    onClick: zoomTypeTarget === 'image' ? handleClick : null,
    onMouseEnter: isTouch ? null : handleMouseEnter,
    onMouseMove: currentMoveType === 'drag' || !isZoomed ? null : handleMouseMove,
    onMouseLeave: isTouch ? null : handleMouseLeave
  }, /*#__PURE__*/React.createElement(Image, {
    src: src,
    srcSet: srcSet,
    sizes: sizes,
    sources: sources,
    width: width,
    height: height,
    hasSpacer: hasSpacer,
    alt: alt,
    fadeDuration: fadeDuration,
    isZoomed: isZoomed
  }), isActive && /*#__PURE__*/React.createElement(Fragment, null, isFullscreen ? /*#__PURE__*/React.createElement(FullscreenPortal, null, /*#__PURE__*/React.createElement(ZoomImage, zoomImageProps)) : /*#__PURE__*/React.createElement(ZoomImage, zoomImageProps)), !hideHint && !isZoomed && /*#__PURE__*/React.createElement("span", {
    className: "iiz__btn iiz__hint",
    onClick: zoomTypeTarget === 'hint' ? handleClick : null
  }));
};

InnerImageZoom.propTypes = process.env.NODE_ENV !== "production" ? {
  moveType: PropTypes.string,
  zoomType: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  sources: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  hasSpacer: PropTypes.bool,
  zoomSrc: PropTypes.string,
  zoomScale: PropTypes.number,
  zoomPreload: PropTypes.bool,
  alt: PropTypes.string,
  fadeDuration: PropTypes.number,
  fullscreenOnMobile: PropTypes.bool,
  mobileBreakpoint: PropTypes.number,
  hideCloseButton: PropTypes.bool,
  hideHint: PropTypes.bool,
  className: PropTypes.string,
  afterZoomIn: PropTypes.func,
  afterZoomOut: PropTypes.func,
  zoomTypeTarget: PropTypes.string
} : {};
export default InnerImageZoom;