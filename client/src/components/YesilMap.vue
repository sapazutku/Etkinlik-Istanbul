<template>
  <div class="map">
    <input v-model="search" />
    <b-button type="is-success" outlined @click="getData(search)">Bul</b-button>
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
     
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
              <br>
              <b-checkbox
                type="checkbox is-danger"
                id="checkbox"
                v-model="checked"
                @change.native="getPark(park._id)"
              >Adres olarak seç</b-checkbox>
              <br>
            </div>
            <div>
              <a>{{park.COUNTY_NAME}}, {{park.NEIGHBORHOOD_NAME}} Mahallesi</a>
            </div>
          </l-popup>
        </l-marker>
      
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
  props: ["visiblePopUp","post"],
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
    getData(search) {
      axios
        .get(
          "http://localhost:5000/park/" + search
        )
        .then((response) => {
          console.log(response.data);
          
          this.parklar = response.data;
        });
    },
    getPark(id) {
      //this.$emit("getPark", this.checked);
      if (this.checked) {
        console.log(id);
        this.post.parkId = id;
      }
    }
  },
};
</script>

<style>
.map {
  height: 400px;
  width: 100%;
  border:none;
}
b-button{
  margin: 20px;
}
</style>
