var express = require('express');
var app = express();
var http = require('http');
var expressLayouts = require('express-ejs-layouts');
var apiKey = '5c40c0443b3cd8ef57196df48e4f638a'

//App settings
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/weather', function(req, res) {
  res.render('weather'); 
});


//CALLBACK: Getting the data from the API server to display it to us: 
app.get('/weather/:city', function(request, response) {
    // In here we will make our HTTP request to the  API

    http.get('http://api.openweathermap.org/data/2.5/weather?q='+request.params.city + '&appid=' + apiKey, function(res) {
      var body = '';
      res.on('data', function(d) {
        body += d;
      });

      res.on('end', function() {
        var cityWeather = JSON.parse(body);
        response.send(cityWeather);
      });
    });
  });
//MY API KEY URL: http://api.openweathermap.org/data/2.5/weather?q=Edinburgh ,uk&appid=5c40c0443b3cd8ef57196df48e4f638a&units=metric


app.listen('3000', function() {
  console.log('Serving on port 3000')
});