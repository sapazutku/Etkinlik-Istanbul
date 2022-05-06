<template>
  <div class="container">
    <h1>Yeşil Alanlar</h1>
    <YesilMap :visiblePopUp="visiblePopUp"/>
    <br>
    <br>
    <!-- TODO: etkinlikleri çek etkinliklerden parkidsi olanlara buton ekle  -->
    <div>
      <h2>Etkinlikler</h2>
      <div v-for="(activePark,index) in activeParks" :key="index">
        <button >{{ activePark.parkId }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import YesilMap from '../components/YesilMap.vue';
export default {
  data() {
    return {
      visiblePopUp: "hidden",
      activeParks: [],
    };
  },
  components: {
    YesilMap
  },
  methods: {
    
  },
  mounted:function() {
      axios.get("http://localhost:5000/posts/").then((response) => {
        console.log(response.data);
        this.activeParks = response.data
        //this.parklar = response.data;
      });
    }
};
</script>

<style>
#map {
  height: 180px;
}
.popup {
  visibility: hidden;
}
.container{
  width: 70%;
}
</style>