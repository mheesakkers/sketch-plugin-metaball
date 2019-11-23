var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bezierTangents.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Circle.js":
/*!***********************!*\
  !*** ./src/Circle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Circle; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vendor_Vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor/Vector.js */ "./src/vendor/Vector.js");
/* harmony import */ var _helpers_hexToRgba_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/hexToRgba.js */ "./src/helpers/hexToRgba.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Circle =
/*#__PURE__*/
function () {
  function Circle(context) {
    _classCallCheck(this, Circle);

    // Stats
    this.context = context;
    this.position = new _vendor_Vector_js__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
    this.radius = 0;
    this.style = {}; // Tangents

    this.direction;
    this.midpoint;
    this.tangentPointOne;
    this.tangentPointOneOpposite;
    this.tangentPointTwo;
    this.tangentPointTwoOpposite;
    this.outerTangentPointOne;
    this.outerTangentPointOneOpposite;
    this.outerTangentPointTwo;
    this.outerTangentPointTwoOpposite; // Helpers / Guides

    this.helperPointOne;
    this.helperPointTwo;
    this.helperPointThree;
    this.helperPointFour;
  }

  _createClass(Circle, [{
    key: "calculateTangents",
    value: function calculateTangents(other) {
      this.direction = other.position.subtract(this.position); // Midpoint Circle

      var radiusMidpoint = this.direction.length() * 0.5;
      this.midpoint = new _vendor_Vector_js__WEBPACK_IMPORTED_MODULE_1__["default"]((this.position.x + other.position.x) * 0.5, (this.position.y + other.position.y) * 0.5); // ellipse(parent, 'MidpointRadius', this.midpoint, '#F2CFDA', radiusMidpoint * 2)

      var radiiOneAndTwo = this.radius + other.radius;
      this.helperPointOne = this._getHelperPoint(radiiOneAndTwo, radiusMidpoint, this.position, this.direction, false); // INNER TANGENT POINT ONE //

      var helperVectorT1 = this.helperPointOne.subtract(this.position);
      helperVectorT1 = helperVectorT1.unit();
      helperVectorT1 = helperVectorT1.multiply(this.radius);
      this.tangentPointOne = this.position.add(helperVectorT1); // Parallel line One

      var parallelVectorOne = other.position.subtract(this.helperPointOne);
      this.tangentPointOneOpposite = this.tangentPointOne.add(parallelVectorOne); // HELPER POINT TWO //

      this.helperPointTwo = this._getHelperPoint(radiiOneAndTwo, radiusMidpoint, this.position, this.direction, true); // INNER TANGENT POINT TWO //

      var helperVectorT2 = this.helperPointTwo.subtract(this.position);
      helperVectorT2 = helperVectorT2.unit();
      helperVectorT2 = helperVectorT2.multiply(this.radius);
      this.tangentPointTwo = this.position.add(helperVectorT2); // Parallel line Two

      var parallelVectorTwo = other.position.subtract(this.helperPointTwo);
      this.tangentPointTwoOpposite = this.tangentPointTwo.add(parallelVectorTwo); // *** OUTER TANGENTS *** //
      // only works when r1 >= r2

      if (this.radius > other.radius) {
        var subtractedRadii = this.radius - other.radius;
        this.helperPointThree = this._getHelperPoint(subtractedRadii, radiusMidpoint, this.position, this.direction, false); // OUTER TANGENT POINT ONE

        var helperVectorOT1 = this.helperPointThree.subtract(this.position);
        helperVectorOT1 = helperVectorOT1.unit();
        helperVectorOT1 = helperVectorOT1.multiply(this.radius);
        this.outerTangentPointOne = this.position.add(helperVectorOT1); // Parallel line Outer Tangent Two

        var parallelVectorOT1 = other.position.subtract(this.helperPointThree);
        this.outerTangentPointOneOpposite = this.outerTangentPointOne.add(parallelVectorOT1); // OUTER TANGENT POINT TWO

        this.helperPointFour = this._getHelperPoint(subtractedRadii, radiusMidpoint, this.position, this.direction, true);
        var helperVectorOT2 = this.helperPointFour.subtract(this.position);
        helperVectorOT2 = helperVectorOT2.unit();
        helperVectorOT2 = helperVectorOT2.multiply(this.radius);
        this.outerTangentPointTwo = this.position.add(helperVectorOT2); // Parallel line Outer Tangent Two

        var parallelVectorOT2 = other.position.subtract(this.helperPointFour);
        this.outerTangentPointTwoOpposite = this.outerTangentPointTwo.add(parallelVectorOT2);
      } else {
        other.calculateTangents(this);
        this.outerTangentPointOne = other.outerTangentPointOneOpposite;
        this.outerTangentPointOneOpposite = other.outerTangentPointOne;
        this.outerTangentPointTwo = other.outerTangentPointTwoOpposite;
        this.outerTangentPointTwoOpposite = other.outerTangentPointTwo;
      }
    } // HELPER FUNCTIONS

  }, {
    key: "_getHelperPoint",
    value: function _getHelperPoint(currentRadius, otherRadius, position, direction, positive) {
      // Find angle to rotate V1 (found by The Law of Cosine)
      var angleTowardsHelperPoint = Math.acos((Math.pow(currentRadius, 2) + Math.pow(otherRadius, 2) - Math.pow(otherRadius, 2)) / (2 * currentRadius * otherRadius));
      angleTowardsHelperPoint = positive ? angleTowardsHelperPoint : -angleTowardsHelperPoint;
      var angle = Math.atan2(direction.y, direction.x) + angleTowardsHelperPoint;
      return new _vendor_Vector_js__WEBPACK_IMPORTED_MODULE_1__["default"](position.x + currentRadius * Math.cos(angle), position.y + currentRadius * Math.sin(angle));
    } // DRAWING FUNCTIONS

  }, {
    key: "drawHelpers",
    value: function drawHelpers(parent) {
      // Anchor
      ellipse(parent, 'Anchor', this.position, '#00FF00'); // Helper dots

      ellipse(parent, 'Midpoint', this.midpoint, '#00FF00');
      ellipse(parent, 'helperPointOne', this.helperPointOne, '#00FFFF');
      ellipse(parent, 'helperPointTwo', this.helperPointTwo, '#00FFFF');
      ellipse(parent, 'helperPointThree', this.helperPointThree, '#00FFFF');
      ellipse(parent, 'helperPointFour', this.helperPointFour, '#00FFFF'); // Inner tangents

      line(this.context, this.tangentPointOne, this.tangentPointOneOpposite);
      line(this.context, this.tangentPointTwo, this.tangentPointTwoOpposite); // Outer tangents

      line(this.context, this.outerTangentPointOne, this.outerTangentPointOneOpposite);
      line(this.context, this.outerTangentPointTwo, this.outerTangentPointTwoOpposite);
    }
  }, {
    key: "drawInnerTangents",
    value: function drawInnerTangents(context) {
      // All coordinates are provided in pixels
      var path = NSBezierPath.bezierPath();
      path.moveToPoint(NSMakePoint(this.tangentPointOne.x, this.tangentPointOne.y));
      path.lineToPoint(NSMakePoint(this.tangentPointOneOpposite.x, this.tangentPointOneOpposite.y));
      path.lineToPoint(NSMakePoint(this.tangentPointTwoOpposite.x, this.tangentPointTwoOpposite.y));
      path.lineToPoint(NSMakePoint(this.tangentPointTwo.x, this.tangentPointTwo.y));
      path.closePath();
      var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // Add fill

      var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created

      fill.color = MSColor.colorWithRGBADictionary(Object(_helpers_hexToRgba_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.style.fills[0].color));
      getCurrentParent(context).addLayers([shape]);
    }
  }, {
    key: "drawOuterTangents",
    value: function drawOuterTangents(context) {
      // All coordinates are provided in pixels
      var path = NSBezierPath.bezierPath();
      path.moveToPoint(NSMakePoint(this.outerTangentPointOne.x, this.outerTangentPointOne.y));
      path.lineToPoint(NSMakePoint(this.outerTangentPointOneOpposite.x, this.outerTangentPointOneOpposite.y));
      path.lineToPoint(NSMakePoint(this.outerTangentPointTwoOpposite.x, this.outerTangentPointTwoOpposite.y));
      path.lineToPoint(NSMakePoint(this.outerTangentPointTwo.x, this.outerTangentPointTwo.y));
      path.closePath();
      var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // Add fill

      var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created

      fill.color = MSColor.colorWithRGBADictionary(Object(_helpers_hexToRgba_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.style.fills[0].color));
      getCurrentParent(context).addLayers([shape]);
    }
  }]);

  return Circle;
}(); // DRAWING HELPERS FUNCTIONS




