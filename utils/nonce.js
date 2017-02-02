'use strict';

function nonce(length) {
  const NONCE_VALUE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const NONCE_LENGTH = NONCE_VALUE.length;
  return Array.from({length}, (v, k) => k)
    .map(() => {
      return NONCE_VALUE[Math.random() * NONCE_LENGTH | 0];
    }).join('');
}

exports.nonce = nonce;
