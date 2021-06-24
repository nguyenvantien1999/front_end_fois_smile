<template>
  <div>
    <div>
      <div id="header_bang_tin" class="mt-5">
        <h4><b>DANH SÁCH TÀI KHOẢN HỌC VIÊN</b></h4>
      </div>
      <div class="row">
        <table class="text-center">
          <tr class="bg-info">
            <small><b class="pl-2 pr-2">Đăng nhập cách hiện tại</b></small>
          </tr>
          <tr>
            <small>từ 7 ngày trở xuống</small>
          </tr>
          <tr class="tren7ngay">
            <small>trên 7 ngày</small>
          </tr>
          <tr class="tren30ngay">
            <small>trên 30 ngày</small>
          </tr>
        </table>
        <div id="divAddTk">
          <button id="addTK" class="btn" @click="$bvModal.show('addTaiKhoan')"><i class="fa fa-plus" aria-hidden="true"></i> <b>Tài khoản</b></button>
        </div>
      </div>
      <table id="tableTest" class="text-center">
        <tr>
          <th>STT</th>
          <th>Tên tài khoản</th>
          <th>Thời gian đăng nhập</th>
          <th>Chi tiết</th>
          <th>Xóa</th>
        </tr>
        <tr
          v-for="(tk, i) in getTKHocVien"
          :key="i"
          :class="{
            tren7ngay: compareTgdnVsNow(tk.thoigiandn) > 7,
            tren30ngay: compareTgdnVsNow(tk.thoigiandn) > 30,
          }"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ tk.username }}</td>
          <td>{{ getNgayDN(tk.thoigiandn) }}</td>
          <td class="text-info">
            <i
              @click="$bvModal.show('chiTietTKHV'), showCT(tk.matk)"
              class="fa fa-eye icon"
              aria-hidden="true"
            ></i>
          </td>
          <td>
            <i
              @click="removeTK(tk.matk, tk.username)"
              class="fa fa-trash text-danger icon"
              aria-hidden="true"
            ></i>
          </td>
        </tr>
      </table>
      <p class="text-right backAdmin" @click="clickNav(0)">
        <i class="fa fa-reply text-danger" aria-hidden="true"></i
        ><small><b class="text-danger"> Trở về</b></small>
      </p>
    </div>
    <chi-tiet-tk-hv :propMaTK="getMaTk" />
    <them-tk/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import ChiTietTkHv from "./ChiTietTKHVComponent.vue";
import lodash from "lodash";
import ThemTk from "./ThemTKComponent.vue";

@Component({
  components: {
    ChiTietTkHv,
    ThemTk,
  },
})
export default class DSTaiKhoanHV extends Vue {
  private tkHocVien = "";
  private matk = "";

  get getMaTk() {
    return this.matk;
  }
  get getTKHocVien() {
    return this.tkHocVien;
  }
  getNgayDN(thoigiandn: string) {
    if (thoigiandn != null) {
      let date = new Date(thoigiandn);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    } else {
      return "Chưa được đăng nhập";
    }
  }
  compareTgdnVsNow(thoigiandn: string) {
    let now = Date.now();
    let dateInt = Date.parse(thoigiandn);
    return Math.round((now - dateInt) / (1000 * 60 * 60 * 24)) - 1;
  }
  clickNav(nav: number) {
    this.$emit("nav", nav);
  }
  showCT(matk: any) {
    this.matk = matk;
  }
  removeTK(matk: any, user: any) {
    let retVal = confirm(`Bạn thật sự muốn xóa tài khoản: ${user}`);
    if (retVal == true) {
      axios
        .get("https://backend-fois-smile.herokuapp.com/account/removeTKHV", {
          params: {
            matk: matk,
          },
        })
        .then((res) => {
          axios
            .get("https://backend-fois-smile.herokuapp.com/account/getAllHV")
            .then((res) => {
              this.tkHocVien = res.data;
            });
        });
    }
  }
  created() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/account/getAllHV")
      .then((res) => {
        this.tkHocVien = res.data;
      });
  }
}
</script>

<style>
.backAdmin {
  text-shadow: 1px 1px 1px black;
}
.icon {
  text-shadow: 1px 1px 1px black;
}
.backAdmin b:hover,
.icon:hover {
  cursor: pointer;
}
.tren7ngay {
  background-color: khaki;
}
.tren30ngay {
  background-color: tomato;
}
#addTK{
  background-color: #ff1d5e;
  color: white;
  font-size: small;
}
#divAddTk{
  margin-left: auto;
}
</style>