function ellipse(parent, name, position, color) {
  var diameter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 8;
  var anchor = new sketch__WEBPACK_IMPORTED_MODULE_0__["ShapePath"]({
    name: name,
    shapeType: sketch__WEBPACK_IMPORTED_MODULE_0__["ShapePath"].ShapeType.Oval,
    frame: {
      x: position.x - diameter * 0.5,
      y: position.y - diameter * 0.5,
      width: diameter,
      height: diameter
    },
    style: {
      borders: [{
        enabled: false
      }],
      fills: [color]
    },
    parent: parent
  });
}

function line(context, start, end) {
  // All coordinates are provided in pixels
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(start.x, start.y));
  path.lineToPoint(NSMakePoint(end.x, end.y));
  path.closePath();
  var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created
  // fill.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 1});

  var border = shape.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary({
    r: 0.0,
    g: 1.0,
    b: 1.0,
    a: 1.0
  });
  border.thickness = 1;
  getCurrentParent(context).addLayers([shape]);
} // Only for old API use


function getCurrentParent(context) {
  var documentData = context.document.documentData();
  return documentData.currentPage().currentArtboard() || documentData.currentPage();
}

/***/ }),

/***/ "./src/Metaball.js":
/*!*************************!*\
  !*** ./src/Metaball.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Metaball; });
/* harmony import */ var _Circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Circle.js */ "./src/Circle.js");
/* harmony import */ var _vendor_Vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor/Vector.js */ "./src/vendor/Vector.js");
/* harmony import */ var _helpers_hexToRgba_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/hexToRgba.js */ "./src/helpers/hexToRgba.js");
/* harmony import */ var _helpers_rotateVector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/rotateVector.js */ "./src/helpers/rotateVector.js");
/* harmony import */ var _helpers_getDistance_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/getDistance.js */ "./src/helpers/getDistance.js");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_5__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var Metaball =
/*#__PURE__*/
function () {
  function Metaball(context) {
    _classCallCheck(this, Metaball);

    this.context = context;
    this.circleOne = null;
    this.circleTwo = null;
    this.tpoints = [];
  }

  _createClass(Metaball, [{
    key: "createCircleBasedOnOvalLayer",
    value: function createCircleBasedOnOvalLayer(layer) {
      var c = new _Circle_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.context); // Set values

      c.radius = layer.frame.width * 0.5;
      c.position.x = layer.frame.x + c.radius;
      c.position.y = layer.frame.y + c.radius;
      c.style = layer.style;
      return c;
    }
  }, {
    key: "drawInnerTangents",
    value: function drawInnerTangents(context) {
      this.initTangentPoints();
      var path = NSBezierPath.bezierPath();
      path.moveToPoint(NSMakePoint(this.tpoints[0].x, this.tpoints[0].y));
      path.lineToPoint(NSMakePoint(this.tpoints[2].x, this.tpoints[2].y));
      path.lineToPoint(NSMakePoint(this.tpoints[3].x, this.tpoints[3].y));
      path.lineToPoint(NSMakePoint(this.tpoints[1].x, this.tpoints[1].y));
      path.closePath();
      var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
      var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created

      fill.color = MSColor.colorWithRGBADictionary(Object(_helpers_hexToRgba_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.circleOne.style.fills[0].color));
      getCurrentParent(context).addLayers([shape]);
      this.circleTwo.style = this.circleOne.style;
    }
  }, {
    key: "initTangentPoints",
    value: function initTangentPoints() {
      // First make sure the tangents are calculated
      this.circleOne.calculateTangents(this.circleTwo);
      this.circleTwo.calculateTangents(this.circleOne); // Make an easier / shorter reference to those

      this.tpoints[0] = this.circleOne.tangentPointOne;
      this.tpoints[1] = this.circleOne.tangentPointTwo;
      this.tpoints[2] = this.circleTwo.tangentPointOne;
      this.tpoints[3] = this.circleTwo.tangentPointTwo;
    }
  }, {
    key: "drawBezierTangentLines",
    value: function drawBezierTangentLines(context, offsetPercentage, bezierOffsetPercentage) {
      this.initTangentPoints();
      var distance = Object(_helpers_getDistance_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.circleOne.position.x, this.circleOne.position.y, this.circleTwo.position.x, this.circleTwo.position.y) - this.circleOne.radius - this.circleTwo.radius;
      var direction = this.circleTwo.position.subtract(this.circleOne.position);

      var intersection = this._getIntersectionPointOfTangentLines();

      var intersectionOne = intersection.clone();
      var intersectionTwo = intersection.clone(); // Calculate offset intersection point

      var offsetVector = direction.clone();
      var offset = distance * 0.5 * offsetPercentage;
      offsetVector = offsetVector.unit();
      offsetVector = Object(_helpers_rotateVector_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetVector, 90);
      offsetVector = offsetVector.multiply(offset);
      intersectionOne = intersectionOne.subtract(offsetVector);
      intersectionTwo = intersectionTwo.add(offsetVector); // const parent = context.document.currentPage().currentArtboard() || context.document.currentPage()
      // ellipse(parent, 'intersectionOne', intersectionOne, '#FF0000', 2)
      // ellipse(parent, 'intersectionTwo', intersectionTwo, '#FF0000', 2)
      // Calculate Control Points

      var bezierOffsetVector = direction.clone();
      var bezierOffset = distance * 0.5 * bezierOffsetPercentage;
      bezierOffsetVector = bezierOffsetVector.unit();
      bezierOffsetVector = bezierOffsetVector.multiply(bezierOffset);
      var cp1 = intersectionOne.subtract(bezierOffsetVector);
      var cp2 = intersectionOne.add(bezierOffsetVector); // ellipse(parent, 'cp1', cp1, '#FFFF00', 2)
      // ellipse(parent, 'cp2', cp2, '#FFFF00', 2)

      var cp3 = intersectionTwo.subtract(bezierOffsetVector);
      var cp4 = intersectionTwo.add(bezierOffsetVector); // ellipse(parent, 'cp3', cp3, '#FFFF00', 2)
      // ellipse(parent, 'cp4', cp4, '#FFFF00', 2)
      // Draw

      var path = NSBezierPath.bezierPath();
      path.moveToPoint(NSMakePoint(this.tpoints[0].x, this.tpoints[0].y));
      path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(intersectionTwo.x, intersectionTwo.y), NSMakePoint(this.tpoints[0].x, this.tpoints[0].y), NSMakePoint(cp3.x, cp3.y));
      path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(this.tpoints[3].x, this.tpoints[3].y), NSMakePoint(cp4.x, cp4.y), NSMakePoint(this.tpoints[3].x, this.tpoints[3].y));
      path.lineToPoint(NSMakePoint(this.tpoints[2].x, this.tpoints[2].y));
      path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(intersectionOne.x, intersectionOne.y), NSMakePoint(this.tpoints[2].x, this.tpoints[2].y), NSMakePoint(cp2.x, cp2.y));
      path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(this.tpoints[1].x, this.tpoints[1].y), NSMakePoint(cp1.x, cp1.y), NSMakePoint(this.tpoints[1].x, this.tpoints[1].y));
      path.closePath();
      var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
      var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created

      fill.color = MSColor.colorWithRGBADictionary(Object(_helpers_hexToRgba_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.circleOne.style.fills[0].color));
      getCurrentParent(context).addLayers([shape]);
    }
  }, {
    key: "_getIntersectionPointOfTangentLines",
    value: function _getIntersectionPointOfTangentLines() {
      var x1 = this.tpoints[0].x;
      var x2 = this.tpoints[2].x;
      var x3 = this.tpoints[1].x;
      var x4 = this.tpoints[3].x;
      var y1 = this.tpoints[0].y;
      var y2 = this.tpoints[2].y;
      var y3 = this.tpoints[1].y;
      var y4 = this.tpoints[3].y;
      var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
      var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
      return new _vendor_Vector_js__WEBPACK_IMPORTED_MODULE_1__["default"](x, y);
    }
  }]);

  return Metaball;
}(); // Only for old API use




