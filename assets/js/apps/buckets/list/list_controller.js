Ogre.module("BucketsApp.List",function(List,Ogre,Backbone,Marionette,$,_){
    List.Controller = {
        listBuckets: function () {

            var loadingView = new Ogre.Common.Views.Loading();
            Ogre.mainRegion.show(loadingView);

            var fetchingBuckets = Ogre.request("bucket:entities");

         $.when(fetchingBuckets).done(function(buckets){
               var bucketsListLayout = new List.Layout();
               var bucketsListPanel = new List.Panel();
                var bucketsView = new List.BucketsView({
                    collection: buckets
                });

                bucketsListLayout.on("show",function(){
                    bucketsListLayout.panelRegion.show(bucketsListPanel);
                    bucketsListLayout.bucketsRegion.show(bucketsView);
                });

                bucketsListPanel.on("bucket:new",function(){
                    Ogre.trigger("bucket:new",bucket.get("id"));
                });

                bucketsView.on("itemview:bucket:view",function(childView,model){
                    Ogre.trigger("bucket:view",model.get("id"))
                });

                Ogre.mainRegion.show(bucketsListLayout);
            });


        }

    }
});