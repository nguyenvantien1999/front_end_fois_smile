<template>
  <div id="admin">
    <div id="headerAdmin" class="row pt-3 pb-3 pl-5">
      <img
        width="150px"
        height="auto"
        src="../../assets/images/logoJapan.jpg"
        alt="logo"
      />
      <div class="ml-2 mt-2">
        <h3 style="margin-top: 30px">
          <b>
            <span class="text-primary">F<span class="text-danger">O</span>IS</span>
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
      <div id="titleHeaderAdmin" class="text-center mt-2">
        <h2><b>Trang quản trị FOIS-Smile</b></h2>
        <p>
          Quản trị viên: {{ getInfoAdmin.hoten }} <br />
          <span class="text-danger"><b>Đăng xuất</b></span>
        </p>
      </div>
    </div>
    <div class="container mt-3">
      <nav-admin v-if="getNavAdmin == 0" @nav="setNav"/>
      <ds-tai-khoan-hv v-if="getNavAdmin == 1" @nav="setNav"/>
      <ds-hoc-vien v-if="getNavAdmin == 2" @nav="setNav"/>
      <tien-do-ht v-if="getNavAdmin == 3" @nav="setNav"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginAdminStore from "../../store/LoginAdminStore";
import { getModule } from "vuex-module-decorators";
import NavAdmin from "./NavAdminComponent.vue";
import DsTaiKhoanHv from "./chuc_nang/tai_khoan_hoc_vien/DSTaiKhoanHVComponent.vue";
import DsHocVien from "./chuc_nang/danh_sach_hoc_vien/DSHocVienComponent.vue";
import TienDoHt from "./chuc_nang/tien_do_hoc_tap/TienDoHTComponent.vue";

const loginAdminStore = getModule(LoginAdminStore);

@Component({
  components: {
    NavAdmin,
    DsTaiKhoanHv,
    DsHocVien,
    TienDoHt,
  },
})
export default class AdminComponent extends Vue {
  private navAdmin = 0;

  get getNavAdmin(){
    return this.navAdmin;
  }
  get getInfoAdmin() {
    return loginAdminStore.getAccAdminInfor;
  }
  created() {
    loginAdminStore.getAccAdminInforApi();
  }
  setNav(data: number){
    this.navAdmin = data;
  }
}
</script>

<style>
#admin {
  overflow-x: hidden;
}
#titleHeaderAdmin h2 {
  color: #ff0080;
  text-shadow: 2px 2px 2px darkgrey;
}
#titleHeaderAdmin {
  margin: 0 auto;
  margin-right: 30vw;
}
#headerAdmin {
  border-left: 45px solid #ff69b4;
  border-right: 45px solid #ff69b4;
  background-color: #ffe4e1;
}
</style>
