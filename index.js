//var Meteor = require('meteor/meteor');

var defaultOptions = {
  returnStubValue: true,
  throwStubExceptions: true
};

var Method = function (name, func, opts) {
  var m = {};
  var methodFunc = func;

  if (Random) {
    methodFunc = function () {
      if (typeof this.randomSeed === 'function') {
        this.Random = Random.createWithSeeds(this.randomSeed());
      } else if (typeof this.randomSeed === 'string') {
        this.Random = Random.createWithSeeds(this.randomSeed);
      } else {
        this.Random = Random;
      }

      func.apply(this, arguments);
    };
  }

  m[name] = methodFunc;
  Meteor.methods(m);

  var f = function (/* args */) {
    var args = Array.prototype.slice.call(arguments);
    var callback;
    var options = opts || defaultOptions;

    if (typeof args[args.length - 1] === 'function') {
      callback = args.pop();
    }

    if (callback) {
      return Meteor.apply(name, args, options, callback);
    } else {
      return Meteor.apply(name, args, options);
    }
  };

  f.call = function (/* args */) {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(name);

    return Meteor.call.apply(Meteor, args);
  };

  f.apply = function (/* args */) {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(name);

    return Meteor.apply.apply(Meteor, args);
  };

  return f;
};

Method.setDefaultOptions = function (opts) {
  defaultOptions = opts;
};


module.exports.Method = Method;
module.exports.default = Method;
