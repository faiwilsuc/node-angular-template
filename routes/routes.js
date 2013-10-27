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

    items.insert(req.body, function(){

        return(true);

    });


};

routes.post.item_collection = function(req, res){};

//Routes: Read
routes.get.itemById = function(req, res){};

routes.get.collectionById = function(req, res){};

routes.get.itemByName = function(req, res){};

routes.get.itemByCollection = function(req, res){};

routes.get.items = function(req, res){};

routes.get.collections = function(req, res){};

routes.get.searchItems = function(req, res){};

routes.get.searchCollections = function(req, res){};

//Routes: Update
routes.put.item = function(req, res){};

routes.put.collection = function(req, res){};

//Routes: Delete
routes.delete.item = function(){};

routes.delete.collection = function(){};

module.exports = routes;