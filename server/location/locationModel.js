var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  location : {
    type: { 
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
});

LocationSchema.index({ location : '2dsphere' });

module.exports = Location = mongoose.model('Location', LocationSchema);

LocationSchema.methods.getNear = function () {
  //TODO
  // Location.find({location : {
  //     $near : {
  //       $geometry : {
  //         type : "Point",
  //         coordinates : this.coordinates
  //       },
  //       $maxDistance : 1000
  //     }
  //   }
  // });
};

// ALTERNATIVE ?
// var options = { near: [10, 10], maxDistance: 5 };
// Locations.geoSearch({ type : "house" }, options, function(err, res) {
//   console.log(res);
// });

