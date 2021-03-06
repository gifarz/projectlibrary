var express = require('express');
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');
var cors = require('cors')
var path = require('path')

app.use(bodyParser.json());
app.use(morgan('common'))
app.use(cors())

app.use(express.static('client/build'));

require('./app/router/router.js')(app);

//  const db = require('./app/configs/db.js');

//  const Role = db.role;

 //force: true will drop the table if it already exists (comment this part after first run, to disable migration)
//  db.sequelize.sync({ force: true }).then(() => {
//      console.log('Drop and Resync with { force: true }');
//      initial();
//  });

// require('./app/routers/router.js')(app);

app.get('*', (req,res) =>{
    res.sendfile(path.resolve(__dirname+'./client/build/index.html'));
});

// Create a Server
var port = process.env.PORT || 8001;
app.listen(port)
console.log(`App is listening to port ${port}`)


// var server = app.listen(port1, "127.0.0.1", function() {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("App listening at http://%s:%s", host, port);
// });


//  function initial() {
//      Role.create({
//          id: 1,
//          name: "USER"
//      });

//      Role.create({
//          id: 2,
//          name: "ADMIN"
//      });

//      Role.create({
//          id: 3,
//          name: "PM"
//      });
//  }