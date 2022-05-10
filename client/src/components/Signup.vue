<template>
  <div class="container">
    <v-form @submit.prevent="signup">
      <b-field label="İsim">
        <b-input
          required
          type="text"
          v-model="name"
          placeholder="İsim"
          validation-message="Hatalı isim"
        ></b-input>
      </b-field>
      <b-field label="E-mail">
        <b-input
          required
          type="text"
          v-model="email"
          placeholder="E-mail"
          validation-message="Hatalı email"
        ></b-input>
      </b-field>
      <b-field label="Parola">
        <b-input
          required
          type="password"
          v-model="password"
          placeholder="Parola"
          validation-message="Hatalı parola"
        ></b-input>
      </b-field>

      <b-button type="is-danger" @click="signup">Kayıt Ol</b-button>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",

      error: "",
    };
  },
  methods: {
    signup() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      axios.post("http://localhost:5000/user/signup", newUser).then(
        (res) => {
          this.error = "";
          //this.$router.push('/user/login');
          this.$buefy.notification.open("Kayıt başarılı");
          setTimeout(() => {
            this.$router.push("/user");
          }, 1000);
        },
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
          this.$buefy.notification.open(this.error);
        }
      );
    },
  },
};
</script>
<style scoped>
.container {
  margin-top: 10%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

