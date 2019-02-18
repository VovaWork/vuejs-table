// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import DataTable from './components/DataTable.vue';
import RowDetails from './components/RowDetails.vue';
import { store } from './store/store';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: DataTable },
    { path: '/rowdetails', component: RowDetails }
  ],
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
