
const port = process.env.PORT || 3000;
var http = require('http');
const app = require('./app');
http.createServer(app).listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
