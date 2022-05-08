<template>
  <div class="container">
    <div v-for="post in posts" :key="post.id" class="card">
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
          <a>@{{ post.creator }}</a>
          <br />
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          <br>
          <b-tag type="is-light">#Tag</b-tag>
          <b-tag type="is-light">#Tag</b-tag>
          
        </div>
      </div>
      <footer class="card-footer">
        <b-button
          type="is-primary is-light"
          class="card-footer-item"
          @click="likePost(post._id)"
        >
          <a >❤️</a>
        </b-button>
        <b-button
          type="is-success is-light"
          class="card-footer-item"
          @click="removePost(post._id)"
        >
          <a >Sil</a>
        </b-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
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

    async function removePost(_id) {
      const response = await fetch(`${API_URL}/posts/${_id}`, {
        method: "DELETE",
      });
    
      getPosts();
    }
    async function likePost2(_id) {
       axios.put(`${API_URL}/user/like/${_id}`,{ headers: { token: localStorage.getItem('token')}})
       .then(res => {
         console.log(res.data.user.saved);
        })

    }
    async function likePost(_id) {
      const response = await fetch(`${API_URL}/user/like/${_id}`,{
        method: "PUT",
        headers: { token: localStorage.getItem('token')},
      })

    }

    return {
      posts,
      removePost,
      likePost,
    };
    
  },
};
</script>

<style>
.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  margin-top: 20px;
  margin-right: 5%;
  width: 30%;
}
</style>