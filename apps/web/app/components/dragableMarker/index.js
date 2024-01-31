import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from '@emotion/styled';

import 'mapbox-gl/dist/mapbox-gl.css';

const DragableMap = ({ lat, long, onMarkerDragEnd }) => {
  const initialCenter = [long, lat];
  const initialZoom = 3;

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const coordinates = document.getElementById('coordinates');

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat(initialCenter)
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;

      onMarkerDragEnd(lngLat);
    }

    marker.on('dragend', onDragEnd);

    return () => {
      map.remove();
    };
  }, [lat, long, onMarkerDragEnd]);

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
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          marginBottom: '24px',
        }}
      ></div>
      <pre id="coordinates"></pre>
    </StyledMapContainer>
  );
};

export default DragableMap;
