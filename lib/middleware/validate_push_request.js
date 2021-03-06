'use strict';
const _ = require('lodash');
const errors = require('../util/errors');

module.exports = function() {

  return function(req, res, next) {

    if (_.isEmpty(req.body)) {
      return next(new errors.BadRequestError('Missing request body'));
    }

    const body = req.body;

    const validIdentities = (!_.isEmpty(body.identities) && _.isArray(body.identities));
    const validChannels = (!_.isEmpty(body.channels) && _.isArray(body.channels));

    if (!validIdentities && !validChannels) {
      return next(new errors.BadRequestError('There must exist at least one element in the \'identities\' OR \'channels\' ARRAYS'));
    }

    if (_.isEmpty(body.content)) {
      return next(new errors.BadRequestError('The request body must contain a non-empty \'content\' object'));
    }

    return next();
  };
};
