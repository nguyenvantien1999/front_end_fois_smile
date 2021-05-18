<template>
  <div @show="getAccountInforApi">
    <!-- header -->
    <div id="top_header">
      <div class="d-flex container">
        <div class="d-flex">
          <p>
            <b>
              <i class="fa fa-phone text-success" aria-hidden="true"></i>
              +(84)981 530 459
            </b>
          </p>
          <p>
            <b>
              <i class="fa fa-envelope text-danger" aria-hidden="true"></i>
              tien.vn.59cntt@ntu.edu.vn
            </b>
          </p>
          <p>
            <b>
              <i
                class="fa fa-facebook-official text-primary"
                aria-hidden="true"
              ></i>
              Fanpage
            </b>
          </p>
        </div>
        <div id="dangNhap" class="row">
          <p @click="$bvModal.show('login')" v-if="textLogin == ''">
            <b> Đăng nhập / Đăng ký </b>
          </p>
          <p v-else>
            <router-link class="text-white" to="/infor"
              ><b @click="selecInfor">{{
                getAccountInfor.hoten
              }}</b></router-link
            >
            <a class="text-danger ml-2" href="/" @click="logOut">đăng xuất</a>
          </p>
          <login />
        </div>
      </div>
    </div>
    <!-- menu -->
    <div id="header" class="mb-2 sticky-top">
      <div id="_header" class="container">
        <div class="row pt-3 pb-2">
          <img
            width="100px"
            height="auto"
            src="../assets/images/logoJapan.jpg"
            alt="logo"
          />
          <div class="ml-2 mt-2">
            <h3 style="margin-top: 30px">
              <b>
                <span class="text-primary"
                  >F<span class="text-danger">O</span>IS</span
                >
                <i
                  id="smile"
                  class="fa fa-smile-o bg-warning text-danger"
                  aria-hidden="true"
                ></i>
                <span class="text-danger">Smile</span>
              </b>
            </h3>
            <p style="margin-top: -15px; color: red"><i>Nụ cười Nhật ngữ</i></p>
          </div>
          <div id="menu" class="d-flex">
            <div
              class="d-flex flex-column"
              v-for="(nav, i) in titleMenu"
              :key="i"
              @click="setSelectMenu(i)"
            >
              <router-link
                v-if="textLogin != ''"
                :to="linkMenu[i]"
                :class="{ activeMenuNav: getSelectMenu == i }"
              >
                <i :class="iconMenu[i]" aria-hidden="true"></i>
                <h4>
                  <b>{{ nav }}</b>
                </h4>
              </router-link>
              <span v-else :class="{ activeMenuNav: i == 0 }">
                <span v-if="i == 0">
                  <i :class="iconMenu[i]" aria-hidden="true"></i>
                  <h4>
                    <b>{{ nav }}</b>
                  </h4>
                </span>
                <span v-else @click="$bvModal.show('login')">
                  <i :class="iconMenu[i]" aria-hidden="true"></i>
                  <h4>
                    <b>{{ nav }}</b>
                  </h4>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Login from "./login/LoginComponent.vue";
import LoginStore from "../store/LoginStore";
import { getModule } from "vuex-module-decorators";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    Login,
  },
})
export default class Header extends Vue {
  private selectMenu = 0;
  private titleMenu = [
    "TRANG CHỦ",
    "HỌC N5",
    "KIỂM TRA",
    "HỒI THOẠI",
    "THI THỬ",
  ];
  private linkMenu = ["/", "/n5", "/kiemtra", "/kaiwa", "/thithu"];
  private iconMenu = [
    "fa fa-home",
    "fa fa-book",
    "fa fa-list-ol",
    "fa fa-comments",
    "fa fa-flag-checkered",
  ];

  private setSelectMenu(selected: number) {
    this.selectMenu = selected;
  }

  private selecInfor() {
    this.selectMenu = -1;
  }

  get getAccountInfor() {
    return loginStore.getAccountInfor;
  }

  get getAccountInforApi() {
    if (loginStore.getSessionMaTk != undefined) {
      loginStore.updateAccountApi();
      return loginStore.getAccountInforApi();
    } else return "";
  }

  private logOut() {
    sessionStorage.clear();
    localStorage.clear();
  }

  get getSelectMenu() {
    return this.selectMenu;
  }

  get textLogin() {
    if (loginStore.getSessionMaTk != undefined) {
      return loginStore.getSessionMaTk;
    }
    return "";
  }

  created() {
    if (loginStore.getSessionMaTk != undefined) {
      loginStore.getAccountApi({
        user: loginStore.getSessionUsername,
        pass: loginStore.getSessionPassword,
      });
    }
  }
}
</script>

<style>
/* top header */
#top_header {
  background-color: #ff69b4;
  color: rgb(250, 250, 250);
  border-bottom: 1px rgb(241, 241, 241) solid;
  height: 35px;
  text-shadow: 1px 1px 1px rgb(73, 73, 73);
}

#top_header div i {
  text-shadow: 1px 1px 1px rgb(255, 255, 255);
}

#top_header div p {
  margin-right: 15px;
  font-size: small;
  padding-top: 6px;
}

#dangNhap {
  margin-left: auto;
}

#dangNhap b:hover {
  cursor: pointer;
  color: rgb(255, 251, 0);
}

/* header */
#header {
  background-color: #ffe4e1;
}

#header img {
  margin: 15px 0px;
}

#smile {
  border-radius: 50%;
}

/* menu */
#menu a,
#menu span {
  color: #ff1493;
}
#menu {
  cursor: pointer;
  text-align: center;
  margin-left: 85px;
  text-shadow: 2px 2px 2px #535343;
}
#menu h4 {
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px 5px #ff0080;
}

#menu div {
  margin-right: 20px;
}

#menu a:hover,
#menu span:hover {
  color: white;
  text-shadow: 2px 2px 2px #ff0080;
  /* transform: scale(1.16); */
  text-decoration: none;
  cursor: pointer;
}

.activeMenuNav h4,
#menu div:hover h4 {
  color: #ff0080 !important;
  text-shadow: 2px 2px 2px #ffffff !important;
}

#menu i {
  font-size: 60px;
}

.activeMenuNav,
.activeMenuNav span {
  color: white !important;
  text-shadow: 2px 2px 2px #ff0080;
  transform: scale(1.16);
  text-decoration: none;
  cursor: auto !important;
}
</style>
