/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.BooleanBlockCard = void 0;\nvar BooleanBlockCard = /** @class */function () {\n  function BooleanBlockCard() {\n    this._booleanValue = false;\n    this._textValue = \"\";\n    this._defaultText = \"\";\n  }\n  BooleanBlockCard.prototype.init = function (context, notifyOutputChanged, state, container) {\n    var _a, _b, _c, _d, _e, _f;\n    this._context = context;\n    this._notifyOutputChanged = notifyOutputChanged;\n    this._container = container;\n    // Add debugging\n    console.log(\"BooleanBlockCard init called\", context.parameters);\n    this._booleanValue = (_b = (_a = context.parameters.booleanValue) === null || _a === void 0 ? void 0 : _a.raw) !== null && _b !== void 0 ? _b : false;\n    this._textValue = (_d = (_c = context.parameters.textValue) === null || _c === void 0 ? void 0 : _c.raw) !== null && _d !== void 0 ? _d : \"\";\n    this._defaultText = (_f = (_e = context.parameters.defaultText) === null || _e === void 0 ? void 0 : _e.raw) !== null && _f !== void 0 ? _f : \"Enter your text here...\";\n    console.log(\"Initial values:\", {\n      boolean: this._booleanValue,\n      text: this._textValue,\n      default: this._defaultText\n    });\n    this.createCardUI();\n    this.updateTextFieldState();\n    console.log(\"Component initialized, container:\", this._container);\n  };\n  BooleanBlockCard.prototype.createCardUI = function () {\n    this._cardContainer = document.createElement(\"div\");\n    this._cardContainer.className = \"boolean-block-card\";\n    this._switchContainer = document.createElement(\"div\");\n    this._switchContainer.className = \"switch-container\";\n    this._switchInput = document.createElement(\"input\");\n    this._switchInput.type = \"checkbox\";\n    this._switchInput.id = \"boolean-switch\";\n    this._switchInput.className = \"switch-input\";\n    this._switchInput.checked = this._booleanValue;\n    this._switchInput.addEventListener(\"change\", this.onSwitchChange.bind(this));\n    this._switchLabel = document.createElement(\"label\");\n    this._switchLabel.htmlFor = \"boolean-switch\";\n    this._switchLabel.className = \"switch-label\";\n    this._switchLabel.innerHTML = '<span class=\"switch-slider\"></span>';\n    var switchText = document.createElement(\"span\");\n    switchText.className = \"switch-text\";\n    switchText.textContent = \"Enable custom text\";\n    this._switchContainer.appendChild(this._switchInput);\n    this._switchContainer.appendChild(this._switchLabel);\n    this._switchContainer.appendChild(switchText);\n    this._textArea = document.createElement(\"textarea\");\n    this._textArea.className = \"text-area\";\n    this._textArea.rows = 5;\n    this._textArea.addEventListener(\"input\", this.onTextChange.bind(this));\n    this._cardContainer.appendChild(this._switchContainer);\n    this._cardContainer.appendChild(this._textArea);\n    this._container.appendChild(this._cardContainer);\n  };\n  BooleanBlockCard.prototype.onSwitchChange = function () {\n    this._booleanValue = this._switchInput.checked;\n    this.updateTextFieldState();\n    this._notifyOutputChanged();\n  };\n  BooleanBlockCard.prototype.onTextChange = function () {\n    if (this._booleanValue) {\n      this._textValue = this._textArea.value;\n      this._notifyOutputChanged();\n    }\n  };\n  BooleanBlockCard.prototype.updateTextFieldState = function () {\n    if (this._booleanValue) {\n      this._textArea.disabled = false;\n      this._textArea.value = this._textValue;\n      this._textArea.placeholder = \"Enter your custom text...\";\n      this._textArea.classList.remove(\"disabled\");\n    } else {\n      this._textArea.disabled = true;\n      this._textArea.value = this._defaultText;\n      this._textArea.classList.add(\"disabled\");\n    }\n  };\n  BooleanBlockCard.prototype.updateView = function (context) {\n    this._context = context;\n    var newBooleanValue = context.parameters.booleanValue.raw || false;\n    var newTextValue = context.parameters.textValue.raw || \"\";\n    var newDefaultText = context.parameters.defaultText.raw || this._defaultText;\n    if (newBooleanValue !== this._booleanValue || newTextValue !== this._textValue || newDefaultText !== this._defaultText) {\n      this._booleanValue = newBooleanValue;\n      this._textValue = newTextValue;\n      this._defaultText = newDefaultText;\n      this._switchInput.checked = this._booleanValue;\n      this.updateTextFieldState();\n    }\n  };\n  BooleanBlockCard.prototype.getOutputs = function () {\n    return {\n      booleanValue: this._booleanValue,\n      textValue: this._booleanValue ? this._textValue : this._defaultText\n    };\n  };\n  BooleanBlockCard.prototype.destroy = function () {\n    this._switchInput.removeEventListener(\"change\", this.onSwitchChange.bind(this));\n    this._textArea.removeEventListener(\"input\", this.onTextChange.bind(this));\n  };\n  return BooleanBlockCard;\n}();\nexports.BooleanBlockCard = BooleanBlockCard;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.ts"](0, __webpack_exports__);
/******/ 	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = __webpack_exports__;
/******/ 	
/******/ })()
;
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('BooleanBlock.BooleanBlockCard', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.BooleanBlockCard);
} else {
	var BooleanBlock = BooleanBlock || {};
	BooleanBlock.BooleanBlockCard = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.BooleanBlockCard;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}