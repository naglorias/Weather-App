'use strict';
// Variables declaration
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const gridWeather = document.querySelector('.weather-grid');
let maxTemps = document.querySelectorAll('.max-content');
let minTemps = document.querySelectorAll('.min-content');
let humidity = document.querySelectorAll('.humidity-content');
let icons = document.querySelectorAll('.day-temp img');
let label;
let direction;


/* Function to specify wind label according to wind speed data */
const getWindDesc = (speed) => {
    switch (true) {
        case (speed >= 0 && speed <= 0.2):
            return label = "Calm";
        case (speed >= 0.3 && speed <= 1.5):
            return label = "Light Air";
        case (speed >= 1.6 && speed <= 3.3):
            return label = "Light Breeze";
        case (speed >= 3.4 && speed <= 5.4):
            return label = "Gentle Breeze";
        case (speed >= 5.5 && speed <= 7.9):
            return label = "Moderate Breeze";
        case (speed >= 8.0 && speed <= 10.7):
            return label = "Fresh Breeze";
        case (speed >= 10.8 && speed <= 13.8):
            return label = "Strong Breeze";
        case (speed >= 13.9 && speed <= 17.1):
            return label = "Near Gale";
        case (speed >= 17.2 && speed <= 20.7):
            return label = "Gale";
        case (speed >= 20.8 && speed <= 24.4):
            return label = "Severe Gale";
        case (speed >= 24.5 && speed <= 28.4):
            return label = "Strong Storm";
        case (speed >= 28.5 && speed <= 32.6):
            return label = "Violent Storm";
        case (speed >= 32.7):
            return label = "Hurricane";
        default:
            return label = "anonymous"

    }
}


/* Function to specify wind direction according to wind degree data */
const getWindDir = (deg) => {
    switch (true) {
        case (deg >= 0 && deg < 22.5):
            return direction = "N";
        case (deg >= 22.5 && deg < 45):
            return direction = "NNE";
        case (deg >= 45 && deg < 67.5):
            return direction = "NE";
        case (deg >= 67.5 && deg < 90):
            return direction = "ENE";
        case (deg >= 90 && deg < 112.5):
            return direction = "E";
        case (deg >= 112.5 && deg < 135):
            return direction = "ESE";
        case (deg >= 135 && deg < 157.5):
            return direction = "SE";
        case (deg >= 157.5 && deg < 180):
            return direction = "SSE";
        case (deg >= 180 && deg < 202.5):
            return direction = "S";
        case (deg >= 202.5 && deg < 225):
            return direction = "SSW";
        case (deg >= 225 && deg < 247.5):
            return direction = "SW";
        case (deg >= 247.5 && deg < 270):
            return direction = "WSW";
        case (deg >= 270 && deg < 292.5):
            return direction = "W";
        case (deg >= 292.5 && deg < 315):
            return direction = "WNW";
        case (deg >= 315 && deg < 337.5):
            return direction = "NW";
        case (deg >= 337.5):
            return direction = "NNW";
        default:
            return direction = "anonymous";
    }
}


//Set Interval function to change app background 4 times(morning,noon,afternoon,evening/night) according to daytime
setInterval(() => {
    let hrs = new Date().getHours();
    let mins = new Date().getMinutes();
    let secs = new Date().getSeconds();
    secs = secs++;
    if (hrs >= 5) {
        document.body.style.backgroundImage = "linear-gradient(0deg,rgba(62, 81, 81, 0.3),rgba(222, 203, 164, 0.3)),url('imgs/morning.png')";
        document.querySelector('.cell1').style.backgroundImage = "url(imgs/morning.png)"
    }
    if (hrs >= 12) {
        document.body.style.backgroundImage = "linear-gradient(0deg,rgba(62, 81, 81, 0.3),rgba(222, 203, 164, 0.3)),url('imgs/noon.png')";
        document.querySelector('.cell1').style.backgroundImage = "url(imgs/noon.png)"

    }
    if (hrs >= 17) {
        document.body.style.backgroundImage = "linear-gradient(0deg,rgba(62, 81, 81, 0.3),rgba(222, 203, 164, 0.3)),url('imgs/afternoon.png')";
        document.querySelector('.cell1').style.backgroundImage = "url(imgs/afternoon.png)"

    }
    if (hrs >= 19 || hrs < 5) {
        document.body.style.backgroundImage = "linear-gradient(0deg,rgba(62, 81, 81, 0.3),rgba(222, 203, 164, 0.3)),url('imgs/night.png')";
        document.querySelector('.cell1').style.backgroundImage = "url(imgs/night.png)"

    }
}, 1000);


