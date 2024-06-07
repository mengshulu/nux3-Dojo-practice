<template>
  <div>
    <button
      v-for="(map, map_index) in all_map_assets"
      :key="`map${map_index}`"
      @click="current_map = map_index"
    >
      {{ map.description }}
    </button>
    <LMap
      ref="leaflet_map"
      :minZoom="mapZoom.minZoom"
      :maxZoom="mapZoom.maxZoom"
      :zoom="mapZoom.zoom"
      :center="[23.8, 121.12]"
      :options="mapOptions"
      :maxBounds="maxBounds"
      style="height: 600px"
      @update:zoom="get_zoom"
      @update:center="get_center"
    >
      <LTileLayer
        :url.sync="all_map_assets[current_map].url"
        :attribution="all_map_assets[current_map].attribution"
      />
      <LGeoJson
        :geojson="geojson_little as GeoJsonObject"
        :visible="is_town_line_visible"
        :optionsStyle="town_style as L.StyleFunction"
      />
      <LGeoJson :geojson="geojson_outline as GeoJsonObject" :options-style="style_method as L.StyleFunction" />
    </LMap>
  </div>
</template>

<script setup lang="ts">
  import { latLng, latLngBounds } from 'leaflet';
  import { GeoJsonObject } from 'geojson';
  import geojson_little from '../content/map/TOWNSHIP_geo.json';
  import geojson_outline from '../content/map/coastline.json';

  interface MAP_ZOOM {
    minZoom: number;
    maxZoom: number;
    zoom: number;
  };
  
  const mapZoom = ref({
    minZoom: 5,
    maxZoom: 14,
    zoom: 7
  } as MAP_ZOOM);


  const all_map_assets = [
    {
      url:
        "https://wmts.nlsc.gov.tw/wmts/EMAP2/default/EPSG:3857/{z}/{y}/{x}",
      attribution:
        '&copy; <a target="_target" href="https://maps.nlsc.gov.tw/" tabindex="-1">國土測繪圖資網路地圖服務</a>',
      description: "國土測繪-黑白",
    },
    {
      url:
        "https://wmts.nlsc.gov.tw/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=EMAP&STYLE=_null&TILEMATRIXSET=EPSG:3857&TILEMATRIX=EPSG:3857:{z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fpng",
      attribution:
        '&copy; <a target="_target" href="https://maps.nlsc.gov.tw/" tabindex="-1">國土測繪圖資網路地圖服務</a>',
      description: "國土測繪-彩色",
    },
    {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      description: "OpenStreet-彩色",
    },
    {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      description: "OpenStreet-簡易",
    },
  ];
  const current_map = ref(0);

  const mapOptions = {
    zoomSnap: 1
  }; // 左上方 zoom in, zoom out的縮放刻度

  const maxBounds = latLngBounds(latLng(32, 110), latLng(10, 150));

  const markerLatLng = ref([23.8, 121.12]);
  const is_town_line_visible = ref(false);
  const get_center = (item: L.LatLng) => {
    console.log("center", item);
    markerLatLng.value = [item.lat, item.lng];
  };

  const get_zoom = (item: number) => {
    console.log("zoom", item);
    is_town_line_visible.value = item > 6;
  };

  const style_method = () => {
    return {
      color: "#ffff9c",
    };
  };

  const town_style = () => {
    return {
      fillColor: "transparent",
      color: "#666666",
      weight: 1,
    };
  };

</script>

<style lang="scss" scoped>
  .leaflet-container {
    background: #000;
  }

  .text-labels {
    writing-mode: vertical-lr;
  }

  .text-name {
    transform: translateX(-40%);
    line-height: 1;
  }

  .county {
    color: #ffffff;
    font-size: 1em;
  }

  .town {
    color: #666666;
    font-size: 1em;
  }

  button {
    padding: 4px;
    margin: 5px;
    border: 1px solid #000;
    border-radius: var(--s-space);

    &:hover {
      color: #fff;
      background: var(--bg-hover);
    }
  }
</style>