function getCurrentParent(context) {
  var documentData = context.document.documentData();
  return documentData.currentPage().currentArtboard() || documentData.currentPage();
} // DRAWING HELPERS FUNCTIONS


function ellipse(parent, name, position, color) {
  var diameter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 8;
  var anchor = new sketch__WEBPACK_IMPORTED_MODULE_5__["ShapePath"]({
    name: name,
    shapeType: sketch__WEBPACK_IMPORTED_MODULE_5__["ShapePath"].ShapeType.Oval,
    frame: {
      x: position.x - diameter * 0.5,
      y: position.y - diameter * 0.5,
      width: diameter,
      height: diameter
    },
    style: {
      borders: [{
        enabled: false
      }],
      fills: [color]
    },
    parent: parent
  });
}

/***/ }),

/***/ "./src/bezierTangents.js":
/*!*******************************!*\
  !*** ./src/bezierTangents.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return bezierTangents; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getFilteredSelection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getFilteredSelection */ "./src/getFilteredSelection.js");
/* harmony import */ var _getMetaball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getMetaball */ "./src/getMetaball.js");
// Variation where the inner tangents gets drawn with bezierCurves



function bezierTangents(context) {
  var ovals = Object(_getFilteredSelection__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var metaball = Object(_getMetaball__WEBPACK_IMPORTED_MODULE_2__["default"])(context, ovals); // USER INPUT

  sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].getInputFromUser("Define intersection offset", {
    type: sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].INPUT_TYPE.slider,
    min: 0.05,
    max: 1.0,
    icon: "Icon_Arc.png"
  }, function (err, intersectionOffset) {
    if (err) {
      return;
    }

    if (intersectionOffset) {
      sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].getInputFromUser("Define bezier length", {
        type: sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].INPUT_TYPE.slider,
        min: 0.05,
        max: 1.0,
        icon: "Icon_Arc.png"
      }, function (err, bezierOffset) {
        if (err) {
          // most likely the user canceled the input
          return;
        }

        if (bezierOffset) {
          metaball.drawBezierTangentLines(context, intersectionOffset, bezierOffset);
        }
      });
    }
  });
}

