'use strict';

function parseHeader(header) {
  let opts = {};
  let parts = header.split(' ');
  let params = parts.slice(1).join(' ');

  // Split the parameters by comma.
  let tokens = params.split(/,(?=(?:[^"]|"[^"]*")*$)/);
  if (parts[0].substr(0, 6) === 'Digest') {
    // Parse parameters.
    let i = 0;
    let len = tokens.length;

    while (++i < len) {
      // Strip quotes and whitespace.
      let param = /(\w+)=["]?([^"]*)["]?$/.exec(tokens[i]);
      if (param) {
        opts[param[1]] = param[2];
      }
    }
  }
  return opts;
}

exports.parseHeader = parseHeader;
