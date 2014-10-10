Ogre.module("BucketsApp.New",function(New,Ogre,Backbone,Marionette,$,_){
   New.Bucket = Ogre.BucketsApp.Common.Views.Form.extend({
      title : "Create Bucket",
       onRender: function() {
           this.$(".jsSubmit").text("Create");
       }
   }) ;
});