/***/ }),

/***/ "./src/getFilteredSelection.js":
/*!*************************************!*\
  !*** ./src/getFilteredSelection.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getFilteredSelection; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

function getFilteredSelection() {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0__["Document"].getSelectedDocument();
  var selection = document.selectedLayers;
  var ovals = [];

  if (!selection.isEmpty) {
    selection.layers.forEach(function (layer) {
      if (layer.type == 'ShapePath') {
        if (layer.shapeType === 'Oval') {
          // Check if width and height match
          if (layer.frame.width === layer.frame.height) {
            ovals.push(layer);
          } else {
            sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].message("It appears one of the ovals isn't a true circle. Width and heigh don't match");
          }
        } else {
          sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].message("This plugin works only with two Oval layers");
        }
      } else {
        sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].message("This plugin works only with two Ovals");
      }
    });
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].message("Try to select two Ovals");
  }

  return ovals;
} // TO DO:
//  - Arc / Beziers
// 	- Interface
//  - Further clean up
//  - Icon

/***/ }),

/***/ "./src/getMetaball.js":
/*!****************************!*\
  !*** ./src/getMetaball.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMetaball; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Metaball_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Metaball.js */ "./src/Metaball.js");


function getMetaball(context, ovalLayers) {
  var metaball = new _Metaball_js__WEBPACK_IMPORTED_MODULE_1__["default"](context);

  if (ovalLayers.length > 1) {
    metaball.circleOne = metaball.createCircleBasedOnOvalLayer(ovalLayers[0]);
    metaball.circleTwo = metaball.createCircleBasedOnOvalLayer(ovalLayers[1]);
    metaball.circleOne.calculateTangents(metaball.circleTwo);
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].message("Try to select two ovals");
  }

  return metaball;
}

