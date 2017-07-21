const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const api = require('./server/routes/api');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('public'));

app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser());
// Catch all other routes and return the index file










/*app.post('/saveProject', (req, res) => {
//req.body.sdate=d.getFullYear()+"-"+month+"-"+d.getDate();
console.log("Go To....")
//console.log(req);
})
app.get('/done', (req, res) => {
  console.log("Hell Yeah");
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/


app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));


app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8560';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

 console.log("\nStarting NxtGen AppBuilder...");
server.listen(port, () => console.log(`NxtGen App Builder is running on localhost:${port}`));