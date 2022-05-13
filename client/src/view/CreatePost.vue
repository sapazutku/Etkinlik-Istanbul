<template>
  <div>
    <NewPost :post="post" :submitForm="createPost" />
    <br />
  </div>
</template>

<script>
import NewPost from "../components/NewPost.vue";
import { reactive } from "@vue/composition-api";
import { useRouter } from "vue2-helpers/vue-router";
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
      parkName: null,
      datetime: new Date,
      tags: [],
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
        name: "category",
      });
      console.log(json);
      this.$buefy.notification.open("Etkinlik Talebi Oluşturuldu");
      setTimeout(() => {
        this.$router.push("/category");
      }, 1000);
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