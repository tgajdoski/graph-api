(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __webpack_require__(2);
const graphql_request_1 = __webpack_require__(3);
const query = `
  {
   approvals
   {
       id,
       content
   }
  }
`;
ava_1.default("if token is invalid, it should throw an error", (t) => __awaiter(this, void 0, void 0, function* () {
    try {
        const client = new graphql_request_1.GraphQLClient("http://ec2-18-217-250-79.us-east-2.compute.amazonaws.com:41960/", {
            headers: {
                Authentication: "123"
            }
        });
        yield client.request(query);
        t.fail("it should fail");
    }
    catch (err) {
        t.pass();
    }
}));
// test("foo", t => {
//   t.pass();
// });
// test("bar", async t => {
//   const bar = Promise.resolve("bar");
//   t.is(await bar, "bar");
// });


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("ava");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("graphql-request");

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmQ1ZmIwNjJmNDY2YjFhZTk1YjgiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvbG9naW4udGVzdC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhdmFcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncmFwaHFsLXJlcXVlc3RcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN2REEsbUJBQU8sQ0FBQyxDQUFjLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnhCLHFDQUF1QjtBQUN2QixpREFBeUQ7QUFFekQsTUFBTSxLQUFLLEdBQUc7Ozs7Ozs7O0NBUWIsQ0FBQztBQUVGLGFBQUksQ0FBQywrQ0FBK0MsRUFBRSxDQUFNLENBQUMsRUFBQyxFQUFFO0lBQzlELElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLCtCQUFhLENBQzlCLGlFQUFpRSxFQUNqRTtZQUNFLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGLENBQ0YsQ0FBQztRQUNGLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDMUI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNWO0FBQ0gsQ0FBQyxFQUFDLENBQUM7QUFFSCxxQkFBcUI7QUFDckIsY0FBYztBQUNkLE1BQU07QUFFTiwyQkFBMkI7QUFDM0Isd0NBQXdDO0FBRXhDLDRCQUE0QjtBQUM1QixNQUFNOzs7Ozs7O0FDdENOLGdDOzs7Ozs7QUNBQSw0QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZkNWZiMDYyZjQ2NmIxYWU5NWI4IiwiaW1wb3J0ICogYXMgYXZhIGZyb20gXCJhdmFcIjtcclxuLy8gZml4IHdhcm5pbmcgd2hpbGUgcnVubmluZ1xyXG5cclxuaW1wb3J0IHRlc3QgZnJvbSBcImF2YVwiO1xyXG5pbXBvcnQgKiBhcyBMb2Rhc2ggZnJvbSBcImxvZGFzaFwiO1xyXG5cclxucmVxdWlyZShcIi4vbG9naW4udGVzdFwiKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdHMvaW5kZXgudHMiLCJpbXBvcnQgdGVzdCBmcm9tIFwiYXZhXCI7XHJcbmltcG9ydCB7IHJlcXVlc3QsIEdyYXBoUUxDbGllbnQgfSBmcm9tIFwiZ3JhcGhxbC1yZXF1ZXN0XCI7XHJcblxyXG5jb25zdCBxdWVyeSA9IGBcclxuICB7XHJcbiAgIGFwcHJvdmFsc1xyXG4gICB7XHJcbiAgICAgICBpZCxcclxuICAgICAgIGNvbnRlbnRcclxuICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbnRlc3QoXCJpZiB0b2tlbiBpcyBpbnZhbGlkLCBpdCBzaG91bGQgdGhyb3cgYW4gZXJyb3JcIiwgYXN5bmMgdCA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNsaWVudCA9IG5ldyBHcmFwaFFMQ2xpZW50KFxyXG4gICAgICBcImh0dHA6Ly9lYzItMTgtMjE3LTI1MC03OS51cy1lYXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tOjQxOTYwL1wiLFxyXG4gICAgICB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgQXV0aGVudGljYXRpb246IFwiMTIzXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBhd2FpdCBjbGllbnQucmVxdWVzdChxdWVyeSk7XHJcbiAgICB0LmZhaWwoXCJpdCBzaG91bGQgZmFpbFwiKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHQucGFzcygpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyB0ZXN0KFwiZm9vXCIsIHQgPT4ge1xyXG4vLyAgIHQucGFzcygpO1xyXG4vLyB9KTtcclxuXHJcbi8vIHRlc3QoXCJiYXJcIiwgYXN5bmMgdCA9PiB7XHJcbi8vICAgY29uc3QgYmFyID0gUHJvbWlzZS5yZXNvbHZlKFwiYmFyXCIpO1xyXG5cclxuLy8gICB0LmlzKGF3YWl0IGJhciwgXCJiYXJcIik7XHJcbi8vIH0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0cy9sb2dpbi50ZXN0LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXZhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXZhXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC1yZXF1ZXN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZ3JhcGhxbC1yZXF1ZXN0XCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==