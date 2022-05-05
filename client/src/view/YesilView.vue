<template>
  <div class="container">
    <h1>Yeşil Alanlar</h1>
    <YesilMap :visiblePopUp="visiblePopUp"/>
  </div>
</template>

<script>
import YesilMap from '../components/YesilMap.vue';
export default {
  data() {
    return {
      visiblePopUp: "hidden",
    };
  },
  components: {
    YesilMap
  },
  methods: {
    
  },
  computed: {
    
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
.container{
  width: 70%;
}
</style>