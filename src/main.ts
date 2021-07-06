import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDzhtYDZepThwwrUlMIaZ7YKhbhkZ_viAM",
  authDomain: "fois-smile.firebaseapp.com",
  projectId: "fois-smile",
  storageBucket: "fois-smile.appspot.com",
  messagingSenderId: "254629682772",
  appId: "1:254629682772:web:d8542a52411f2b5520d7c1",
  measurementId: "G-LVZ3NJ83VG",
});
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);
Vue.use(VueLodash, { name: "custom", lodash: lodash });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
