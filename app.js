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
    users = db.collection('users'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto');

// all environment
app.set('port', process.env.PORT || 3000);
app.use(express.cookieParser());
app.use(express.session({secret: "SECRET"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

passport.use(new LocalStrategy(function(username, password, done){
    
    console.log("its go time...");
    console.log(username + " and " + password);

    users.find({username: username}, function(err, docs){
        
        console.log(docs);

        if(err){
            return done(err);
        }

        if(!docs){
            return done(null, false, {message: "User not found"});
        }

        var salt = crypto.randomBytes(128).toString('base64');

        crypto.pbkdf2(password, docs[0].salt, 10000, 512, function(err, derivedKey){

            console.log("derivedKey");
            console.log(derivedKey.toString('hex'));
            console.log("hash");
            console.log(docs[0].hash);

            if (err) {
                return done(err);
            }

            if (derivedKey.toString('hex') === docs[0].hash){
                return done(null, docs[0]);
            }

            done(null, false, {message: "Incorrect Password"});

        });

    });

}));

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    users.find({_id: id},function(err, docs){
        if(err){
            done(err);
        }
        done(null, docs);
    });
});

app.post('/api/userLogout', function(req, res){
    
    req.logout();
    res.redirect("/");

});

app.post('/api/checkUserStatus', function(req, res){
    
    if(req.isAuthenticated()){
        res.send('true');
    }else{
        res.status(401);
        res.send('false');
    }

});

app.get('/api/createUser/:username/:password', function(req, res){
        
    var salt = crypto.randomBytes(128).toString('base64'),
        username = req.params.username;
        password = req.params.password;

    crypto.pbkdf2(password, salt, 10000, 512, function(err, hash){

        console.log('CREATING USER!!!');
        console.log(hash);

        users.save({username: username, hash: hash.toString('hex'), salt: salt}, function(err, docs){
            
            console.log(docs);

        });

    });

});

//Routes
app.post('/api/collection/items', routes.put.item);
app.post('/api/collection', routes.post.collection);

app.get('/api/collection/:collection/:item', routes.get.item);
app.get('/api/collection/:collection', routes.get.items);

app.delete('/api/collection/items/:item_name', routes.delete.item);

app.put('/api/collection/items', routes.put.item);

app.post('/api/user/login', passport.authenticate('local'), function(req, res){
    
    res.send("true");

    console.log('winners table');
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