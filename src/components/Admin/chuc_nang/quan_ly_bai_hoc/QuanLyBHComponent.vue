<template>
  <div>
    <div id="header_bang_tin" class="mt-5">
      <h4><b>QUẢN LÝ BÀI HỌC</b></h4>
    </div>
    <div class="input-group mb-2">
      <div class="input-group-append ml-5">
        <span class="input-group-text">Danh sách bài học </span>
      </div>
      <select id="loaitk" class="form-control" v-model="mabh">
        <option v-for="(less, i) in getLesson" :key="i" :value="less.mabh">
          Bài {{ i + 1 }}: {{ less.tenbh }}
          <sua-bh :propMaBH="less.mabh" :propTenBH="less.tenbh" @reloadBH="reloadBH"/>
        </option>
      </select>
      <div class="ml-5">
        <i
          v-if="getMabh != ''"
          class="fa fa-pencil text-warning icon mr-3"
          @click="$bvModal.show('editBaiHoc' + getMabh)"
          aria-hidden="true"
        ></i>
        <i
          v-if="getMabh != ''"
          @click="removeBH(getMabh)"
          class="fa fa-trash text-danger icon mr-3"
          aria-hidden="true"
        ></i>
        <button id="addTK" class="btn" @click="$bvModal.show('addBaiHoc')">
          <i class="fa fa-plus" aria-hidden="true"></i> <b>Bài học</b>
        </button>
      </div>
    </div>
    <div v-if="getMabh != ''">
      <h4 class="navQLBH bg-info pl-5 pt-2 pb-2">
        <b class="text-light"
          ><i
            class="fa fa-caret-right icon drop"
            aria-hidden="true"
            :class="{ 'd-none': getSelectNav == 0 }"
            @click="setSelectNav(0)"
          ></i
          ><i
            class="fa fa-caret-down icon drop"
            aria-hidden="true"
            @click="setSelectNav(-1)"
            v-if="getSelectNav == 0"
          ></i>
          Từ vựng</b
        >
      </h4>
      <quan-ly-tv :propBH="getMabh" v-if="getSelectNav == 0" />
      <h4 class="navQLBH bg-warning pl-5 pt-2 pb-2">
        <b class="text-light"
          ><i
            class="fa fa-caret-right icon drop"
            aria-hidden="true"
            :class="{ 'd-none': getSelectNav == 1 }"
            @click="setSelectNav(1)"
          ></i
          ><i
            class="fa fa-caret-down icon drop"
            aria-hidden="true"
            @click="setSelectNav(-1)"
            v-if="getSelectNav == 1"
          ></i>
          Ngữ pháp</b
        >
      </h4>
      <quan-ly-np :propBH="getMabh" v-if="getSelectNav == 1" />
      <h4 class="navQLBH bg-success pl-5 pt-2 pb-2">
        <b class="text-light"
          ><i
            class="fa fa-caret-right icon drop"
            aria-hidden="true"
            :class="{ 'd-none': getSelectNav == 2 }"
            @click="setSelectNav(2)"
          ></i
          ><i
            class="fa fa-caret-down icon drop"
            aria-hidden="true"
            @click="setSelectNav(-1)"
            v-if="getSelectNav == 2"
          ></i>
          Bài nghe</b
        >
      </h4>
      <quan-ly-bai-nghe :propBH="getMabh" v-if="getSelectNav == 2" />
      <h4 class="navQLBH bg-danger pl-5 pt-2 pb-2">
        <b class="text-light"
          ><i
            class="fa fa-caret-right icon drop"
            aria-hidden="true"
            :class="{ 'd-none': getSelectNav == 3 }"
            @click="setSelectNav(3)"
          ></i
          ><i
            class="fa fa-caret-down icon drop"
            aria-hidden="true"
            @click="setSelectNav(-1)"
            v-if="getSelectNav == 3"
          ></i>
          Bài tập</b
        >
      </h4>
      <quan-ly-bai-tap :propBH="getMabh" v-if="getSelectNav == 3" />
    </div>
    <p class="text-right backAdmin">
      <i class="fa fa-reply text-danger" aria-hidden="true"></i
      ><small><b class="text-danger" @click="clickNav(0)"> Trở về</b></small>
    </p>
    <div>
      <them-bh :propLessonLength="getLesson.length" @reloadBH="reloadBH" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LessonStore from "../../../../store/hoc/lesson/LessonStore";
import { getModule } from "vuex-module-decorators";
import axios from "axios";
import LoginStore from "@/store/LoginStore";
import ThemBh from "./ThemBHComponent.vue";
import QuanLyTv from "./part/quanLyTV/QuanLyTuVungComponent.vue";
import QuanLyNp from "./part/quanLyNP/QuanLyNguPhapComponent.vue";
import QuanLyBaiNghe from "./part/quanLyBN/QuanLyBaiNgheComponent.vue";
import QuanLyBaiTap from "./part/quanlyBT/QuanLyBTComponent.vue";
import SuaBh from "./SuaBHComponent.vue";


const lessonStore = getModule(LessonStore);
const loginStore = getModule(LoginStore);

@Component({
  components: {
    SuaBh,
    ThemBh,
    QuanLyTv,
    QuanLyNp,
    QuanLyBaiNghe,
    QuanLyBaiTap,
  },
})
export default class QuanLyBH extends Vue {
  private mabh = "";
  private selectNav = -1;

  removeBH(mabh: any) {
    let retVal = confirm(`Bạn thật sự muốn xóa bài học này`);
    if (retVal == true) {
      this.removeBN(mabh);
      axios
        .get("https://backend-fois-smile.herokuapp.com/lesson/remove", {
          params: {
            mabh: mabh,
          },
        })
        .then((res) => {
          this.reloadBH();
        });
    }
  }

  removeBN(mabh: any) {
    axios.get("https://backend-fois-smile.herokuapp.com/listening/remove", {
      params: {
        mabh: mabh,
      },
    });
  }

  get getSelectNav() {
    return this.selectNav;
  }
  get getMabh() {
    return this.mabh;
  }
  get getLesson() {
    return lessonStore.geStateLesson;
  }
  setSelectNav(nav: number) {
    this.selectNav = nav;
  }
  beforeCreate() {
    lessonStore.getLessonApi();
  }
  clickNav(nav: number) {
    this.$emit("nav", nav);
  }
  async reloadBH() {
    await lessonStore.getLessonApi();
  }
}
</script>

<style>
.navQLBH {
  border-radius: 5px;
  text-shadow: 1px 1px 1px black;
}
.drop:hover {
  color: red;
}
</style>
