var express = require('express'),
    http = require('http'),
    debug = require('debug')('server'),
    path = require('path'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon');

// var logger = require('morgan');
// var cookieParser = require('cookie-parser');


module.exports = (_app, _) => {
  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  // app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(_.validator);
  // app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // routes
  app.use(require('./routes'));

  // server
  var server = http.createServer(app);
  // server.on('error', onError);
  server.on('listening', () => {
    var addr = server.address();
    var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
    debug('Listening on ' + bind);
  });

  server.on('close', () => {
    debug('Server closed');
  });
  _app.server = app;
  _app.serve = () => {
    return _.db.connect()
      .then(() => {
      server.listen(_.config.port);
    });
  };

  _app.shutdown = () => {
    return server.close();
  };
};
