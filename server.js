let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   }).catch(error => {
      console.log('Database could not connected: ' + error)
   })

const productRoute = require('../eshop/routes/product.route')
const categoryRoute = require('../eshop/routes/category.route')
const userRoute = require('../eshop/routes/user.route')


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api/product', productRoute);
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoute);
app.all('/', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next()
 });

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
   next(new Error(Error.name));
});

app.use(function (err, req, res, next) {
  console.error(err.message); 
  if (!err.statusCode) err.statusCode = 500; 
  res.status(err.statusCode).send(err.message); 
});

