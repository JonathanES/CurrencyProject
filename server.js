/**
 * package installed
 */
const express = require('express');
const http2 = require('spdy');
const logger = require('morgan');
const fs = require('fs');
const app = express();
/**
 *  files required
 */
const routes = require('./backend/routes');
/**
 * instantiation of the packages/files used
 */
app.use('/', routes);
app.use(logger('dev'));

/**
 *  Instantiation of the server
 */
var options = {
    key: fs.readFileSync('./https/server.key'),
    cert: fs.readFileSync('./https/server.crt')
}

/*http2
    .createServer(options, app)
    .listen(8080, () => {
        console.log(`Server is listening on https://localhost:8080.
  You can open the URL in the browser.`)
    }
)*/

app.listen(5000);