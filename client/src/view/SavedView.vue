<template>
  <div class="container">
    <h2 id="main-title">Kaydedilen Etkinlikler</h2>
    <br>
    <br>
    <hr />
    <b-notification
      type="is-danger is-light"
      aria-close-label="Close notification"
      v-show="show"
    >
      Henüz bir etkinlik kaydetmediniz
    </b-notification>
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
          {{ save.content }}
          <a>@{{ save.creator }}</a>
          <br />
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
      show: false,
    };
  },
  methods: {
    // postların idlerine istek
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
          this.controlSave(res.data.user.saved);
          this.savedPostsId = res.data.user.saved;
          for (let index = 0; index < this.savedPostsId.length; index++) {
            // bütün idlerin bilgilerini posttan çek
            this.getSaved(this.savedPostsId[index]);
          }
        });
    },
    // post yok ise uyarı
    async controlSave(array) {
      console.log(array.length);
      if (array.length  == 0) {
        this.show = true;
      }
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
  align-items: center;
  margin-left: 5%;
}
.card {
  border: 1px solid #ccc;
  width: 20%;
  margin-left: 10%;
  display: inline-block;
}
#main-title {
  margin-top: 10px;
  font-size: 2rem;
  font-weight: bold;
  color: #242140;
  text-align: center;
  float: left;
  }
</style>