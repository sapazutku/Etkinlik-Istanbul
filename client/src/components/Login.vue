<template>
  <div class="container">
    <div class="login">
      <b-field label="Email: " type="is-dark is-light">
        <b-input
          type="email"
          validation-message="Hatalı email"
          v-model="email"
          placeholder="Email"
          required
        ></b-input>
      </b-field>
      <b-field label="Şifre: " type="is-dark is-light">
        <b-input
          type="password"
          v-model="password"
          placeholder="Şifre"
          required
        ></b-input>
      </b-field>

      <b-button @click="login" type="is-danger">Giriş Yap</b-button>
      <br />
      <br />
      <span>veya</span>
      <br />
      <br />
      <b-button tag="router-link" to="/user/signup" type="is-light"
        >Kayıt Ol</b-button
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",

      error: "",
    };
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      axios.post("http://localhost:5000/user/login", user).then(
        (res) => {
          //if successfull
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            
            this.$buefy.notification.open("Giriş başarılı");
            setTimeout(() => {
              this.$router.push("/user");
            }, 1000);
          }
        },
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
          this.$buefy.notification.open("Tekrar Deneyin");
        }
      );
    },
    
  },
};
</script>
<style scoped>
.container {
  width: 40%;
  
}
.login{
  display: flex;
  flex-direction: column;
  justify-content: center;

}
</style>
