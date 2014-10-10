Ogre.module("BucketsApp.Common.Views",function(Views,Ogre,Backbone,Marionette,$,_){
   Views.Form = Marionette.ItemView.extend({
       template: "#bucket-form",
       events:{
           "click a.jsSubmit" : "updateBucket"
       },
       updateBucket: function(e){
           e.preventDefault();
           var data = Backbone.Syphon.serialize(this);
           this.trigger("form:submit",data);
       },
       onRender: function(){
           var $title = $("<h1>",{text : this.title});
           this.$el.prepend($title);
       }
   });
});