<template>
  <div class="container">
    <h2>Kaydedilen Etkinlikler</h2>
    <hr />
    
    <div v-for="save in savedPost" :key="save._id" class="card">
  <header class="card-header">
    <p class="card-header-title">
      {{ save.title }}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      {{save.content}}
      <a>@{{save.creator}}</a>
      <br>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      savedPost: [],
      savedPostsId: [],
    };
  },
  methods: {
    //
    async getSaved(id) {
      axios.get(`http://localhost:5000/posts/${id}`).then((res) => {
        console.log(res.data);
        this.savedPost.push(res.data);
      });
    },
    // user'ın bütün likelerının idsini al
    async showSaved() {
      axios
        .get("http://localhost:5000/user/like", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
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
        });
    },
  },

  mounted() {
    this.showSaved();
  },
};
</script>

<style>
.container {
  float: left;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.card {
  border: 1px solid #ccc;
  width: 20%;
  margin-left:10%;
  display: inline-block;
  
}

</style>