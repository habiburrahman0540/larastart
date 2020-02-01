/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


import VueRouter from 'vue-router'
import moment from 'moment';
import VueProgressBar from 'vue-progressbar'
import { Form, HasError, AlertError } from 'vform';
import Swal from 'sweetalert2';
window.Vue = require('vue');
window.Form = Form;


window.Fire = new Vue();
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.use(VueRouter)
Vue.filter('uptext',function(text){
  return text.charAt(0).toUpperCase() + text.slice(1)
});
Vue.filter('datefor',function(date){
  return moment(date).format('DD-MM-YYYY');
});

let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/developer', component: require('./components/Developer.vue').default },
    { path: '/user', component: require('./components/User.vue').default }
  ]

  const router = new VueRouter({
    routes ,
    mode:'history'
    
  });
  
  const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  window.toast = toast;
  window.Swal = Swal;
  
 
  Vue.use(VueProgressBar, options);
const app = new Vue({
    el: '#app',
    router
});
Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);
