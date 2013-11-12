/**
 * Module dependencies.
 */
var express = require('express'),
	http = require('http'),
	path = require('path'),
	app = express(),
    routes = require('./routes/routes'),
    mongojs = require('mongojs'), 
    db = mongojs('ss-cms'), 
    items = db.collection('items'),
    users = db.collection('users');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);


//Routes
app.post('/api/collection/items', routes.put.item);
app.post('/api/collection', routes.post.collection);

app.get('/api/collection/:collection/:item', routes.get.item);
app.get('/api/collection/:collection', routes.get.items);

app.delete('/api/collection/items/:item_name', routes.delete.item);

app.put('/api/collection/items', routes.put.item);

app.post('/api/user/login', function(req, res){

    if (req.body.username == "paupl" && req.body.password == "paupl123"){
        console.log("login success");
        res.send('true');
    }else{
        console.log("login fail");
        res.status(401);
        res.send();
    }

    
});

//Create
//app.post('/api/item', routes.post.item);

//Read
//app.get('/api/item/:collection/:item', routes.get.item);

//Update

//Delete




//All other routes passed to angular client
app.use(express.static(path.join(__dirname, '/app')));

app.use(function(req, res) {
  return res.redirect(req.protocol + '://' + req.get('Host') + '/#' + req.url)
})

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});