/* Function to convert sunset and sunrise data into hours and minutes  and return them*/
function getSetRise(n) {
    let myDate = new Date(n * 1000),
        hrs = myDate.getHours(),
        mins = myDate.getMinutes();
    // Check whether AM or PM
    let ampm = hrs >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format
    hrs = hrs % 12;
    // To display "0" as "12"
    hrs = hrs ? hrs : 12;
    mins = mins < 10 ? '0' + mins : mins;
    return `${hrs}:${mins} ${ampm}`
}

/* Function to display 8 days names and dates */
const checkDay = (day) => {
    if (day + new Date().getDay() > 6) {
        return day + new Date().getDay() - 7;
    } else {
        return day + new Date().getDay()
    }
}


const addDays = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return `${result.getDate()} / ${result.getMonth() + 1} `;
}

/* Loop to add day and date for every block one by one */
for (let i = 1; i < 8; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekdays[checkDay(i)];
    for (let j = 0; j < 8; j++) {
        document.getElementById("date" + (j + 1)).innerHTML = addDays(j);
    }
}


/**********Inserting Autocomplete geocoding api**************/
// Initialize an empty map without layers (invisible map)
const map = L.map('map', {
    center: [40.7259, -73.9805], // Map loads with this location as center
    zoom: 12,
    scrollWheelZoom: true,
    zoomControl: false,
    attributionControl: false,
});
//Geocoder options
const geocoderControlOptions = {
    bounds: false,          //To not send viewbox
    markers: false,         //To not add markers when we geocoder
    attribution: null,      //No need of attribution since we are not using maps
    expanded: true,         //The geocoder search box will be initialized in expanded mode
    panToPoint: false,       //Since no maps, no need to pan the map to the geocoded-selected location
    params: {               //Set dedupe parameter to remove duplicate results from Autocomplete
        dedupe: 1,
    }
}
//Initialize the geocoder
const geocoderControl = new L.control.geocoder('pk.bfdd95f3b517119011a7ce4cd63108f5', { placeholder: 'Enter City and Country', expanded: true }).addTo(map).on('select', function (e) {
    displayLatLon(e.feature.feature.display_name, e.latlng.lat, e.latlng.lng);
});
//Get the "search-box" div
const searchBoxControl = document.getElementById("search-box");

//Append the geocoder container to the "search-box" div
searchBoxControl.appendChild(geocoderControl.getContainer());

/* Calling weather api function and insert every data into its suitable place */

