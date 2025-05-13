//Turf is a modular geospatial analysis engine written in JavaScript
import { point, booleanPointInPolygon } from '@turf/turf';
//Turns Geo data into geoJson
import { FeatureCollection, Polygon, Feature, Point } from 'geojson';
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/application';

const prisma = new PrismaClient();

// URL to fetch the GeoJSON data (provided by clients)
const geojsonUrl: string = 'https://raw.githubusercontent.com/tdwg/wgsrpd/master/geojson/level3.geojson';

// Define the structure for GeoJSON Feature Properties
interface GeoJSONProperties {
    [key: string]: any;
}

// Function to find the region containing the point
function findRegion(
    testPoint: Feature<Point>,
    geojson: FeatureCollection<Polygon, GeoJSONProperties>
): GeoJSONProperties | null {
    for (const feature of geojson.features) {
        if (booleanPointInPolygon(testPoint, feature)) {
            return feature.properties;
        }
    }
    return null;
}

// Fetch the GeoJSON data from the URL
async function fetchGeoJSON(url: string): Promise<FeatureCollection<Polygon, GeoJSONProperties>> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
    }
    return (await response.json()) as FeatureCollection<Polygon, GeoJSONProperties>;
}

// Fetch latitude and longitude from the database and update the region
async function updateSchoolRegions() {
    try {
        // Fetch GeoJSON data
        const geojson = await fetchGeoJSON(geojsonUrl);

        // Fetch all schools from the database
        const schools = await prisma.school.findMany({
            where: { isArchived: false }, 
        });

        for (const school of schools) {
            // Create a point feature from the school's coordinates
            const testPoint = point([school.longitude, school.latitude]);

            // Find the region for the school's coordinates
            const region = findRegion(testPoint, geojson);
            console.log(region)

            if (region) {
                console.log(`Updating school ${school.id} with region: ${region.LEVEL3_NAM}`);

                // Update the database with the region information
                await prisma.school.update({
                    where: { id: school.id },
                    data: {
                        region: region.LEVEL3_NAM, // Update the region 
                        updatedAt: new Date(),
                    },
                });
            } else {
                console.log(`No region found for school ${school.id}.`);
            }
        }

        console.log("All schools updated successfully.");
    } catch (error) {
        console.error('Error updating school regions:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Execute the update function
updateSchoolRegions();

