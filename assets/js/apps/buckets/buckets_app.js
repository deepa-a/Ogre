Ogre.module("BucketsApp",function(BucketsApp,Ogre,Backbone,Marionette,$,_){
    BucketsApp.Router = Marionette.AppRouter.extend({
        appRoutes:{
            "buckets":"listBuckets",
            "buckets/new" : "createNewBucket",
            "buckets/:id" : "showBucket",
            "buckets/:id/edit" : "editBucket"
        }
    });
    var API = {
        listBuckets: function(){
            BucketsApp.List.Controller.listBuckets();
        },
        showBucket: function(id){
            BucketsApp.Show.Controller.showBucket(id);
        },
        editBucket: function(id){
            BucketsApp.Edit.Controller.editBucket(id);
        },
        createNewBucket: function(){
            BucketsApp.New.Controller.newBucket();
        }
    };
    Ogre.on("buckets:list",function(){
        Ogre.navigate("buckets");
        API.listBuckets();
    });
    Ogre.on("bucket:view",function(id){
       Ogre.navigate("buckets/"+id);
        API.showBucket(id);
    });
    Ogre.on("bucket:edit",function(id){
        Ogre.navigate("buckets/"+ id +"/edit");
        API.editBucket(id);
    });
    Ogre.on("bucket:new",function(){
       Ogre.navigate("buckets/new");
       API.newBucket();
    });
    Ogre.addInitializer(function(){
       new BucketsApp.Router({
           controller: API
       });
    });
});
