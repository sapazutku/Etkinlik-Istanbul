<template>
  <div class="page">
    <div v-show="showUser">
      <b-button type="is-danger" @click="logout">Çıkış Yap</b-button>
      <h1>
        Hoş Geldiniz <a>@{{ name }} </a>
      </h1>
      <h2>
        Email : <a>{{ email }}</a>
      </h2>
    </div>
    <div class="noLogin" v-show="!showUser">
      <h1>Giriş Yok</h1>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Landing",
  data() {
    return {
      name: "",
      email: "",
      showUser: false,
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/user/login");
      console.log("giriş yok ki kardeşim");
    }
  },
  mounted() {
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.showUser = true;
        this.name = res.data.user.name;
        this.email = res.data.user.email;
        //console.log(res.data.user.name);
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/user/login");
    },
  },
};
</script>
<style>
.page {
  padding: 3%;
}
</style>
