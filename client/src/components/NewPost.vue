<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <b-field label="Email">
        <b-input
          placeholder="Email"
          required
          validation-message="This email is invalid"
          type="email"
          
        >
        </b-input>
      </b-field>

      <b-field label="Kullanıcı Adı">
        <b-input
          placeholder="Kullanıcı Adı"
          required
          validation-message="Lütfen isminizi kontrol ediniz .."
          type="text is-success"
          pattern="([a-z]|[A-Z])*"
        >
        </b-input>
      </b-field>
      

      <b-field label="Telefon">
        <b-input
          placeholder="0 (5xx) xxx xx xx"
          type="phone"
          pattern="05([0-9]{9})"
          validation-message="Lütfen telefon numaranızı kontrol ediniz .."
        >
        </b-input>
      </b-field>
      <b-field label="Kendinizden biraz bahseder misiniz?" v-show="false">
        <b-input
          type="textarea"
          minlength="10"
          maxlength="100"
          placeholder="En fazla 100 kelime"
        >
        </b-input>
      </b-field>
    </form>
  </div>
</template>

<script>
export default {
  props: ["post", "submitForm"],
};
</script>

<style>
.container {
  width: 50%;
  margin-top: 40px;
}
.label {
  float: left;
}
</style>