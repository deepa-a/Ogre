/**
 * Created by daravind on 7/10/2014.
 */
(function(Backbone){
     _.extend(Backbone.Marionette.Application.prototype, {
         navigate: function(route, options){
         options || (options = {});
         Backbone.history.navigate(route, options);
         },

     getCurrentRoute: function(){
         return Backbone.history.fragment
        }
    });
}(Backbone));