<template>
  <div>
    <div id="header_bang_tin" class="mt-5">
      <h4><b>TIẾN ĐỘ KIỂM TRA</b></h4>
    </div>
    <table id="tableTest" class="text-center">
      <tr>
        <th>STT</th>
        <th>Họ tên học viên</th>
        <th>Tiến độ</th>
        <th>Số lần</th>
        <th>Điểm trung bình</th>
        <th>Chi tiết</th>
      </tr>
      <tr v-for="(hv, i) in getInforHV" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ hv.hoten }}</td>
        <td>{{ hv.gioitinh != 0 ? hv.gioitinh + " bài" : "Chưa kiểm tra" }}</td>
        <td>{{ hv.matt.length != 0 ? hv.matt.length + " lần làm" : null }}</td>
        <td>{{ hv.diachi > 0 ? hv.diachi + " điểm" : "" }}</td>
        <td class="text-info">
          <i
            @click="$bvModal.show('chiTietKT'), showCT(hv.matk)"
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
    <chi-tiet-kiem-tra :propMaTK="getMaTK" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import LoginStore from "@/store/LoginStore";
import { getModule } from "vuex-module-decorators";
import lodash from "lodash";
import ChiTietKiemTra from "./ChiTietKiemTraComponent.vue";

@Component({
  components: {
    ChiTietKiemTra,
  },
})
export default class TienDoKiemTra extends Vue {
  private inforHV: any = [];
  private matk = "";
  private testTranscript = "";

  get getTestTranscript() {
    return this.testTranscript;
  }

  get getMaTK() {
    return this.matk;
  }
  get getInforHV() {
    return lodash.sortBy(this.inforHV, "diachi");
  }

  private clickNav(nav: number) {
    this.$emit("nav", nav);
  }

  private showCT(matk: any) {
    this.matk = matk;
  }

  async transcriptAPI(matk: any) {
    let tiendo: never[] = [];
    if (matk != null) {
      await axios
        .get("https://backend-fois-smile.herokuapp.com/testTranscript/get", {
          params: {
            matk: matk,
          },
        })
        .then((res) => {
          tiendo = res.data;
        });
    }
    return tiendo;
  }

  beforeCreate() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/account/getAllHVInfor")
      .then((res) => {
        res.data.forEach(
          async (info: {
            matt: any;
            matk: any;
            gioitinh: any;
            diachi: any;
          }) => {
            info.matt = await this.transcriptAPI(info.matk); // bảng điểm theo mã tài khoản
            info.gioitinh = this.lengthTestTranscript(info.matt); // số lượng bài kiểm tra đã làm
            info.diachi = this.mediumScore(info.matt); // điểm trung bình
          }
        );
        this.inforHV = res.data;
      });
  }

  lengthTestTranscript(info: any) {
    let testTranscript: any = [];
    info.forEach((i: { tenbaikt: any }) => {
      if (testTranscript.indexOf(i.tenbaikt) == -1) {
        testTranscript.push(i.tenbaikt);
      }
    });
    return testTranscript.length;
  }
  mediumScore(info: any) {
    let score = 0;
    info.forEach((i: { diem: any }) => {
      score += i.diem;
    });
    return score / info.length;
  }
}
</script>

<style></style>
