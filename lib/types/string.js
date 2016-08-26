// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: strong-remoting
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var debug = require('debug')('strong-remoting:http-coercion');
var g = require('strong-globalize')();

module.exports = {
  fromTypedValue: function(ctx, value) {
    var error = this.validate(value);
    return error ? { error: error } : { value: value };
  },

  fromSloppyValue: function(ctx, value) {
    // TODO(bajtos) should we reject objects/arrays created from complex
    // query strings?
    if (value !== undefined && value !== null)
      value = '' + value;
    return this.fromTypedValue(value);
  },

  validate: function(ctx, value) {
    if (value === undefined || typeof value === 'string')
      return null;

    var err = new Error(g.f('Value is not a string.'));
    err.statusCode = 400;
    return err;
  },
};