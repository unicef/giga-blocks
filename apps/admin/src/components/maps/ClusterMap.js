import { memo, useRef } from "react";
import Map, { Layer, Source } from "react-map-gl";
//
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from "./layers";

// ----------------------------------------------------------------------

function MapClusters({ mapData = [], ...other }) {
  const mapRef = useRef(null);

  mapData = mapData.map((item) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [+item?.latitude, +item?.longitude],
    },
    properties: {
      // cluster: true,
      id: item.name,
    },
  }));

  let data = {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
      },
    },
    features: mapData,
  };

  const onClick = (event) => {
    const feature = event.features?.[0];

    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource("earthquakes");

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current?.easeTo({
        center: feature?.geometry?.coordinates,
        zoom: Number.isNaN(zoom) ? 3 : zoom,
        duration: 500,
      });
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          longitude: 68.48329,
          latitude: 28.31456,
          zoom: 3,
        }}
        interactiveLayerIds={[clusterLayer.id || ""]}
        onClick={onClick}
        ref={mapRef}
        {...other}
      >
        <Source
          id="earthquakes"
          type="geojson"
          // data={data}
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  );
}

export default memo(MapClusters);
