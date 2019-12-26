/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//function that utilizes the geolocation api within hardware that has it enabled
function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

//if successful, the longitude and latitude are extracted from the data obtained
function onSuccess(p) {
    var city = document.querySelector('input[name=city]').value;
    var long = p.coords.longitude;
    var lat = p.coords.latitude;
    var price = document.querySelector('input[name=price]:checked').value;
    var favCat = [];
    $.each($("input[name='category']:checked"), function(){
        favCat.push($(this).val());
    });

    //geolocation is Eventbrite API if user has not filled out city
    if ( $.trim(city) == '' ) {
        getEvents(price, favCat, long, lat);
    } else {
        getCity(city, favCat);
    }
}

//if failed, geolocation is pulled from user input
function onError(err) {
    var city = document.querySelector('input[name=city]').value;
    var favCat = [];
    $.each($("input[name='category']:checked"), function(){
        favCat.push($(this).val());
    });
    
    //if city input is empty, user is given an alert
    if ( $.trim(city) == '' ) {
        alert('The application was unable access Location Services, please enter a city.');
    } else {
        //finds longitude and latitude based on city
        getCity(city, favCat);
        //alert(city);
    }
}

//creates a query using city from user input
function getCity(city, favCat) {
    var favCat = favCat;
    var api = "https://maps.googleapis.com/maps/api/geocode/json?address=",
        city = city,
        key = "&key=AIzaSyAGIyQGgE0HsJAQbot3_0WykigZe-yI8Q0";
    var locationUrl = api + city + key;
    
    //Query is then used in a fetch to obtain json data from Google Geocoding API
    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {
            var long = data.results[0].geometry.location.lng;
            var lat = data.results[0].geometry.location.lat;
        
            //sends long & lat from Google API to Eventbrite API
            getEvents('free', favCat, long, lat);        
            //alert( data.results[0].address_components[0].long_name + "\nLatitude: " + lat + "\nLongitude: " + long );
        })
        .catch(err => console.error(err));
}

//this method create a query based off the data obtained from getLocation()
function getEvents(price, favCat, long, lat) {
    var api = "https://www.eventbriteapi.com/v3/",
        mode = "events/search/?",
        priceSelected = "price=" + price,
        categories = "&categories=" + favCat,
        longitude = "&location.longitude=" + long,
        latitude = "&location.latitude=" + lat,
        key = "&token=64LVGTHBVTYPBLEZJ7D2";
    var eventUrl = api + mode + priceSelected + categories + longitude + latitude + key;

    var eTable = document.getElementById('results');
    
    //ensures that categories recieved is not empty
    if (favCat == "") {
        alert("Please select at least one event category");
    } else {
        //category is not empty, clears previous search result if exists
        eTable.innerHTML = "";
    }    

    
    fetch(eventUrl)
        .then(response => response.json())
        .then(data => {
            for ( let f = 0; f < favCat.length; f++) {
                var categoryid = favCat[f];
                
                //setting up table header for event entries
                eTable.innerHTML += "<tr><th class='eTableCategoryName' colspan='3'>" + $('label[value=' + categoryid + ']').text() + "</th></tr>" ;
                eTable.innerHTML += "<tr><th>Event</th><th>Time</th><th>Day</th></tr>";
                
                //reads through json recived from Eventbrite API
                for( let i = 0; i < data.events.length; i++ ) {
                    var eName = data.events[i].name.text;
                    //event time and day is returned in a single string, this splits them into an array
                    var arr = data.events[i].start.local.split("T");
                    
                    //filters json, matches entries category id to corresponding table
                    if ( data.events[i].category_id == categoryid ) {
                        //enters event name, start time, and day into results table
                        eTable.innerHTML += "<tr><td>" + eName + "</td><td>" + arr[1] + "</td><td>" + arr[0] + "</td></tr>";
                    } 
                }
                //creates space between categories
                eTable.innerHTML += "<br/>";
            }
        })
        .catch(err => console.error(err));
}
