<template>
  <div class="reg">
    <h3>Register</h3>
    <input
      v-model="email"
      name="email"
      type="email"
      placeholder="E-mail Giriniz.."
    />
    <input
      v-model="password"
      name="password"
      type="password"
      placeholder="Şifre Giriniz.."
    />
    <br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
    data(){
        return{
            email:"",
            password:""
        }
    },
    watch:{
        email(value){
            console.log("email was changed",value)
        }
    },
    methods:{
        async register(){
            const response = await AuthenticationService.register({
                email:this.email,
                password:this.password
            })
            console.log(response.data);
        }
    },
    mounted(){
        setTimeout(()=>{
            this.email = 'naber@gmail.com';
        },2000)
    }
};
</script>

<style>
</style>