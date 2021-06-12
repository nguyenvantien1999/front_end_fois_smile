import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Hoc from "../views/Hoc.vue";
import KiemTra from "../views/KiemTra.vue";
import Kaiwa from "../views/Kaiwa.vue";
import AccountInfor from "../components/login/InforAccountComponent.vue";
import LoginStore from "../store/LoginStore";
import Admin from "../views/admin.vue";
import Thi from "../views/Thi.vue";
import { getModule } from "vuex-module-decorators";

const loginStore = getModule(LoginStore);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/infor",
    name: "accountInfor",
    component: AccountInfor,
  },
  {
    path: "/n5",
    name: "hoc",
    component: Hoc,
  },
  {
    path: "/kiemtra",
    name: "kiemtra",
    component: KiemTra,
  },
  {
    path: "/kaiwa",
    name: "kaiwa",
    component: Kaiwa,
  },
  {
    path: "/admin",
    name: "loginadmin",
    component: Admin,
  },
  {
    path: "/thithu",
    name: "thithu",
    component: Thi,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const routes1: Array<RouteConfig> = [
  {
    path: "",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "loginadmin",
    component: Admin,
  },
];

const router1 = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes1,
});

let rt = new VueRouter();

if (loginStore.getSessionMaTk != undefined) {
  rt = router;
} else {
  rt = router1;
}

export default rt;
