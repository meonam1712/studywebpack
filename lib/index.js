'use strict';
var path = require('path');
var express = require('express');
require('babel/register')({});
var server = require('./server');
var PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('Server listening on', PORT);
});
