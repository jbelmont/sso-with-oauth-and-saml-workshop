'use strict';

function generateError(err, moduleName, statusCode) {
  const name = moduleName ? moduleName : '';
  const stackTrace = err && err.stack 
        ? err.stack.split('\n') 
        : new Error(message).stack.split('\n');
  const message = parseMessage(stackTrace, name);
  const fileInfo = getFileInfo(message);
  const stackMessage = getStackMessage(stackTrace);
  return {
    statusCode,
    message: `${stackMessage} ${message[0].trim()}`,
    errorLineAndColumn: `${name}:${fileInfo.lineNumber}:${fileInfo.columnNumber}`
  };
}

function parseMessage(stackTrace, name) {
  const pattern = new RegExp(name, 'i');
  return stackTrace.filter(stack => pattern.test(stack));
}

function getFileInfo(message) {
  const fileInfo = message[0].split(':');
  return {
    lineNumber : fileInfo[1],
    columnNumber: fileInfo[2]
  };
}

function getStackMessage(stack) {
  return stack[0].split(':')[1].trim();
}

exports.generateError = generateError;