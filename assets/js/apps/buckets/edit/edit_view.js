Ogre.module("BucketsApp.Edit",function(Edit,Ogre,Backbone,Marionette,$,_){
    Edit.Bucket = Ogre.BucketsApp.Common.Views.Form.extend({
       initialize: function(){
           this.title = "Edit " + this.model.get("bucketName");
       },
        onRender: function(){
           this.$(".jsSubmit").text("Update");
        }
    });

});
