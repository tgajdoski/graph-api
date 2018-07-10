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
    console.log("LETS START TESTS");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmM2OGQ4NGI2OTVkZjRhYTgzMjEiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvbG9naW4udGVzdC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhdmFcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncmFwaHFsLXJlcXVlc3RcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN2REEsbUJBQU8sQ0FBQyxDQUFjLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnhCLHFDQUF1QjtBQUN2QixpREFBeUQ7QUFFekQsTUFBTSxLQUFLLEdBQUc7Ozs7Ozs7O0NBUWIsQ0FBQztBQUVGLGFBQUksQ0FBQywrQ0FBK0MsRUFBRSxDQUFNLENBQUMsRUFBQyxFQUFFO0lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNoQyxJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBSSwrQkFBYSxDQUM5QixpRUFBaUUsRUFDakU7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLEtBQUs7YUFDdEI7U0FDRixDQUNGLENBQUM7UUFDRixNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQzFCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDVjtBQUNILENBQUMsRUFBQyxDQUFDO0FBRUgscUJBQXFCO0FBQ3JCLGNBQWM7QUFDZCxNQUFNO0FBRU4sMkJBQTJCO0FBQzNCLHdDQUF3QztBQUV4Qyw0QkFBNEI7QUFDNUIsTUFBTTs7Ozs7OztBQ3ZDTixnQzs7Ozs7O0FDQUEsNEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyYzY4ZDg0YjY5NWRmNGFhODMyMSIsImltcG9ydCAqIGFzIGF2YSBmcm9tIFwiYXZhXCI7XHJcbi8vIGZpeCB3YXJuaW5nIHdoaWxlIHJ1bm5pbmdcclxuXHJcbmltcG9ydCB0ZXN0IGZyb20gXCJhdmFcIjtcclxuaW1wb3J0ICogYXMgTG9kYXNoIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbnJlcXVpcmUoXCIuL2xvZ2luLnRlc3RcIik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Rlc3RzL2luZGV4LnRzIiwiaW1wb3J0IHRlc3QgZnJvbSBcImF2YVwiO1xyXG5pbXBvcnQgeyByZXF1ZXN0LCBHcmFwaFFMQ2xpZW50IH0gZnJvbSBcImdyYXBocWwtcmVxdWVzdFwiO1xyXG5cclxuY29uc3QgcXVlcnkgPSBgXHJcbiAge1xyXG4gICBhcHByb3ZhbHNcclxuICAge1xyXG4gICAgICAgaWQsXHJcbiAgICAgICBjb250ZW50XHJcbiAgIH1cclxuICB9XHJcbmA7XHJcblxyXG50ZXN0KFwiaWYgdG9rZW4gaXMgaW52YWxpZCwgaXQgc2hvdWxkIHRocm93IGFuIGVycm9yXCIsIGFzeW5jIHQgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwiTEVUUyBTVEFSVCBURVNUU1wiKTtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY2xpZW50ID0gbmV3IEdyYXBoUUxDbGllbnQoXHJcbiAgICAgIFwiaHR0cDovL2VjMi0xOC0yMTctMjUwLTc5LnVzLWVhc3QtMi5jb21wdXRlLmFtYXpvbmF3cy5jb206NDE5NjAvXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBBdXRoZW50aWNhdGlvbjogXCIxMjNcIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHF1ZXJ5KTtcclxuICAgIHQuZmFpbChcIml0IHNob3VsZCBmYWlsXCIpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgdC5wYXNzKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIHRlc3QoXCJmb29cIiwgdCA9PiB7XHJcbi8vICAgdC5wYXNzKCk7XHJcbi8vIH0pO1xyXG5cclxuLy8gdGVzdChcImJhclwiLCBhc3luYyB0ID0+IHtcclxuLy8gICBjb25zdCBiYXIgPSBQcm9taXNlLnJlc29sdmUoXCJiYXJcIik7XHJcblxyXG4vLyAgIHQuaXMoYXdhaXQgYmFyLCBcImJhclwiKTtcclxuLy8gfSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Rlc3RzL2xvZ2luLnRlc3QudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhdmFcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhdmFcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsLXJlcXVlc3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJncmFwaHFsLXJlcXVlc3RcIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9