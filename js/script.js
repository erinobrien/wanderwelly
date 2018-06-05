var trailUrl = "https://www.hikingproject.com/data/get-trails?"; //the url for the API (more is added to it later)
var maxDistance = 100; // Max distance, in miles, from lat, lon. Default: 30. Max: 200.
var maxResults = 500; // Max number of trails to return. Default: 10. Max: 500.
var sort = "quality"; // Values can be 'quality', 'distance'. Default: quality.
var minLength = 0; // Min trail length, in miles. Default: 0 (no minimum).
var minStars = 0; // Min star rating, 0-4. Default: 0.
var lat = 0; // where the users latitude is stored
var lon = 0; // where the users longitude is placed
var map; // where the map is stored

//this method starts the google maps
function initMap(){
    //if the user agrees to have their location known
    if (navigator.geolocation) {

                //get the users location (latitude and longitude)
                navigator.geolocation.getCurrentPosition(function showPosition(position){
                    var uluru = {lat: position.coords.latitude, lng: position.coords.longitude}; //users location
                    var infowindow = new google.maps.InfoWindow(); //information window for the markers on the map
                    map = new google.maps.Map(document.getElementById('map'), { // make a new make with the users location being the center and zoom it in at 7 (amount the map is zoomed in at the start)
                      zoom: 7,
                      center: uluru
                    });
                    var marker = new google.maps.Marker({ //make and place the marker for the user using their location
                      position: uluru,
                      map: map
                    });
                    google.maps.event.addListener(marker, 'mouseover', function() { // if the user hovers over a marker then the information window will open to show info about the users marker
                      infowindow.setContent('<div><strong> YOU ARE HERE </strong></div>');
                      infowindow.open(map, this);
                    });
                    google.maps.event.addListener(marker, 'mouseout', function() { // if the user stops hovering over the marker then the info window on the marker will close
                      infowindow.close(map, this);
                    });
                }, showError);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
}


//this medthod is where the site first starts off
function initSite() {
    //if the user agrees to have thier location known
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function showPosition(position){ // find the location of the user
            lat = position.coords.latitude; // get the lat
            lon = position.coords.longitude; // get the lon
            sendApiRequest(trailUrl + "lat="+lat+"&lon="+lon+"&maxDistance="+maxDistance+"&maxResults="+maxResults+"&sort="+sort // send a request to the Trails API and obtain the data. then read it
                +"&minLength="+minLength+"&minStars="+minStars+"&key=200257122-8b8431c7ca3cd07d849051cf9a3eb2f3");
        }, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function sendApiRequest(url) {
    var count = 1; // used to ensure only 3 suggestions are placed. once the count reaches 4 then the suggestions will stop being placed

    fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
        .then(function(data) {
            data.trails.forEach(function (item){ //for each trail that the api returns do all of the below
                if(item.imgMedium){ //if the trail has an image attached

                    var milesToKm = parseInt(item.length * 1.62);
                    if(count < 4 && item.stars == 5){ //if the trail is rated 5 stars and if there is space in the suggestions

                        //sends it to the html so it is displayed
                        // var imagegridimage = "<div class=\"pin\">"+
                        // "<img src=\""+item.imgMedium+"\" style=\"width:100%\">"+ //adds an image
                        // "<h1>" + item.name + "</h1>" + //adds the name
                        // "<p>" + item.summary + "</p>" + //adds a summary
                        // "<p>Length: " + milesToKm + " Kilometers &nbsp;&nbsp;&nbsp; Rating: "+item.stars+" Stars</p>" + //adds the length of the trail and the rating
                        // "</div>";


// var imagegridimage = '<div class="col-xs-12 col-sm-4 img">';
// imagegridimage += '<img src="'+item.imgMedium+'" class="img-thumbnail">';
// imagegridimage += '<i></i>';
// imagegridimage += '<div class="ptext">';
// imagegridimage += '<button class="btn btn-success">Join</button>';
// imagegridimage += '<div class="border trans">';
// imagegridimage += item.name;
// imagegridimage += '</div>';
// imagegridimage += '</div>';
// imagegridimage += '</div>';



var html = '<div class="col-sm-6 col-md-4">';
html += '<div class="thumbnail">';
html += '<div class="img">';
html += '<img src="'+item.imgMedium+'" style="height: 24em !important;width:100% !important">';
html += '<i></i>';
html += '<div class="ptext3">';
html += '<button class="btn btn-success">VIEW</button>';
// html += '<div class="border trans">';
// html += item.name;
// html += '</div>';
html += '</div>';
html += '</div>';

html += '<div class="caption">';
html += '<h3>'+item.name+'</h3>';
html += '<p>' + item.summary + '</p>';
html += '<p>';
html += '<span>Length: '+milesToKm +'km </span>&nbsp;&nbsp;&nbsp;';
html += '<span>Rating: '+item.stars+' Stars</span>';
html += '</p>';
html += '</div>';
html += '</div>';
html += '</div>';

$('#columns').append(html);

//                        $('#columns2').append(imagegridimage);//sends it to the html so it is displayed
                        count++; //cound goes up as a suggestion has been placed
                    }else{

                        //sends it to the html so it is displayed
                        // var imagegridimage = "<div class=\"pin\">"+
                        // "<img src=\""+item.imgMedium+"\" style=\"width:100%\">"+
                        // "<h1>" + item.name + "</h1>" +
                        // "<p>" + item.summary + "</p>" +
                        // "<p>Length: " + milesToKm + " Kilometers &nbsp;&nbsp;&nbsp; Rating: "+item.stars+" Stars</p>" +
                        // "</div>";

var html = '<div class="col-sm-6 col-md-4 img">';
html += '<div class="thumbnail">';
html += '<div class="img">';
html += '<img src="'+item.imgMedium+'" style="height: 24em !important;width:100% !important">';
html += '<i></i>';
html += '<div class="ptext3">';
html += '<button class="btn btn-success">VIEW</button>';
// html += '<div class="border trans">';
// html += item.name;
// html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="caption">';
html += '<h3>'+item.name+'</h3>';
html += '<p>' + item.summary + '</p>';
html += '<p>';
html += '<span>Length: '+milesToKm +'km  </span>&nbsp;&nbsp;&nbsp;';
html += '<span>Rating: '+item.stars+' Stars</span>';
html += '</p>';
html += '</div>';
html += '</div>';
html += '</div>';
$('#columns').append(html);

                   //     $('#columns').append(imagegridimage);//sends it to the html so it is displayed
                    }
                }

                //the code below is used to create a new marker for the current trail that is being read from the API
                var curMarker = {lat: item.latitude, lng: item.longitude}; // the location of the trail is made
                var infowindow = new google.maps.InfoWindow(); // the info window is made
                var marker = new google.maps.Marker({ // the marker for the trail is placed
                  position: curMarker,
                  map: map,
                });
                google.maps.event.addListener(marker, 'mouseover', function() {  // if the user hovers over a marker then the information window will open to show info about the trails marker
                  infowindow.setContent('<div><p>'+item.name+'</p><p>'+item.summary+'</p><p>Length: '+item.length+' Miles &nbsp;&nbsp;&nbsp; Rating: '+item.stars+' Stars</p></div>');
                  infowindow.open(map, this);
                });
                google.maps.event.addListener(marker, 'mouseout', function() { // if the user stops hovering over the marker then the info window on the marker will close
                  infowindow.close(map, this);
                });
            });
        })
        .catch(function() {
            // This is where you run code if the server returns any errors
            console.log(error);
        });
}

 //if any errors happen while finding the users location then come here
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
