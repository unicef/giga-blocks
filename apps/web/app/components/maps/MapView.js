import styled from '@emotion/styled';
import { useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

// sections
const MapClusters = dynamic(() => import('./ClusterMap'));

// ----------------------------------------------------------------------

const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};

const baseSettings = {
  mapboxAccessToken:
    'pk.eyJ1IjoicnVtc2FuIiwiYSI6ImNsN3pwc2ltajAzcjY0NHBtNzAycnI4dDMifQ.HhHwz1w0X4dleTgN4D-Kxw',
  minZoom: 1,
  scrollZoom: true,
};

const StyledMapContainer = styled('div')(({ theme, sx }) => {
  return {
    zIndex: 0,
    height: 400,
    width: 500,
    overflow: 'hidden',
    position: 'relative',
    ...sx,
  };
});

const MapView = ({ mapData }) => {
  const theme = useTheme();
  const initialViewport = {
    zoom: 10,
  };
  return (
    <div>
      <StyledMapContainer>
        <MapClusters
          {...baseSettings}
          mapData={mapData}
          mapStyle={THEMES[theme.palette.mode]}
          initialViewport={initialViewport}
        />
      </StyledMapContainer>
    </div>
  );
};

MapView.propTypes = {};

export default MapView;
