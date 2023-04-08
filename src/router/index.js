import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import TestHome from '../views/test/TestHome'
import Home from "../components/Home.vue";
import Person from "../views/home/Person.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'person',
          component: Person
        }
      ]
    },
    {
      path: '/test',
      name: 'TestHome',
      component: TestHome
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
