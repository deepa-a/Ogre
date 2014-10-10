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
       },
       onFormDataInvalid: function(errors){
           var $view = this.$el;
           var clearFormErrors = function(){
               var $form = $view.find("form");
               $form.find(".help-inline.error").each(function(){
                  $(this).remove();
               });
               $form.find(".control-group.error").each(function(){
                  $(this).removeClass("error");
               });
           }
           var markErrors = function(value, key){
               var $controlGroup = $view.find("input[name="+key+"]").parent();
               var $errorEl = $("<span>",{class: "help-inline error", text: value});
               $controlGroup.append($errorEl).addClass("error");
           }

           clearFormErrors();
            _.each(errors,markErrors);
        }
   });
});