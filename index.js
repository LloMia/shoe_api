const express = require('express');
const app = express();
const session = require('express-session')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const shoeRoutes = require('./main');
const mongoose = require('mongoose');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/shoestock')
const routes = shoeRoutes(models);
const flash = require('express-flash');


app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
        next();
})


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));
app.set('view engine', 'handlebars');
app.use(session({
      secret :'keyboard cat',
      cookie : {maxAge: 60000 * 30},
}));
app.use(flash());
app.get('/', function(req, res) {
    res.redirect('/api');
})

app.get('/api/shoe', function(req,res, done){
  models.shoeStock.find({},function (err, results) {
    res.send(results)
  })
});
app.post('/api/shoe', routes.createStock);
app.get('/api/shoe/brand/:brandname', routes.brandname);
app.get('/api/shoe/size/:size', routes.brandsize);
app.get('/api/shoe/color/:color', routes.colorfil);
app.get('/api/shoe/brand/:brandname/size/:size', routes.brandAndSize);
app.post('/api/shoe/sold/:id', routes.stockSell);




app.set('port', process.env.PORT || 3006);
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
