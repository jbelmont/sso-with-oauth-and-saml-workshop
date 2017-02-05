'use strict';

const {
  join
} = require('path');

module.exports = {
  dotEnvConfig: require('dotenv').config({
    path: join(__dirname, '../.env')
  })
};
