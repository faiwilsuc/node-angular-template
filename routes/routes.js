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

/**
*   Create
**/

//Create a new item
routes.post.item = function(req, res){

    console.log(req.body);

    items.update(req.body._id,{$set:req.body},{upsert:true}, function(){

        return(true);

    });

};

//Create a new collection
routes.post.collection = function(req, res){

    console.log(req.body);

    items.save(req.body, function(err, saved){
        
        console.log("Saved...");
        console.log(err);
        console.log(saved);
        res.send(saved);

    });


};

/**
*   Read
**/
routes.get.item = function(req, res){

    var tempCollection;

    console.log(req.params);

    console.log('getting item: ' + req.params.collection + '/' + req.params.item);

    tempCollection = db.collection(req.params.collection);

    var ObjectId = mongojs.ObjectId;    
    var my_objectID = ObjectId(req.params.id);

    tempCollection.find({sessionName: req.params.item}, function(err, docs){

        console.log(err);
        console.log(docs);

        res.send(docs);

    });

};

routes.get.items = function(req, res){

    var tempCollection;

    console.log(req.params);

    console.log('getting collection: ' + req.params.collection);

    tempCollection = db.collection(req.params.collection);

    var ObjectId = mongojs.ObjectId;    
    var my_objectID = ObjectId(req.params.id);

    tempCollection.find({activeStatus:"1"}, function(err, docs){

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

    tempCollection = db.collection("sessions");
    
    console.log(req.body);

    if (req.body.query){

        //req.body.query.delete;

        tempCollection.find({day:req.body.day}).sort({startTime:1}, function(err, docs){

            console.log("found them");
            res.send(docs);
            return(true);

        });

    }else{

        console.log(req.body);
        console.log(req.body._id);

        var ObjectId = mongojs.ObjectId;    
        var my_objectID = ObjectId(req.body._id);
        


        var updated = req.body;
        delete updated.collection;
        delete updated._id;


        tempCollection.update({_id: my_objectID}, updated, {upsert: true}, function(err, docs){

            console.log(err);
            console.log(docs);

            res.send(docs);

        });    

        //Check that the page name doesn't conflict
    }


};

routes.put.collection = function(req, res){};

//Routes: Delete
routes.delete.item = function(req, res){
    
    console.log('delete running...' + req.params.item_name);

    var tempCollection;

    tempCollection = db.collection("sessions");

    tempCollection.remove({sessionName:req.params.item_name}, function(e){

        console.log("Running delete item route...");
        console.log(e);

        res.send({
            value: "true"
        });

    });

    //res.send({
        //value: "false"
    //});


};

routes.delete.collection = function(){};

module.exports = routes;