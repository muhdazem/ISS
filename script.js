
let latitudeText = document.querySelector('.latitude');
let longitudeText = document.querySelector('.longitude');
let timeText = document.querySelector('.time');
let speedText = document.querySelector('.speed');
let altitudeText = document.querySelector('.altitude');
let visibilityText = document.querySelector('.visibility');

let lat = 4.2105;
let long = 101.9758;
let zoomLevel = 8;

const icon = L.icon({
  iconUrl: './img/iss.png',
  iconSize: [90, 45],
  iconAnchor: [25, 94],
  popupAnchor: [20, -86]
});

const map = L.map('map-div').setView([lat, long], zoomLevel);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiYWthc2hpOTciLCJhIjoiY2t3b3owOWp5MDdxMDJvbThwcW1mOXd5OSJ9.0guLnNaxBOWVjyEwFW-sNg'
}).addTo(map);


const marker = L.marker([lat, long], { icon: icon }).addTo(map);


function findISS() {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
  .then(response => response.json())
  .then(data => {
    lat = data.latitude.toFixed(2);
    long = data.longitude.toFixed(2);
    const timestamp = new Date(data.timestamp * 1000).toUTCString();
    const speed = data.velocity.toFixed(2);
    const altitude = data.altitude.toFixed(2);
    const visibility = data.visibility;

    updateISS(lat, long, timestamp, speed, altitude, visibility);
  })
  .catch(e => console.log(e));
}


function updateISS(lat, long, timestamp, speed, altitude, visibility) {

  marker.setLatLng([lat, long]);
 
  map.setView([lat, long]);

  latitudeText.innerText = lat;
  longitudeText.innerText = long;
  timeText.innerText = timestamp;
  speedText.innerText = `${speed} km/hr`;
  altitudeText.innerText = `${altitude} km`;
  visibilityText.innerText = visibility;
}

findISS();


setInterval(findISS, 2000);
