<template>
  <div class="map">
    <b-field>
      <b-input
        placeholder="Yer arayın..."
        type="search"
        icon="magnify"
        v-model="search"
      >
      </b-input>
      <b-button type="is-success" outlined @click="getData(search)"
        >Bul</b-button
      >
    </b-field>

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
            <br />
            <b-checkbox
              type="checkbox is-danger"
              id="checkbox"
              v-model="checked"
              @change.native="getPark(park._id)"
              >Adres olarak seç</b-checkbox
            >
            <br />
          </div>
          <div>
            <a
              >{{ park.COUNTY_NAME }}, {{ park.NEIGHBORHOOD_NAME }} Mahallesi</a
            >
          </div>
        </l-popup>
      </l-marker>
      
    </l-map>
    <div>
      <h2>Etkinlikler</h2>
      <div v-for="(activePark,index) in activeParks" :key="index">
        <button >{{ activePark.parkId }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from "vue2-leaflet";
import L, { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";

export default {
  props: ["visiblePopUp", "post"],
  components: {
    "l-map": LMap,
    "l-tile-layer": LTileLayer,
    "l-marker": LMarker,
    "l-tooltip": LTooltip,
    // eslint-disable-next-line vue/no-unused-components
    "l-popup": LPopup,
    "l-icon": L.Icon,
  },
  data() {
    return {
      zoom: 9.5,
      center: { lat: 41.1, lng: 29.075818 },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerObjects: null,
      parklar: {},
      search: "",
      checked: false,
      greenIcon: L.icon({
          iconUrl:"" //require('@/assets/leaf_icon.png'),
          //iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII='
      }),
      activeParks:[]
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
      axios.get("http://localhost:5000/park/" + search).then((response) => {
        console.log(response.data);

        this.parklar = response.data;
      });
      axios.get("http://localhost:5000/posts/").then((response) => {
        console.log(response.data);
        this.activeParks = response.data
        //this.parklar = response.data;
      });
    },
    getPark(id) {
      //this.$emit("getPark", this.checked);
      if (this.checked) {
        console.log(id);
        this.post.parkId = id;
      }
    },
    
  },
};
</script>

<style>
.map {
  height: 400px;
  width: 100%;
  border: none;
}
b-button {
  margin: 20px;
}
b-field {
  margin: 20px;
}
</style>