/***/ }),

/***/ "./src/helpers/getDistance.js":
/*!************************************!*\
  !*** ./src/helpers/getDistance.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDistance; });
function getDistance(x1, y1, x2, y2) {
  var xs = x2 - x1;
  var ys = y2 - y1;
  xs *= xs;
  ys *= ys;
  return Math.sqrt(xs + ys);
}

/***/ }),

/***/ "./src/helpers/hexToRgba.js":
/*!**********************************!*\
  !*** ./src/helpers/hexToRgba.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return hexToRGB; });
function hexToRGB(hex) {
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;
  var red = parseInt(hex.slice(1, 3), 16) / 255,
      green = parseInt(hex.slice(3, 5), 16) / 255,
      blue = parseInt(hex.slice(5, 7), 16) / 255;
  return {
    r: red,
    g: green,
    b: blue,
    a: alpha
  };
}

/***/ }),

/***/ "./src/helpers/rotateVector.js":
/*!*************************************!*\
  !*** ./src/helpers/rotateVector.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rotateVector; });
/* harmony import */ var _vendor_Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vendor/Vector.js */ "./src/vendor/Vector.js");

function rotateVector(vector, angle) {
  angle = -angle * (Math.PI / 180);
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return new _vendor_Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](vector.x * cos - vector.y * sin, vector.x * sin + vector.y * cos, vector.z);
}

