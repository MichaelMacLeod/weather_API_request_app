// alert('WORKING!!!!!!')

//First, set up a Book constructor: 
var City = function(name) {
  this.url = 'http://localhost:3000/weather/' + name;
  this.data;
}


//In JS, objs inheret from other objs. Instead of defining methods above, where we'd have to define the functions every time, we can create them below to be reused. 
City.prototype = {
  get: function(callback) {
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function() {
      that.data = JSON.parse(request.responseText);
      callback();
    }
    request.send(null);
  }
}


window.onload = function() {

  var form = document.querySelector('#citySearch');
  var input = document.querySelector('#cityInput');
  var cityView = document.querySelector('#weatherDisplay');
  var storedCitiesView = document.querySelector('#storedCities');

  var cities = JSON.parse( localStorage.getItem('cities') ) || [];

  var displayCities = function() {
//Clear the loop so we don't duplicate the list: 
    storedCityView.innerHTML = '';
    for (city in cities) {
      var data = cities[city];

      var li = document.createElement('li');
      li.innerHTML = data.name + city "</h2>"; 
      storedCityView.appendChild(li);
    }

  };

//Below, activated when user hits submit:
  form.onsubmit = function(event) {
    event.preventDefault();
    var name = input.value;
    var currentCity = new City(name);

    //currentBook is an object of the Book object we created at the top of the page. 

//Here's a callback. When you see a function as an argument, it's a callback. 
    currentCity.get(function() {
      var data = currentCity.data;
      var cityDisplay = "<h4> Here is the " + data.name + "</h4><h3> forecast: " + data.weather[0].main + "</h3><button id='addCity'>Add city to list</button>"; 
      cityView.innerHTML = cityDisplay;

      document.querySelector('#addCity').onclick = function() {
        cities.push(data);
        localStorage.setItem('cities', JSON.stringify(cities));
        displayCities();
      }

    });

  }

  displayCities();

}



//Still to come: remove books function. 