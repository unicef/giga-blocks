import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from '@emotion/styled';

import 'mapbox-gl/dist/mapbox-gl.css';

const DragableMap = ({ lat, long }) => {
  console.log('longitude', long);
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const coordinates = document.getElementById('coordinates');

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [long, lat],
      zoom: 2,
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([long, lat])
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    }

    marker.on('dragend', onDragEnd);

    return () => {
      map.remove();
    };
  });

  const StyledMapContainer = styled('div')(({ theme, sx }) => {
    return {
      zIndex: 0,
      height: 400,
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      ...sx,
    };
  });

  return (
    <StyledMapContainer>
      <div
        id="map"
        style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
      ></div>
      <pre
        id="coordinates"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          position: 'absolute',
          bottom: '40px',
          left: '10px',
          padding: '5px 10px',
          margin: 0,
          fontSize: '11px',
          lineHeight: '18px',
          borderRadius: '3px',
          display: 'none',
        }}
      ></pre>
    </StyledMapContainer>
  );
};

export default DragableMap;
