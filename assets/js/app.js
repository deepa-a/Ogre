var Ogre = new Marionette.Application();

Ogre.addRegions({
    mainRegion: "#main-region"
});

Ogre.on("initialize:after",function(){
   if(Backbone.history){
       Backbone.history.start();

       if(this.getCurrentRoute() === ""){
           this.navigate("buckets");
           Ogre.BucketsApp.List.Controller.listBuckets();
       }
   }
});
