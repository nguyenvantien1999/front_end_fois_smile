<template>
  <div>
    <div id="header_bang_tin" class="mt-5">
      <h4><b>CHỨC NĂNG QUẢN TRỊ</b></h4>
    </div>
    <div class="justify-content-center d-flex mt-5 mb-5">
      <div class="navAdmin text-center" @click="clickNav(1)">
        <h1><i class="fa fa-users" aria-hidden="true"></i></h1>
        <h4><b>Tài khoản <br> học viên</b></h4>
      </div>
      <div class="navAdmin ml-5 text-center"  @click="clickNav(2)">
        <h1><i class="fa fa-address-card" aria-hidden="true"></i></h1>
        <h4><b>Danh sách <br> học viên</b></h4>
      </div>
      <div class="navAdmin ml-5 text-center"  @click="clickNav(3)">
        <h1><i class="fa fa-line-chart" aria-hidden="true"></i></h1>
        <h4><b>Tiến độ học tập</b></h4>
      </div>
      <div class="navAdmin ml-5 text-center"  @click="clickNav(4)">
        <h1><i class="fa fa-check-square" aria-hidden="true"></i></h1>
        <h4><b>Điểm bài kiểm tra</b></h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavAdmin extends Vue {
  clickNav(nav: number){
    this.$emit("nav", nav);
  }
}
</script>

<style>
.navAdmin {
  background-color: #ff0080d0 !important;
  border-radius: 20px;
  box-shadow: 1px 2px 1px black;
  color: white;
  padding: 11px;
  width: 25%;
}
.navAdmin:hover {
  cursor: pointer;
}
.navAdmin:active {
  background-color: #ff00808c !important;
  box-shadow: -1px -1px 1px rgb(82, 82, 82) !important;
  text-shadow: 1px 1px 1px #ff0080;
}
</style>
