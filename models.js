const mongoose = require('mongoose');
module.exports = function(mongoUrl){

    mongoose.connect(mongoUrl);

    const shoeStock = mongoose.model('shoestock', {
      color: String,
        brand: String,
        price: Number,
        size: Number,
        in_stock:Number
    });

    return {
        shoeStock
    };

};
