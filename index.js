var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var app = express();

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  //cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  liveQuery: {
    classNames: ['ToDoList', 'Chat']
  },
  serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
});

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
    }
  ]
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// app.listen(1337, function () {
//   console.log('parse-server-example running on port 1337.');
// });

var httpServer = require('http').createServer(app);
httpServer.listen(1337);
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);