/***/ }),

/***/ "./src/vendor/Vector.js":
/*!******************************!*\
  !*** ./src/vendor/Vector.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vector; });
// VECTOR LIBRARY //
// Source: https://evanw.github.io/lightgl.js/docs/vector.html
function Vector(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}
Vector.prototype = {
  negative: function negative() {
    return new Vector(-this.x, -this.y, -this.z);
  },
  add: function add(v) {
    if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);else return new Vector(this.x + v, this.y + v, this.z + v);
  },
  subtract: function subtract(v) {
    if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);else return new Vector(this.x - v, this.y - v, this.z - v);
  },
  multiply: function multiply(v) {
    if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);else return new Vector(this.x * v, this.y * v, this.z * v);
  },
  divide: function divide(v) {
    if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);else return new Vector(this.x / v, this.y / v, this.z / v);
  },
  equals: function equals(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  },
  dot: function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  cross: function cross(v) {
    return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
  },
  length: function length() {
    return Math.sqrt(this.dot(this));
  },
  unit: function unit() {
    return this.divide(this.length());
  },
  min: function min() {
    return Math.min(Math.min(this.x, this.y), this.z);
  },
  max: function max() {
    return Math.max(Math.max(this.x, this.y), this.z);
  },
  toAngles: function toAngles() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  },
  angleTo: function angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toArray: function toArray(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  },
  clone: function clone() {
    return new Vector(this.x, this.y, this.z);
  },
  init: function init(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
};

Vector.negative = function (a, b) {
  b.x = -a.x;
  b.y = -a.y;
  b.z = -a.z;
  return b;
};

Vector.add = function (a, b, c) {
  if (b instanceof Vector) {
    c.x = a.x + b.x;
    c.y = a.y + b.y;
    c.z = a.z + b.z;
  } else {
    c.x = a.x + b;
    c.y = a.y + b;
    c.z = a.z + b;
  }

  return c;
};

Vector.subtract = function (a, b, c) {
  if (b instanceof Vector) {
    c.x = a.x - b.x;
    c.y = a.y - b.y;
    c.z = a.z - b.z;
  } else {
    c.x = a.x - b;
    c.y = a.y - b;
    c.z = a.z - b;
  }

  return c;
};

Vector.multiply = function (a, b, c) {
  if (b instanceof Vector) {
    c.x = a.x * b.x;
    c.y = a.y * b.y;
    c.z = a.z * b.z;
  } else {
    c.x = a.x * b;
    c.y = a.y * b;
    c.z = a.z * b;
  }

  return c;
};

Vector.divide = function (a, b, c) {
  if (b instanceof Vector) {
    c.x = a.x / b.x;
    c.y = a.y / b.y;
    c.z = a.z / b.z;
  } else {
    c.x = a.x / b;
    c.y = a.y / b;
    c.z = a.z / b;
  }

  return c;
};

Vector.cross = function (a, b, c) {
  c.x = a.y * b.z - a.z * b.y;
  c.y = a.z * b.x - a.x * b.z;
  c.z = a.x * b.y - a.y * b.x;
  return c;
};

Vector.unit = function (a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  b.z = a.z / length;
  return b;
};

Vector.fromAngles = function (theta, phi) {
  return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};

Vector.randomDirection = function () {
  return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};

Vector.min = function (a, b) {
  return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};

Vector.max = function (a, b) {
  return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};

Vector.lerp = function (a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};

Vector.fromArray = function (a) {
  return new Vector(a[0], a[1], a[2]);
};

Vector.angleBetween = function (a, b) {
  return a.angleTo(b);
};

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__bezierTangents.js.map