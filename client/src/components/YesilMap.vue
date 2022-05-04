<template>
  <div class="map">
    <input @keypress.enter="getData" v-model="search" />
    <button @click="getData">GET</button>
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <button @click="consoleLog">
        <l-marker
          v-for="(park, index) in parklar"
          :key="index"
          ref="markersRef"
          :lat-lng="getCoord(park.LATITUDE, park.LONGITUDE)"
          limit
        >
          <l-tooltip>{{ park.NAME }}</l-tooltip>

          <l-popup>
            <div>
              <h3 style="color: green">{{ park.NAME }}</h3>
            </div>
            <div :style="`visibility:${visiblePopUp}`">
              <input
                type="checkbox"
                id="checkbox"
                name="vehicle3"
                v-model="checked"
              />
              <label for="checkbox">Seç</label>
            </div>
          </l-popup>
        </l-marker>
      </button>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from "vue2-leaflet";
import L, { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";

export default {
  props: ["visiblePopUp"],
  components: {
    "l-map": LMap,
    "l-tile-layer": LTileLayer,
    "l-marker": LMarker,
    "l-tooltip": LTooltip,
    // eslint-disable-next-line vue/no-unused-components
    "l-popup": LPopup,
  },
  data() {
    return {
      zoom: 9.5,
      center: { lat: 41.1, lng: 29.075818 },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerObjects: null,
      parklar: [],
      pos: latLng(47.41322, -1.219482),
      apiUrl: "https://data.ibb.gov.tr/api/3/action/datastore_search?q=",
      search: "",
      checked: false,
    };
  },
  /*mounted: function () {
    L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";
    this.$nextTick(() => {
      this.markerObjects = this.$refs.markersRef
      .map((ref) => ref.mapObject);
    });
  },*/

  methods: {
    displayTooltip(selectedIndex) {
      for (let markerObject of this.markerObjects) {
        markerObject.closeTooltip();
      }
      this.markerObjects[selectedIndex].toggleTooltip();
    },
    getCoord(a, b) {
      return latLng(a, b);
    },
    getData() {
      axios
        .get(
          this.apiUrl +
            this.search +
            "&resource_id=d588f256-2982-43d2-b372-c38978d7200b"
        )
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response.data.result.records);
          this.parklar = response.data.result.records;
        });
    },
    consoleLog() {
      console.log("Seçildi: ");
    },
  },
};
</script>

<style>
.map {
  height: 400px;
  width: 50%;
  margin-left: 25%;
  border: 1px solid #ccc;
}
</style>
