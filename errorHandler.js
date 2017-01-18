'use strict';

function generateError({err, moduleName, statusCode}) {
  const name = moduleName ? moduleName : '';
  const stackTrace = err && err.stack
        ? err.stack.split('\n')
        : new Error('').stack.split('\n');
  const message = parseMessage(stackTrace, name);
  let fileInfo;
  try {
    fileInfo = getFileInfo(message);
  } catch(err) {
    throw err;
  }
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
  let fileInfo;
  try {
    fileInfo = message[1].split(':');
    return {
      lineNumber : fileInfo[1],
      columnNumber: fileInfo[2]
    };
  } catch(err) {
    throw err;
  }
}

function getStackMessage(stack) {
  return stack[0].split(':')[1].trim();
}

exports.generateError = generateError;
