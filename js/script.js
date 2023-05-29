var apiKey = 'f74233d2d7716b57f202813bce38873f';
var searchInput = $('.weather-search');
var todayCard = $('.today-card');
var forecastCard = $('.forecast-card');      
var listGroup = $('.list-group');
var forMedia = $('.forMedia');
var forMediaForecast = $('.forMediaForecast');

function noCity() {
    todayCard.html('<p>Please type a city to search.</p>')
}

function displayWeather(currentData){
    todayCard.html('');
    var city = searchInput.val().trim();
    var todayDate = moment().format("LL");
    var iconImgCurrent = currentData.weather[0].icon;

    if(!city) {
        noCity();
    } else if(city && document.body.style.maxWidth<= 468){
        forMedia.append(`
        <div class="weather-card-main">
           <h3>${currentData.name}   (${todayDate}) </h3>
           <img src="http://openweathermap.org/img/wn/${iconImgCurrent}.png" height="100" width="100">
           <p>Temp: ${Math.round(currentData.main.temp)}℃</p>
           <p>Wind: ${Math.round(currentData.wind.speed)}m/s</p>
           <p>Humidity: ${currentData.main.humidity}%</p>
        </div>
        `)
    } else{
        todayCard.append(`
        <div class="weather-card-main">  
           <h3>${currentData.name}   (${todayDate}) </h3>
           <img src="http://openweathermap.org/img/wn/${iconImgCurrent}.png" height="100" width="100">
           <p>Temp: ${Math.round(currentData.main.temp)}℃</p>
           <p>Wind: ${Math.round(currentData.wind.speed)}m/s</p>
           <p>Humidity: ${currentData.main.humidity}%</p>
        </div>
        
       `)
    }

    

}

function displayForecast(forecastData){
    forecastCard.html('');
    var city = searchInput.val().trim();
    
    if(document.body.style.maxWidth <= 468){
        for(var i=4; i < 37; i+=8) {
            var iconImgForecast = forecastData.list[i].weather[0].icon;
            var forecastDay = forecastData.list[i].dt_txt
            var dayFormat = moment(forecastDay).format('LL');
            
            forMediaForecast.append(`
              <div class="weather-card">
                  <h3>${dayFormat}</h3>
                  <img src="http://openweathermap.org/img/wn/${iconImgForecast}@2x.png">
                  <p>Temp: ${Math.round(forecastData.list[i].main.temp)}℃</p>
                  <p>Wind: ${Math.round(forecastData.list[i].wind.speed)}m/s</p>
                  <p>Humidity: ${forecastData.list[i].main.humidity}%</p>
              </div>
                  
              `)
          } 

    } else {
        for(var i=4; i < 37; i+=8) {
            var iconImgForecast = forecastData.list[i].weather[0].icon;
            var forecastDay = forecastData.list[i].dt_txt
            var dayFormat = moment(forecastDay).format('LL');
            
            forecastCard.append(`
              <div class="weather-card">
                  <h3>${dayFormat}</h3>
                  <img src="http://openweathermap.org/img/wn/${iconImgForecast}@2x.png">
                  <p>Temp: ${Math.round(forecastData.list[i].main.temp)}℃</p>
                  <p>Wind: ${Math.round(forecastData.list[i].wind.speed)}m/s</p>
                  <p>Humidity: ${forecastData.list[i].main.humidity}%</p>
              </div>
                  
              `)
          } 

    }

    



}

function getWeather(event) {
    event.preventDefault();
    var city = searchInput.val().trim();
    

    if (city) {
        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
         .then(function(currentData) {
            var lat = currentData.coord.lat;
            var lon = currentData.coord.lon;
            
            
            displayWeather(currentData);
            searchInput.val('');

            $.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric&lat=${lat}&lon=${lon}`)
            .then(function(forecastData){

            displayForecast(forecastData);

            
          
            var key = forecastData.city.id;
            localStorage.setItem(key, city);

           
            var storedSearch = localStorage.getItem(key);

            if(storedSearch) {
               listGroup.append(`
               <button id='${key}' class='search-history'>${storedSearch}</button>
            
              `)
            }               
            
        })
            
        })
        
        
    } else {
        noCity();
    }

}
   
function init() { 
    $('.search-button').on('click', getWeather); 
   
}

init();




