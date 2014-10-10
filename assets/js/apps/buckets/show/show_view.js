/**
 * Created by daravind on 2/10/2014.
 */
Ogre.module("BucketsApp.Show",function(Show,Ogre,Backbone,Marionette,$,_){
   Show.NoDataView = Marionette.ItemView.extend({
      template: "#missing-view"
   });
   Show.Bucket = Marionette.ItemView.extend({
      template: "#bucket-view",
       events:{
           "click a.jsEdit" : "editBucket",
           "click a.jsDelete": "deleteBucket"
       },
       editBucket: function(e){
           e.stopPropagation();
           this.trigger("bucket:edit",this.model);
       },
       deleteBucket: function(e){
           e.stopPropagation();
           this.trigger("bucket:delete",this.model);
       }
   });
});