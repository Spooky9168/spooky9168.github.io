// This script has been modified from the leaflet quickstart guide
console.log("Map Script has started....")
// Start of Start gude script
var map = L.map('map').setView([51.45, -2.555], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// End of start guide script
console.log("Map Script successful!")

var heat = L.heatLayer([   
	[51.45, -2.555, 1], // lat, lng, intensity   
	[51.45, -2.555, 0.9]   
], {radius: 30}).addTo(map);