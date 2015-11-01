'use strict';

function ApplicationException(message) {
    this.name = "ApplicationException";
    this.message = (message || "");
}

ApplicationException.prototype = Error.prototype;

var exports = module.exports = {};

exports.checkError = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  for (var i = 0; i < ErrorCodes.length; i++) {
    if (ErrorCodes[i].code === response.status) {
      throw new ApplicationException(ErrorCodes[i].message);
    }
  }
  throw new ApplicationException(ServerError);
};

exports.parseJson = function(response) {
  return response.json();
};

exports.serverUrl = 'http://104.154.80.65';
