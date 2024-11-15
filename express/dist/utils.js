'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.convertKeysToLowerCase =
  exports.lowercaseFirstLetter =
  exports.asyncWrapper =
    void 0;
const asyncWrapper = (fn) => {
  return (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        yield fn(req, res, next);
      } catch (error) {
        next(error); // Passes error to error handling middleware
      }
    });
};
exports.asyncWrapper = asyncWrapper;
const lowercaseFirstLetter = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
exports.lowercaseFirstLetter = lowercaseFirstLetter;
const convertKeysToLowerCase = (obj) => {
  const output = {};
  if (
    Object.prototype.toString.apply(obj) !== '[object Object]' &&
    Object.prototype.toString.apply(obj) !== '[object Array]'
  ) {
    return obj;
  }
  for (const key in obj) {
    const val = obj[key];
    if (Object.prototype.toString.apply(val) === '[object Object]') {
      output[(0, exports.lowercaseFirstLetter)(key)] = (0,
      exports.convertKeysToLowerCase)(val);
    } else if (Object.prototype.toString.apply(val) === '[object Array]') {
      const lowerCase = (0, exports.lowercaseFirstLetter)(key);
      output[lowerCase] = [];
      for (let j = 0; j < val.length; j++) {
        output[lowerCase].push((0, exports.convertKeysToLowerCase)(val[j]));
      }
    } else {
      output[(0, exports.lowercaseFirstLetter)(key)] = val;
    }
  }
  return output;
};
exports.convertKeysToLowerCase = convertKeysToLowerCase;
