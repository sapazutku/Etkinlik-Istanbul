<template>
  <div class="container">
    <h1>Yeşil Alanlar</h1>
    <YesilMap :visiblePopUp="visiblePopUp" ref="childComponent" />
    <br />
    <br />
    <div>
      
      <div class="container is-max-desktop">
        <h2 class="title">Etkinlikler</h2>
        <div class="activity" v-for="(activePark, index) in activeParks" :key="index">
          <span id="title">{{activePark.title}}</span>
          <span id="location">📍 {{activePark.parkName}}</span>
          <b-button id="btn-find" type="is-success is-light" @click="sendSearch(activePark.parkName)">
            <span>Bul</span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import YesilMap from "../components/YesilMap.vue";
export default {
  data() {
    return {
      visiblePopUp: "hidden",
      activeParks: [],
      willSearch: "",
    };
  },
  components: {
    YesilMap,
  },
  methods: {
    sendSearch(name) {
      this.willSearch = name;
      this.$emit("takeSearch", name);
      console.log(this.willSearch);
      this.$refs.childComponent.getData(name);
    },
  },
  // etkinlik olan parklar
  mounted: function () {
    axios.get("http://localhost:5000/posts/").then((response) => {
      console.log(response.data);
      this.activeParks = response.data;
      //this.parklar = response.data;
    });
  },
};
</script>

<style>
#map {
  height: 180px;
}
.popup {
  visibility: hidden;
}
.container {
  width: 70%;
}
.activity {
  display: flex;
  border:1px solid black;
  margin: 5%;
}
#title{
  width: 40%;
  margin: 5%;

}
#location{
  width: 40%;

}
#btn-find{
  width: 10%;
  margin: 5%;
}
</style>