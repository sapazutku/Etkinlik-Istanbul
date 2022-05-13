<template>
  <div class="container">
    <h2 id="main-title">Konser ve Etkinlik Listesi</h2>
    <br />
    <hr />
    <div class="postlar">
      <div v-for="(post, index) in posts" :key="index" class="card">
        <header class="card-header">
          <p class="card-header-title">{{ post.title }}</p>
          <button class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div class="card-content">
          <div class="content">
            {{ post.content }}
            <br />
            Yazar: <a>@{{ post.creator }}</a>
            <br />
            <time>Tarih: {{ post.datetime }}</time>
            <br />
              <div v-for="(tag,index) in post.tags" :key="index">
              <b-tag type="is-light"> #{{ tag }} </b-tag>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <b-button
            id="btn-like"
            type="is-primary is-light"
            class="card-footer-item"
            @click="likePost(post._id)"
          >
            <a>❤️</a>
          </b-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "@vue/composition-api";
import axios from "axios";
export default {
  setup() {
    const posts = ref([]);

    const API_URL = "http://localhost:5000";

    onMounted(() => {
      getPosts();
    });
    

    async function getPosts() {
      const response = await fetch(API_URL + "/posts");
      const json = await response.json();
      posts.value = json;
    }
    async function likePost(_id) {
      const response = await fetch(`${API_URL}/user/like/${_id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
        method: "POST",
      });
      this.$buefy.notification.open("Beğenildi");
    }

    return {
      posts,
      likePost,
      
    };
  },
};
</script>

<style>
.postlar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  width: 300px;
  margin: 10px;
}
#main-title {
  font-size: 2rem;
  font-weight: bold;
  color: #242140;
}
#btn-like{
  position: initial;
  bottom: 0;

}
</style>