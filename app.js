

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  cors = require('cors'),
  mongoose = require('mongoose');

mongoose.connect(config.db, { useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();
// 允许跨域
app.use(cors());

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
