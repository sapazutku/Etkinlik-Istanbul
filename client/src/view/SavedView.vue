<template>
  <div class="container">
    <button @click="showSaved">Show</button>
    <div v-for="save in savedPost" :key="save._id">
      <a>{{ save }}</a>
      
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      savedPost:[],
    }
    
  },
  methods:{
    async getSaved(id){
      axios.get(`http://localhost:5000/posts/${id}`)
        .then(res => {
          console.log(res.data);
          this.savedPost = res.data;
        })
    },
    async showSaved(){
      axios.get('http://localhost:5000/user/like', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        //this.showUser = true;
        //this.name = res.data.user.name;
        //this.email = res.data.user.email;
        //console.log(res.data.user.saved);
        //this.saved = res.data.user.saved;
        for (let index = 0; index < res.data.user.saved.length; index++) {
          
            this.getSaved(res.data.user.saved[index]);
        }
      })
    }
  },
  
  mounted() {
    this.showSaved();
  },
};
</script>

<style>
.container{
  border:1px solid black;
}
</style>