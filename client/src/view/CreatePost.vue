<template>
  <div>
    <NewPost :post="post" :submitForm="createPost" />
    
    <br>
    
  </div>
</template>

<script>
import NewPost from "../components/NewPost.vue";
import { reactive } from "@vue/composition-api";
import { useRouter } from "vue2-helpers/vue-router";
import { store } from "../store/store.js";
export default {
  components: {
    NewPost,
  },
  setup() {
    const API_URL = "http://localhost:5000/posts";
    const router = useRouter();
    const post = reactive({
      title: "",
      content: "",
      creator: "",
      parkID: null,
    });
    async function createPost() {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const json = await response.json();
      router.push({
        name: "home",
      });
      console.log(json);
    }
    return {
      post,
      createPost,
    };
  },
};
</script>

<style>
</style>