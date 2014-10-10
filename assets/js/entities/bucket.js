Ogre.module("Entities", function (Entities,Ogre,Backbone,Marionette,$,_) {
    Entities.Bucket = Backbone.Model.extend({
        urlRoot: "buckets",
        defaults:{
            bucketName: "",
            bucketValue: "",
            bucketStartDate:""
        },
        validate: function(attrs,options){
            var errors = {}
            if(!attrs.bucketName){
                errors.bucketName = "Bucket Name cannot be empty";
            }
            if(!attrs.bucketValue){
                errors.bucketValue = "Bucket Value cannot be empty"
            }
            if(!attrs.bucketStartDate){
                errors.bucketStartDate = "Bucket start date cannot be empty"
            }
            if(!_.isEmpty(errors)){
                return errors;
            }
        }
    });
    Entities.configureStorage(Entities.Bucket);

    Entities.Buckets = Backbone.Collection.extend({
        url: "buckets",
        model: Entities.Bucket,
        comparator: "bucketName"
    });

    Entities.configureStorage(Entities.Buckets);

   var initializeBuckets = function () {
       var buckets = new Entities.Buckets([
            {
                id: 1,
                bucketName: "Free SMS",
                bucketValue: "10",
                bucketStartDate: "12/12/2014"
            },
            {
                id: 2,
                bucketName: "Free Calls",
                bucketValue: "20",
                bucketStartDate: "12/12/2014"
            }
        ]);
       buckets.forEach(function(bucket){
          bucket.save();
       });
       return buckets;
    };
    var API = {
      getBucketEntities: function () {
         var buckets = new Entities.Buckets();
         buckets.fetch();
          if(buckets.length === 0){
              return initializeBuckets();
          }
          return buckets;
      },
      getBucketEntity: function(bucketID){
        var bucket = new Entities.Bucket({id:bucketID });
        var defer = $.Deferred();
        setTimeout(function(){
            bucket.fetch({
                success: function(data){
                    defer.resolve(data);
                },
                error: function (data) {
                    defer.resolve(undefined);
                }
            });
        },2000);
        return defer.promise();
      }
    };

    Ogre.reqres.setHandler("bucket:entities", function () {
       return API.getBucketEntities();
    });
    Ogre.reqres.setHandler("bucket:entity",function(id){
       return API.getBucketEntity(id);
    });
});