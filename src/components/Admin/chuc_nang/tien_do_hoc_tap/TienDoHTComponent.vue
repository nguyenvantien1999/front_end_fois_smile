<template>
  <div>
    <div id="header_bang_tin" class="mt-5">
      <h4><b>TIẾN ĐỘ HỌC TẬP</b></h4>
    </div>
    <table id="tableTest" class="text-center">
      <tr>
        <th>STT</th>
        <th>Họ tên học viên</th>
        <th>Tiến độ</th>
        <th>Chi tiết</th>
      </tr>
      <tr
        v-for="(hv, i) in getInforHV"
        :key="i"
      >
        <td>{{ i + 1 }}</td>
        <td>{{ hv.hoten }}</td>
        <td>{{ hv.matt != 0 ? "Bài " + hv.matt : "Chưa học" }}</td>
        <td class="text-info">
          <i
            @click="$bvModal.show('chiTietTD'), showCT(hv.matk)"
            class="fa fa-eye icon"
            aria-hidden="true"
            v-if="hv.matt != 0"
          ></i>
          <i
            v-else
            class="fa fa-eye-slash text-danger eyesDanger"
            aria-hidden="true"
          ></i>
        </td>
        <td class="cup">
          <i
            v-if="i == 0 || i == 1 || i == 2"
            :class="{ hang1: i == 0, hang2: i == 1, hang3: i == 2 }"
            class="fa fa-trophy"
            aria-hidden="true"
          ></i>
        </td>
      </tr>
    </table>
    <p class="text-right backAdmin" @click="clickNav(0)">
      <i class="fa fa-reply text-danger" aria-hidden="true"></i
      ><small><b class="text-danger"> Trở về</b></small>
    </p>
    <chi-tiet-td :propMaTK="getMaTK" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import LoginStore from "@/store/LoginStore";
import { getModule } from "vuex-module-decorators";
import lodash from "lodash";
import ChiTietTd from "./ChiTietTDComponent.vue";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    ChiTietTd,
  },
})
export default class TienDoHT extends Vue {
  private inforHV: any = [];
  private matk = "";

  get getMaTK() {
    return this.matk;
  }
  get getInforHV() {
    return lodash.sortBy(this.inforHV, "matt").reverse();
  }

  private clickNav(nav: number) {
    this.$emit("nav", nav);
  }
  // private getDateOfBirth(ngaysinh: string) {
  //   if (ngaysinh != null) {
  //     let date = new Date(ngaysinh);
  //     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  //   } else {
  //     return "Chưa xách định";
  //   }
  // }
  private showCT(matk: any) {
    this.matk = matk;
  }
  async progressAPI(matk: any) {
    let tiendo: never[] = [];
    await axios
      .get("http://localhost:3000/progress/getAll", {
        params: {
          matk: matk,
        },
      })
      .then((res) => {
        tiendo = res.data.length;
      });
    return tiendo;
  }

  beforeCreate() {
    axios.get("http://localhost:3000/account/getAllHVInfor").then((res) => {
      res.data.forEach(async (info: { matt: any; matk: any }) => {
        info.matt = await this.progressAPI(info.matk);
      });
      this.inforHV = res.data;
    });
  }
}
</script>

<style>
.hang1, .hang2, .hang3, .eyesDanger{
  text-shadow: 1px 1px 1px black;
}
.hang1 {
  color: gold;
}
.hang2 {
  color: darkgrey;
}
.hang3 {
  color: chocolate;
}
.cup{
  border: none !important;
}
</style>
