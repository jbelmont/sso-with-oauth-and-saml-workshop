'use strict';

const crypto = require('crypto');

function md5({ str, encoding = 'hex' }) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest(encoding);
}

exports.md5 = md5;
