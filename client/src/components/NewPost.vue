<template>
  <div class="container">
    <v-form name="vue-form" @submit.prevent="submitForm">
      <b-field label="Başlık">
        <b-input v-model="post.title" placeholder="Başlık" required type="text">
        </b-input>
      </b-field>

      <b-field label="Kullanıcı Adı">
        <b-input
          v-model="post.creator"
          placeholder="Kullanıcı Adı"
          required
          validation-message="Lütfen isminizi kontrol ediniz .."
          type="text"
          pattern="([a-z]|[A-Z])*"
        >
        </b-input>
      </b-field>

      <!-- <b-field label="Telefon">
        <b-input
          placeholder="0 (5xx) xxx xx xx"
          type="phone"
          pattern="05([0-9]{9})"
          validation-message="Lütfen telefon numaranızı kontrol ediniz .."
        >
        </b-input> 
      </b-field>-->
      <section>
        <b-field label="Tag ekleyiniz">
            <b-taginput
                v-model="post.tags"
                ellipsis
                icon="label"
                placeholder="Taglar"
                aria-close-label="Delete this tag">
            </b-taginput>
        </b-field>
        <!-- <p class="content"><b>Tags:</b> {{ post.tags }}</p> -->
    </section>
    
      <b-field label="Etkinliğin içeriğinden biraz bahseder misiniz?" v-show="true">
        <b-input
          v-model="post.content"
          type="textarea"
          minlength="10"
          maxlength="100"
          placeholder="En fazla 100 kelime"
        >
        </b-input>
      </b-field>
      <b-field>
        <b-datetimepicker v-model="post.datetime" inline></b-datetimepicker>
      </b-field> 
      <b-field label="Etkinliği düzenlemek istediğiniz yeri seçiniz"> </b-field>
      <br />
      <br />
      <YesilMap :post="post" />
      <b-button type="is-danger" id="send" @click="submitForm">Gönder</b-button>
    </v-form>
  </div>
</template>

<script>
import YesilMap from "../components/YesilMap.vue";
export default {
  components: {
    YesilMap,
  },
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
#send {
  margin-top: 80px;
}
</style>