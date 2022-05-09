<template>
  <div class="container">
    <button @click="showSaved">Show</button>
    <div v-for="save in savedPost" :key="save._id">
      <a>{{ save }}</a>
    </div>
    <div v-for="(postID,index) in savedPostsId" :key="index">
      <a>{{  }}</a>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      savedPost:[],
      savedPostsId:[],
    }
    
  },
  methods:{
    // 
    async getSaved(id){
      axios.get(`http://localhost:5000/posts/${id}`)
        .then(res => {
          console.log(res.data);
          this.savedPost = res.data;
        })
    },
    // user'ın bütün likelerının idsini al 
    async showSaved(){
      axios.get('http://localhost:5000/user/like', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        //this.showUser = true;
        //this.name = res.data.user.name;
        //this.email = res.data.user.email;
        //console.log(res.data.user.saved);
        //this.saved = res.data.user.saved;
        console.log(res.data.user.saved);
        this.savedPostsId = res.data.user.saved;
        for (let index = 0; index < this.savedPostsId.length; index++) {
            // bütün idlerin bilgilerini posttan çek
            this.getSaved(this.savedPostsId[index]);
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