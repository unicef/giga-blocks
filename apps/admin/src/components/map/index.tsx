// import { useContext, useState } from 'react';
// import { Button } from '@mui/material';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { NavigationControl, FullscreenControl, Layer, Source } from 'react-map-gl';
// import { CountryDataContext } from '@contexts/countryDataContext';
// import Alert from '@components/dialog';

// export default function MapComponent() {
//   const { countries, countryData } = useContext(CountryDataContext);
//   const [showSatelliteView, setShowSatelliteView] = useState<boolean>(false);
//   const [openDialog, setOpenDialog] = useState<boolean>(false);

//   const [clickedCountry, setClickedCountry] = useState('');

//   const handleClick = (event: any) => {
//     const features = event.target.queryRenderedFeatures(event.point, {
//       layers: countries,
//     });
//     if (features.length) {
//       setClickedCountry(features[0].properties.name);

//       setOpenDialog(true);
//     }
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//   };

//   const handleMode = () => {
//     setShowSatelliteView(!showSatelliteView);
//   };

//   return (
//     <>
//       <Map
//         initialViewState={{
//           longitude: 85.323959,
//           latitude: 27.717245,
//           zoom: 1.6,
//         }}
//         onClick={handleClick}
//         mapboxAccessToken="pk.eyJ1IjoidXR0YW05IiwiYSI6ImNsaDRrc3ltNDAwaHMzbG15am9ydGVkNnoifQ.WEJsQKHd0fnuR_RqHHb5Uw"
//         mapStyle={
//           showSatelliteView
//             ? 'mapbox://styles/mapbox/satellite-streets-v11'
//             : 'mapbox://styles/uttam9/clh7qqtqr00vx01pg8lguefif'
//         }
//         style={{ width: '100%', height: '78vh' }}
//       >
//         <Button variant="contained" sx={{ mx: 1, my: 1 }} onClick={handleMode}>
//           {showSatelliteView ? 'Normal View' : 'Satellite View'}
//         </Button>
//         <NavigationControl position="bottom-right" />
//         <FullscreenControl />
//         {/* <GeolocateControl /> */}
//         <Source id="countries" type="geojson" data={countryData} />

//         {countries.map((country: string) => (
//           <Layer
//             key={country}
//             id={country}
//             type="fill"
//             source="countries"
//             paint={{
//               'fill-color': '#28b246',
//               'fill-opacity': 0.5,
//             }}
//             filter={['==', 'name', country]}
//           />
//         ))}
//       </Map>
//       <Alert selectedCountry={clickedCountry} open={openDialog} handleClose={handleClose} />
//     </>
//   );
// }
