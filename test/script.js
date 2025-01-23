// Import required modules
const turf = require('@turf/turf');

// Define the URL to fetch the GeoJSON data
const geojsonUrl = 'https://raw.githubusercontent.com/tdwg/wgsrpd/master/geojson/level3.geojson';

// Define the latitude and longitude to test
const latitude = 57.316665649414062;  // Example: Kathmandu, Nepal
const longitude = -114.262222290039062;

// Create a Turf.js point from the coordinates
const point = turf.point([longitude, latitude]);

// Function to find the region containing the point
function findRegion(point, geojson) {
    for (const feature of geojson.features) {
        if (turf.booleanPointInPolygon(point, feature)) {
            return feature.properties; // Return the region's properties if found
        }
    }
    return null; // Return null if no matching region is found
}

// Async function to fetch data and find the region
async function fetchDataAndFindRegion(url, point) {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        const geojson = await response.json();
        const region = findRegion(point, geojson);
        if (region) {
            console.log("Region found:", region);
        } else {
            console.log("No region found for the provided coordinates.");
        }
    } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
    }
}

// Execute the function
fetchDataAndFindRegion(geojsonUrl, point);