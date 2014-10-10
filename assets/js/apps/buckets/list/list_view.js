Ogre.module("BucketsApp.List",function(List,Ogre,Backbone,Marionette,$,_){
    List.Layout = Marionette.Layout.extend({
       template: "#bucket-list-layout",
        regions:{
            panelRegion: "#panel-region",
            bucketsRegion: "#buckets-region"
        }
    });

    List.Panel = Marionette.ItemView.extend({
       template: "#bucket-list-panel",

       events: {
           "click button.jsNew" : "createNew"
       },
        createNew: function(e){
            e.stopPropagation();
            this.trigger("bucket:createNew");
        }
    });
    List.BucketView = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#bucket-list-item",
        events: {
            "click button.jsShow": "viewBucket"
        },
        viewBucket: function (e) {
            e.stopPropagation();
            this.trigger("bucket:view",this.model);
        }
    });

    List.BucketsView = Marionette.CollectionView.extend({
        tagName: "table",
        className: "table table-bordered",
        template: "#bucket-list",
        itemView : List.BucketView,
        itemViewContainer: "tbody",
        initialize: function(){
            this.listenTo(this.collection, "reset", function(){
                this.appendHtml = function(collectionView,itemView,index){
                    collectionView.$el.append(itemView.el);
                }
            });
       },
        onCompositeCollectionRendered:function(){
            this.appendHtml = function(collectionView,itemView,index){
                collectionView.$el.prepend(itemView.el);
            }
        }
    });
});
