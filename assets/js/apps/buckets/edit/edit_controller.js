/**
 * Created by daravind on 2/10/2014.
 */
Ogre.module("BucketsApp.Edit",function(Edit,Ogre,Backbone,Marionette,$,_){
    Edit.Controller ={
        editBucket: function(id){
            var loadingView = new Ogre.Common.Views.Loading();
            Ogre.mainRegion.show(loadingView);

            var fetchingBucket = Ogre.request("bucket:entity",id);

            $.when(fetchingBucket).done(function(bucket){
                var bucketFormView;
                if(bucket !== undefined) {
                    bucketFormView = new Edit.Bucket({
                        model: bucket
                    });

                    bucketFormView.on("form:submit",function(data){
                        if(bucket.save(data)){
                           Ogre.trigger("bucket:view",bucket.get("id"));
                        }
                        else{
                            bucketFormView.triggerMethod("form:data:invalid",bucket.validationError);
                        }

                    });
                }
                else{
                    bucketFormView = new Ogre.BucketsApp.Show.NoDataView();
                }

                Ogre.mainRegion.show(bucketFormView);
            });
        }
    }
});
