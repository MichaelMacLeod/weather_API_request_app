var express = require('express');
var app = express();

// app.get('/weather', function(req, res) {
//   res.send('Hello World!') 
// });

app.get('/weather/:location', function(request, response) {
    // In here we will make our HTTP request to the Open Library API
});


app.listen('3000', function() {
  console.log('Serving on port 3000')
});
