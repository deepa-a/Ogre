/**
 * Created by daravind on 2/10/2014.
 */
Ogre.module("BucketsApp.Show",function(Show,Ogre,Backbone,Marionette,$,_){
   Show.Controller ={
       showBucket: function(id){

           var loadingView = new Ogre.Common.Views.Loading();
           Ogre.mainRegion.show(loadingView);

           var fetchingBucket = Ogre.request("bucket:entity",id);
           $.when(fetchingBucket).done(function(bucket){
               var bucketView;
               if(bucket !==undefined) {
                   bucketView = new Show.Bucket({
                       model: bucket
                   });

                   bucketView.on("bucket:edit",function(bucket){
                       Ogre.trigger("bucket:edit",bucket.get("id"));
                   });

                   bucketView.on("bucket:delete", function (model) {
                       model.destroy();
                   });
               }
               else{
                   bucketView = new Show.NoDataView();
               }
               Ogre.mainRegion.show(bucketView);
           });
       }
   }
});
