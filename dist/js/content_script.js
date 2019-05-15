/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"content_script": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/content_script.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content_script.ts":
/*!*******************************!*\
  !*** ./src/content_script.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cg_main_1 = __webpack_require__(/*! ./lib/cg-main */ "./src/lib/cg-main.ts");
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.color) {
        console.log("Receive color = " + msg.color);
        document.body.style.backgroundColor = msg.color;
        sendResponse("Change color to " + msg.color);
    }
    else {
        sendResponse("Color message is none.");
    }
});
let gesture = new cg_main_1.CGMain();


/***/ }),

/***/ "./src/lib/cg-main.ts":
/*!****************************!*\
  !*** ./src/lib/cg-main.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["Gesture"] = 0] = "Gesture";
    MessageTypes[MessageTypes["Url"] = 1] = "Url";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
var GestureTypes;
(function (GestureTypes) {
    GestureTypes[GestureTypes["Up"] = 0] = "Up";
    GestureTypes[GestureTypes["Down"] = 1] = "Down";
    GestureTypes[GestureTypes["Left"] = 2] = "Left";
    GestureTypes[GestureTypes["Right"] = 3] = "Right";
})(GestureTypes = exports.GestureTypes || (exports.GestureTypes = {}));
const MIN_LENGTH = 10;
class CGMain {
    constructor() {
        this.inGesture = false;
        this.gestures = [];
        rxjs_1.fromEvent(document, "contextmenu").subscribe(e => {
            if (this.inGesture) {
                e.preventDefault();
            }
            this.inGesture = false;
        });
        let move$ = rxjs_1.fromEvent(document, "mousemove").pipe(operators_1.takeUntil(rxjs_1.fromEvent(document, "mouseup").pipe(operators_1.tap(e => {
            this.anchorCoordinate = null;
            if (this.currentAnchorTarget) {
                console.log("is anchor", this.currentAnchorTarget);
                chrome.runtime.sendMessage({
                    type: MessageTypes.Url,
                    value: this.currentAnchorTarget.href
                });
            }
            else {
                chrome.runtime.sendMessage({
                    type: MessageTypes.Gesture,
                    value: this.gestures
                });
            }
            this.gestures = [];
        }))));
        rxjs_1.fromEvent(document, "mousedown")
            .pipe(operators_1.tap(e => {
            this.inGesture = false;
        }), operators_1.filter(e => this.isGestureButton(e)), operators_1.tap(e => {
            console.log("tapping mouse down is anchor");
            this.currentAnchorTarget = this.lookupParentsForAnchor(e);
            console.log("[currentAnchorTarget]", this.currentAnchorTarget, chrome.tabs);
        }), operators_1.switchMap(e => move$))
            .subscribe(e => {
            // this.addDot(e);
            let currentCoordinate = this.getCoordinate(e);
            if (!this.anchorCoordinate) {
                this.anchorCoordinate = currentCoordinate;
            }
            if (this.getDistance(this.anchorCoordinate, currentCoordinate) >
                MIN_LENGTH) {
                this.inGesture = true;
                let vector = this.getVector(this.getDegrees(this.anchorCoordinate, currentCoordinate));
                if (vector != null) {
                    if ((this.gestures.length > 0 &&
                        this.gestures[this.gestures.length - 1] != vector) ||
                        this.gestures.length == 0) {
                        this.gestures.push(vector);
                    }
                    this.anchorCoordinate = currentCoordinate;
                }
            }
        });
        this.setIFrameMouseEventBorderStyle();
    }
    lookupParentsForAnchor(e) {
        console.log("this.currentAnchorTarget", e.target);
        let t = e.target;
        while (t.parentElement) {
            t = t.parentElement;
            if (t.href != null) {
                return t;
            }
        }
        return null;
    }
    getCoordinate(e) {
        return { x: e.clientX, y: e.clientY };
    }
    getDistance(start, end) {
        return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
    }
    getDegrees(start, end) {
        return (Math.atan2(start.y - end.y, start.x - end.x) * 180) / Math.PI;
    }
    getVector(deg) {
        if (deg > -30 && deg < 30) {
            console.log("gesture", "left");
            // window.history.back();
            return GestureTypes.Left;
        }
        else if (deg > 60 && deg < 120) {
            console.log("gesture", "up");
            return GestureTypes.Up;
        }
        else if (deg > -120 && deg < -60) {
            console.log("gesture", "down");
            return GestureTypes.Down;
        }
        else if (deg > 150 || deg < -150) {
            console.log("gesture", "right");
            // window.history.forward();
            return GestureTypes.Right;
        }
        console.log("undefined");
    }
    isGestureButton(e) {
        return e.button == 2;
    }
    getVectorText() {
        return this.gestures.map(x => {
            return GestureTypes[x];
        });
    }
    addDot(e) {
        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = e.clientX + "px";
        div.style.top = e.clientY + "px";
        div.style.width = "3px";
        div.style.height = "3px";
        div.style.backgroundColor = e.button == 0 ? "red" : "green";
        document.body.appendChild(div);
    }
    setIFrameMouseEventBorderStyle() {
        // document.querySelectorAll('iframe').forEach((frame: HTMLIFrameElement) => {
        //   console.log('add iframe style to ', frame);
        //   frame.addEventListener('mouseenter', (e: MouseEvent) => {
        //     (e.target as HTMLElement).style.border = '2px solid #ccff00';
        //   });
        //   frame.addEventListener('mouseleave', (e: MouseEvent) => {
        //     (e.target as HTMLElement).style.border = '';
        //   });
        // })
    }
}
exports.CGMain = CGMain;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY2ctbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsdUJBQXVCO0FBQ3ZDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDJDQUFlO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQ2JhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsZUFBZSxtQkFBTyxDQUFDLGdEQUFNO0FBQzdCLG9CQUFvQixtQkFBTyxDQUFDLG9FQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsbUVBQW1FO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsbUVBQW1FO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGNBQWM7QUFDZCxZQUFZO0FBQ1o7QUFDQTtBQUNBIiwiZmlsZSI6ImNvbnRlbnRfc2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJjb250ZW50X3NjcmlwdFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjZ19tYWluXzEgPSByZXF1aXJlKFwiLi9saWIvY2ctbWFpblwiKTtcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChtc2csIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICBpZiAobXNnLmNvbG9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWNlaXZlIGNvbG9yID0gXCIgKyBtc2cuY29sb3IpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gbXNnLmNvbG9yO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZShcIkNoYW5nZSBjb2xvciB0byBcIiArIG1zZy5jb2xvcik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzZW5kUmVzcG9uc2UoXCJDb2xvciBtZXNzYWdlIGlzIG5vbmUuXCIpO1xyXG4gICAgfVxyXG59KTtcclxubGV0IGdlc3R1cmUgPSBuZXcgY2dfbWFpbl8xLkNHTWFpbigpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcclxuY29uc3Qgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XHJcbnZhciBNZXNzYWdlVHlwZXM7XHJcbihmdW5jdGlvbiAoTWVzc2FnZVR5cGVzKSB7XHJcbiAgICBNZXNzYWdlVHlwZXNbTWVzc2FnZVR5cGVzW1wiR2VzdHVyZVwiXSA9IDBdID0gXCJHZXN0dXJlXCI7XHJcbiAgICBNZXNzYWdlVHlwZXNbTWVzc2FnZVR5cGVzW1wiVXJsXCJdID0gMV0gPSBcIlVybFwiO1xyXG59KShNZXNzYWdlVHlwZXMgPSBleHBvcnRzLk1lc3NhZ2VUeXBlcyB8fCAoZXhwb3J0cy5NZXNzYWdlVHlwZXMgPSB7fSkpO1xyXG52YXIgR2VzdHVyZVR5cGVzO1xyXG4oZnVuY3Rpb24gKEdlc3R1cmVUeXBlcykge1xyXG4gICAgR2VzdHVyZVR5cGVzW0dlc3R1cmVUeXBlc1tcIlVwXCJdID0gMF0gPSBcIlVwXCI7XHJcbiAgICBHZXN0dXJlVHlwZXNbR2VzdHVyZVR5cGVzW1wiRG93blwiXSA9IDFdID0gXCJEb3duXCI7XHJcbiAgICBHZXN0dXJlVHlwZXNbR2VzdHVyZVR5cGVzW1wiTGVmdFwiXSA9IDJdID0gXCJMZWZ0XCI7XHJcbiAgICBHZXN0dXJlVHlwZXNbR2VzdHVyZVR5cGVzW1wiUmlnaHRcIl0gPSAzXSA9IFwiUmlnaHRcIjtcclxufSkoR2VzdHVyZVR5cGVzID0gZXhwb3J0cy5HZXN0dXJlVHlwZXMgfHwgKGV4cG9ydHMuR2VzdHVyZVR5cGVzID0ge30pKTtcclxuY29uc3QgTUlOX0xFTkdUSCA9IDEwO1xyXG5jbGFzcyBDR01haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbkdlc3R1cmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdlc3R1cmVzID0gW107XHJcbiAgICAgICAgcnhqc18xLmZyb21FdmVudChkb2N1bWVudCwgXCJjb250ZXh0bWVudVwiKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluR2VzdHVyZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5HZXN0dXJlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG1vdmUkID0gcnhqc18xLmZyb21FdmVudChkb2N1bWVudCwgXCJtb3VzZW1vdmVcIikucGlwZShvcGVyYXRvcnNfMS50YWtlVW50aWwocnhqc18xLmZyb21FdmVudChkb2N1bWVudCwgXCJtb3VzZXVwXCIpLnBpcGUob3BlcmF0b3JzXzEudGFwKGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuY2hvckNvb3JkaW5hdGUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50QW5jaG9yVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIGFuY2hvclwiLCB0aGlzLmN1cnJlbnRBbmNob3JUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlcy5VcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuY3VycmVudEFuY2hvclRhcmdldC5ocmVmXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZXMuR2VzdHVyZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nZXN0dXJlc1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nZXN0dXJlcyA9IFtdO1xyXG4gICAgICAgIH0pKSkpO1xyXG4gICAgICAgIHJ4anNfMS5mcm9tRXZlbnQoZG9jdW1lbnQsIFwibW91c2Vkb3duXCIpXHJcbiAgICAgICAgICAgIC5waXBlKG9wZXJhdG9yc18xLnRhcChlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbkdlc3R1cmUgPSBmYWxzZTtcclxuICAgICAgICB9KSwgb3BlcmF0b3JzXzEuZmlsdGVyKGUgPT4gdGhpcy5pc0dlc3R1cmVCdXR0b24oZSkpLCBvcGVyYXRvcnNfMS50YXAoZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFwcGluZyBtb3VzZSBkb3duIGlzIGFuY2hvclwiKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5jaG9yVGFyZ2V0ID0gdGhpcy5sb29rdXBQYXJlbnRzRm9yQW5jaG9yKGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltjdXJyZW50QW5jaG9yVGFyZ2V0XVwiLCB0aGlzLmN1cnJlbnRBbmNob3JUYXJnZXQsIGNocm9tZS50YWJzKTtcclxuICAgICAgICB9KSwgb3BlcmF0b3JzXzEuc3dpdGNoTWFwKGUgPT4gbW92ZSQpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmFkZERvdChlKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRDb29yZGluYXRlID0gdGhpcy5nZXRDb29yZGluYXRlKGUpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYW5jaG9yQ29vcmRpbmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JDb29yZGluYXRlID0gY3VycmVudENvb3JkaW5hdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RGlzdGFuY2UodGhpcy5hbmNob3JDb29yZGluYXRlLCBjdXJyZW50Q29vcmRpbmF0ZSkgPlxyXG4gICAgICAgICAgICAgICAgTUlOX0xFTkdUSCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbkdlc3R1cmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZlY3RvciA9IHRoaXMuZ2V0VmVjdG9yKHRoaXMuZ2V0RGVncmVlcyh0aGlzLmFuY2hvckNvb3JkaW5hdGUsIGN1cnJlbnRDb29yZGluYXRlKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmVjdG9yICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZ2VzdHVyZXMubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlc3R1cmVzW3RoaXMuZ2VzdHVyZXMubGVuZ3RoIC0gMV0gIT0gdmVjdG9yKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlc3R1cmVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VzdHVyZXMucHVzaCh2ZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuY2hvckNvb3JkaW5hdGUgPSBjdXJyZW50Q29vcmRpbmF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0SUZyYW1lTW91c2VFdmVudEJvcmRlclN0eWxlKCk7XHJcbiAgICB9XHJcbiAgICBsb29rdXBQYXJlbnRzRm9yQW5jaG9yKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuY3VycmVudEFuY2hvclRhcmdldFwiLCBlLnRhcmdldCk7XHJcbiAgICAgICAgbGV0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICB3aGlsZSAodC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHQgPSB0LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmICh0LmhyZWYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBnZXRDb29yZGluYXRlKGUpIHtcclxuICAgICAgICByZXR1cm4geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xyXG4gICAgfVxyXG4gICAgZ2V0RGlzdGFuY2Uoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coc3RhcnQueCAtIGVuZC54LCAyKSArIE1hdGgucG93KHN0YXJ0LnkgLSBlbmQueSwgMikpO1xyXG4gICAgfVxyXG4gICAgZ2V0RGVncmVlcyhzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIChNYXRoLmF0YW4yKHN0YXJ0LnkgLSBlbmQueSwgc3RhcnQueCAtIGVuZC54KSAqIDE4MCkgLyBNYXRoLlBJO1xyXG4gICAgfVxyXG4gICAgZ2V0VmVjdG9yKGRlZykge1xyXG4gICAgICAgIGlmIChkZWcgPiAtMzAgJiYgZGVnIDwgMzApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXN0dXJlXCIsIFwibGVmdFwiKTtcclxuICAgICAgICAgICAgLy8gd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2VzdHVyZVR5cGVzLkxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRlZyA+IDYwICYmIGRlZyA8IDEyMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdlc3R1cmVcIiwgXCJ1cFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdlc3R1cmVUeXBlcy5VcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGVnID4gLTEyMCAmJiBkZWcgPCAtNjApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXN0dXJlXCIsIFwiZG93blwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdlc3R1cmVUeXBlcy5Eb3duO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkZWcgPiAxNTAgfHwgZGVnIDwgLTE1MCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdlc3R1cmVcIiwgXCJyaWdodFwiKTtcclxuICAgICAgICAgICAgLy8gd2luZG93Lmhpc3RvcnkuZm9yd2FyZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2VzdHVyZVR5cGVzLlJpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInVuZGVmaW5lZFwiKTtcclxuICAgIH1cclxuICAgIGlzR2VzdHVyZUJ1dHRvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIGUuYnV0dG9uID09IDI7XHJcbiAgICB9XHJcbiAgICBnZXRWZWN0b3JUZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlc3R1cmVzLm1hcCh4ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIEdlc3R1cmVUeXBlc1t4XTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFkZERvdChlKSB7XHJcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYICsgXCJweFwiO1xyXG4gICAgICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgKyBcInB4XCI7XHJcbiAgICAgICAgZGl2LnN0eWxlLndpZHRoID0gXCIzcHhcIjtcclxuICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gXCIzcHhcIjtcclxuICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZS5idXR0b24gPT0gMCA/IFwicmVkXCIgOiBcImdyZWVuXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfVxyXG4gICAgc2V0SUZyYW1lTW91c2VFdmVudEJvcmRlclN0eWxlKCkge1xyXG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpLmZvckVhY2goKGZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2FkZCBpZnJhbWUgc3R5bGUgdG8gJywgZnJhbWUpO1xyXG4gICAgICAgIC8vICAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlOiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCAjY2NmZjAwJztcclxuICAgICAgICAvLyAgIH0pO1xyXG4gICAgICAgIC8vICAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlOiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYm9yZGVyID0gJyc7XHJcbiAgICAgICAgLy8gICB9KTtcclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQ0dNYWluID0gQ0dNYWluO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9