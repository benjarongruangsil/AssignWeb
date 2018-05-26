import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import listmenu from '@/components/listmenu'
import HelloWorld from '@/components/HelloWorld'
import swal from 'sweetalert2'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/listmenu',
      name: 'listmenu',
      component: listmenu
    }
  ]
})