async function displayLatLon(display_name, lat, lng) {
    const apiKey = "7264687911839b8b751976441e14973a";
    Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${display_name}&lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (toJson) {
        // Log the data to the console
        // You would do something with both sets of data here
        gridWeather.innerHTML = ` 
        <div class="weather-cell cell1">
                            <div class="flex">
                                <div class="temp-details"> ${Number(toJson[0].current.temp).toFixed(0)}&#8451;,${getWindDesc(Number(toJson[0].current.wind_speed).toFixed(1))}</div>
                                <div class="temp-icon"><img src="http://openweathermap.org/img/wn/${toJson[0].current.weather[0].icon}.png"></div>
                                <div class="location">${toJson[1].sys.country},${toJson[1].name}</div>
                                <div class="timezone">${toJson[0].timezone}</div>
                            </div>
                        </div>
                        <div class="weather-cell cell2">
                            <div class="flex">
                                <div class="block blc1">
                                    <div class="title">Feels like</div>
                                    <div class="content">${Number(toJson[0].current.feels_like).toFixed(0)}&#8451;</div>
                                </div>
                                <div class="block blc2">
                                    <div class="title">Humidity</div>
                                    <div class="content"> ${toJson[0].current.humidity}%</div>
                                </div>
                                <div class="block blc3">
                                    <div class="title">Description</div>
                                    <div class="content">${toJson[0].current.weather[0].description}</div>
                                </div>
                            </div>
                        </div>
                        <div class="weather-cell cell3">
                            <div class="flex">
                                <div class="block blc4">
                                    <div class="title">Wind</div>
                                    <div class="content">${Number(toJson[0].current.wind_speed).toFixed(1)}m/s,${getWindDir(Number(toJson[0].current.wind_deg).toFixed(1))}</span>
                                    </div>
                                </div>
                                <div class="block blc5">
                                    <div class="title">Pressure</div>
                                    <div class="content">${toJson[0].current.pressure}hPa</div>
                                </div>
                                <div class="block blc6">
                                    <div class="title">Clearness</div>
                                    <div class="content">${toJson[0].current.weather[0].main}</div>
                                </div>
                            </div>
                        </div>
                        <div class="weather-cell cell4">
                            <div class="flex">
                                <div class="block blc7">
                                    <div class="title">Clouds</div>
                                    <div class="content">${toJson[0].current.clouds}</div>
                                </div>
                                <div class="block blc8">
                                    <div class="title">Max</div>
                                    <div class="content">${Number(toJson[1].main.temp_max).toFixed(0)}&#8451;</div>
                                </div>
                                <div class="block blc9">
                                    <div class="title">Min</div>
                                    <div class="content">${Number(toJson[1].main.temp_min).toFixed(0)}&#8451;</div>
                                </div>
                            </div>
                        </div>
                        <div class="weather-cell cell5">
                            <div class="flex">
                                <div class="block blc10">
                                    <div class="title">Uv index</div>
                                    <div class="content">${toJson[0].current.uvi}</div>
                                </div>
                                <div class="block blc11">
                                    <div class="title">Dew Point</div>
                                    <div class="content">${Number(toJson[0].current.dew_point).toFixed(0)}&#8451</div>
                                </div>
                                <div class="block blc12">
                                    <div class="title">Visibilty</div>
                                    <div class="content">${(Number(toJson[0].current.visibility)) / 1000}Km</div>
                                </div>
                            </div>
                        </div>
                        <div class="weather-cell cell6">
                            <div class="flex">
                                <div class="block blc13">
                                    <div class="title">Sunrise<span class="rise-icon"><img src="./imgs/sunrise.png"
                                                alt=""></span>
                                    </div>
                                    <div class="content">${getSetRise(toJson[0].current.sunrise)}</div>
                                </div>
                                <div class="block blc14">
                                    <div class="title">Sunset<span class="set-icon"><img src="./imgs/sunset.png"
                                                alt=""></span>
                                    </div>
                                    <div class="content">${getSetRise(toJson[0].current.sunset)}</div>
                                </div>
                            </div>
                        </div>
       `
        //Loop to insert 8 days maximum temp value and minmum temp value into their places

        for (let i = 0; i < maxTemps.length, i < minTemps.length, i < humidity.length,i<icons.length; i++) {
            
            maxTemps[i].innerHTML = `${Number(toJson[0].daily[i].temp.max).toFixed(0)} &#8451`;
            minTemps[i].innerHTML = `${Number(toJson[0].daily[i].temp.min).toFixed(0)} &#8451`;
            humidity[i].innerHTML = `${Number(toJson[0].daily[i].humidity)}%`;
            icons[i].src=`http://openweathermap.org/img/wn/${toJson[0].daily[i].weather[0].icon}.png`;
            /* document.querySelectorAll(`#temp-max${(i+1)} .temp-content`)[i].innerHTML = `${Number(toJson[0].daily[i].temp.max).toFixed(0)} &#8451`;
               document.getElementById("temp-min" + (i + 1)).innerHTML = `${Number(toJson[0].daily[i].temp.min).toFixed(0)} &#8451`;
          document.getElementById('humidity-' + (i + 1)).innerHTML = `${Number(toJson[0].daily[i].humidity)}%`;
              document.getElementById("image-" + (i + 1)).src = `http://openweathermap.org/img/wn/${toJson[0].daily[i].weather[0].icon}.png`; */
        }
        console.log(toJson);
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });
}
