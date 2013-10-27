/**
 * Module dependencies.
 */
 
var express = require('express'),
	http = require('http'),
	path = require('path'),
	app = express();
 
// all environments
app.set('port', process.env.PORT || 3000);
 
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);



app.get('/test', function(req, res){

    res.send('TEST');

});

app.use(express.static(path.join(__dirname, '/app')))
app.use(function(req, res) {
  return res.redirect(req.protocol + '://' + req.get('Host') + '/#' + req.url)
})

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});