#!/usr/bin/env nodejs

const express = require('express');
// const path = require('path');
const helmet = require('helmet');
const app = express();
const port = 10002;

app.use(helmet.permittedCrossDomainPolicies());
// don't set HTST header its already set by nginx
app.use(helmet({
  hsts: false
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  },
  disableAndroid: true
}));

app.use(helmet.referrerPolicy({ policy: 'same-origin' }));



// define path from where to server static files, in our case 
// root directory so we don't need to add any path
//app.use(express.static(path.join(__dirname)));
app.use(express.static('dist'))

// start listening on port 
app.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line
    console.log("Something bad happened !!!", err);
  }
  // eslint-disable-next-line
  console.log("Homepage 2 app listening on port", port);
});

// Graceful shutdown
process.on("SIGINT", () => {
  // const cleanUp = () => {
  // Clean up other resources like DB connections
  // }
  // eslint-disable-next-line
  console.log("Closing server...");

  app.close(() => {
    // eslint-disable-next-line
    console.log("Server closed !!! ");
    // cleanUp();
    process.exit();
  })
  // Force close server after 3secs
  setTimeout((e) => {
    // eslint-disable-next-line
    console.log("Forcing server close !!!", e)
    //cleanUp()
    process.exit(1)
  }, 3000)
});