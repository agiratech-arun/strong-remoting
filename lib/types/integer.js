// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: strong-remoting
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var debug = require('debug')('strong-remoting:http-coercion');
var g = require('strong-globalize')();
var isSafeInteger = require('../number-checks').isSafeInteger;
var numberConverter = require('./number');

module.exports = {
  fromTypedValue: function(ctx, value) {
    var error = this.validate(value);
    return error ? { error: error } : { value: value };
  },

  fromSloppyValue: function(ctx, value) {
    var result = numberConverter.fromSloppyValue(ctx, value);
    return this.fromTypedValue(result);
  },

  validate: function(ctx, value) {
    if (value === undefined)
      return null;

    var err = numberConverter.validate(ctx, value);
    if (err)
      return err;

    if (isSafeInteger(value))
      return null;

    var err = new Error(g.f('Value is not a safe integer'));
    err.statusCode = 400;
    return err;
  },
};