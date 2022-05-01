<template>
  <div class="container">
    <h1>Yeşil Alanlar</h1>
    <YesilMap />
  </div>
</template>

<script>
import YesilMap from '../components/YesilMap.vue';
export default {
  data() {
    return {
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
</style>