Ogre.module("BucketsApp.New",function(New,Ogre,Backbone,Marionette,$,_){
   New.Controller = {
       newBucket : function(){

           var loadingView = new Ogre.Common.Views.Loading();
           Ogre.mainRegion.show(loadingView);

           //  var bucket = Ogre.request("bucket:entity");
           var fetchingBuckets = Ogre.request("bucket:entities");
           $.when(fetchingBuckets).done(function(buckets){
               var fetchingBucket = Ogre.request("bucket:entity");
               $.when(fetchingBucket).done(function (bucket) {
                   var bucketFormView = new New.Bucket({
                       model: bucket
                   });

                   bucketFormView.on("form:submit",function(data){
                       var highestID = buckets.max(function(c){return c.id});
                       highestID = highestID.get("id");
                       data.id = highestID+1;
                       if(bucket.save(data)){
                           buckets.add(bucket);
                           Ogre.trigger("buckets:list");
                       }
                       else{
                           bucketFormView.triggerMethod("form:data:invalid",bucket.validationError);
                       }

                   });
                   Ogre.mainRegion.show(bucketFormView);
               });
           });
       }
   }
});