var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'yo-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/demo'
  },

  test: {
    root: rootPath,
    app: {
      name: 'yo-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/yo-express-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'yo-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/yo-express-production'
  }
};

module.exports = config[env];
