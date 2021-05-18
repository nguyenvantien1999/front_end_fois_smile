<template>
  <div>
    <div id="header_bang_tin" class="mt-5">
      <h4><b>DANH SÁCH HỌC VIÊN</b></h4>
    </div>
    <table id="tableTest" class="text-center">
      <tr>
        <th>STT</th>
        <th>Họ tên học viên</th>
        <th>Ngày sinh</th>
        <th>Giới tính</th>
        <th>Địa chỉ</th>
      </tr>
      <tr v-for="(hv, i) in getInforHV" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ hv.hoten }}</td>
        <td>{{ getDateOfBirth(hv.ngaysinh) }}</td>
        <td>
          {{
            hv.gioitinh == 1 ? "Nam" : hv.gioitinh == 0 ? "Nữ" : "Chưa xác định"
          }}
        </td>
        <td>{{ hv.diachi == null ? "Chưa xác định" : hv.diachi }}</td>
      </tr>
    </table>
    <p class="text-right backAdmin" @click="clickNav(0)">
      <i class="fa fa-reply text-danger" aria-hidden="true"></i
      ><small><b class="text-danger"> Trở về</b></small>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class DSHocVien extends Vue {
  private inforHV = [];

  get getInforHV() {
    return this.inforHV;
  }
  private clickNav(nav: number) {
    this.$emit("nav", nav);
  }
  private getDateOfBirth(ngaysinh: string) {
    if (ngaysinh != null) {
      let date = new Date(ngaysinh);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    } else {
      return "Chưa xách định";
    }
  }
  created() {
    axios.get("https://backend-fois-smile.herokuapp.com/account/getAllHVInfor").then((res) => {
      this.inforHV = res.data;
    });
  }
}
</script>

<style></style>
