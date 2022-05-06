import Vue from "vue";
import VueRouter from "vue-router";
import Register from "@/components/Register";
import CategoryView from "@/view/CategoryView";
import YesilView from "@/view/YesilView";
import Posts from "@/view/Posts.vue";
import CreatePost from "@/view/CreatePost.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: CategoryView
  },
  {
    path: "/category",
    name: "Category",
    component: CategoryView
  },
  {
    path: "/park",
    name: "park",
    component: YesilView
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts
  },
  {
    path: "/create",
    name: "Create",
    component: CreatePost
  },
  {
    path: "/user/login",
    name: "Login",
    component: Login
  },
  {
    path: "/user/signup",
    name: "Signup",
    component: Signup
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
