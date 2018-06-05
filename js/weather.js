var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?"; //the url for the API (more is added to it later)
        var key = "40ce2b9cc1aefeee3993e6575c6ada2c";

        function initSite() { 
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function showPosition(position){ 
                    sendApiRequest(weatherApiUrl+"lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&APPID="+key);
                }, showError);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function sendApiRequest(url) {

            fetch(url)
                .then((resp) => resp.json())
                .then(function(data) {
                    var temp = parseInt(data.main.temp)-273;
                    data.weather.forEach(function (item){
                        document.getElementById("weather").innerHTML+= 
                                "<p>"+item.description+"</p>"+
                                "<img src=img/"+item.icon+".png>"+
                                "<p>Humidity: "+data.main.humidity+"</p>"+
                                "<p>Temperature: "+temp+"</p>"+
                                "<p>Wind Speed: "+data.wind.speed+"</p>";            
                            });
                })
                .catch(function() {
                    console.log(error);
                });
        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "An unknown error occurred."
                    break;
            }
        }

        initSite();