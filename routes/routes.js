var routes,
    mongojs = require('mongojs'), 
    db = mongojs('ss-cms'), 
    items = db.collection('items'),
    users = db.collection('users');

routes = {
    'post':{},
    'get':{},
    'put':{},
    'delete':{}
},    

//Routes: Create
routes.post.item = function(req, res){

    console.log(req.body);

    items.update(req.body._id,{$set:req.body},{upsert:true}, function(){

        return(true);

    });


};

routes.post.item_collection = function(req, res){};

//Routes: Read
routes.get.item = function(req, res){

    var tempCollection;

    console.log(req.params);

    console.log('getting item: ' + req.params.collection + '/' + req.params.item);

    tempCollection = db.collection(req.params.collection);

    var ObjectId = mongojs.ObjectId;    
    var my_objectID = ObjectId(req.params.id);

    tempCollection.find({title: req.params.item}, function(err, docs){

        console.log(err);
        console.log(docs);

        res.send(docs);

    });

};

routes.get.collectionById = function(req, res){};

routes.get.itemByName = function(req, res){};

routes.get.itemByCollection = function(req, res){};

routes.get.items = function(req, res){

    var tempCollection;

    console.log(req.params);

    console.log('getting collection: ' + req.params.collection);

    tempCollection = db.collection(req.params.collection);

    var ObjectId = mongojs.ObjectId;    
    var my_objectID = ObjectId(req.params.id);

    tempCollection.find({}, function(err, docs){

        console.log(err);
        console.log(docs);

        res.send(docs);

    });

};

routes.get.collections = function(req, res){};

routes.get.searchItems = function(req, res){};

routes.get.searchCollections = function(req, res){};

//Routes: Update
routes.put.item = function(req, res){

    var tempCollection;

    tempCollection = db.collection(req.body.collection);

    var ObjectId = mongojs.ObjectId;    
    var my_objectID = ObjectId(req.body._id);
    var updated = req.body;
    updated.collection = undefined;
    updated._id = undefined;
    
    tempCollection.update({_id: my_objectID}, req.body, {upsert: true}, function(err, docs){

        console.log(err);
        console.log(docs);

        res.send(docs);

    });    

    //Check that the page name doesn't conflict



};

routes.put.collection = function(req, res){};

//Routes: Delete
routes.delete.item = function(){};

routes.delete.collection = function(){};

module.exports = routes;