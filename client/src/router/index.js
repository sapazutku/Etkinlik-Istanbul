import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import CategoryView from '@/view/CategoryView'
import YesilView from '@/view/YesilView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
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
    }
  ]
});
