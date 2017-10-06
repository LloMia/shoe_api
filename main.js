module.exports = function(models) {

    const createStock = function(req, res, done) {
        var data = req.body

        models.shoeStock.create({
            color: data.color,
            brand: data.brand,
            price: data.price,
            size: data.size,
            in_stock: data.in_stock
        }, function(err, results) {
            if (err) {
                return done(err)
            }
            if (results) {

                res.send(results)
            }
        })

    }
    const brandname = function(req, res, done) {
        var brand = req.params.brandname
        models.shoeStock.find({
            brand: brand
        }, function(err, results) {
            if (err) {
                return done(err)
            }

            res.send(results)
        })

    }

    const brandsize = function(req, res, done) {
        var size = req.params.size
        models.shoeStock.find({
            size: size
        }, function(err, result) {
            if (err) {
                return done(err)
            }

            res.send(result)
        })
    }

    const colorfil = function(req, res, done) {
        var color = req.params.color
        models.shoeStock.find({
            color: color
        }, function(err, result) {
            if (err) {
                return done(err)
            }

            res.send(result)
        })
    }

    const brandAndSize = function(req, res, done) {
        var brand = req.params.brandname
        var size = req.params.size

        models.shoeStock.find({
            brand: brand,
            size: size
        }, function(err, result) {
            if (err) {
                return done(err)
            }

            res.send(result)
        })
    }

    const stockSell = function(req, res, done) {
    var id = req.params.id

    models.shoeStock.findOneAndUpdate({
          _id: id
        }, {
        $inc: {
          "in_stock" : -1
        }
      },{
        upsert : false
      }, function(err, results) {
        if (err) {
          return done(err)
        }
        if (results.in_stock < 1){
            results.remove()
        }
        res.send(results)

      })
      // window.location.reload(true);
    }



    return {
        createStock,
        brandname,
        brandsize,
        brandAndSize,
        colorfil,
        stockSell
    }
}
