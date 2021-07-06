<template>
  <div @show="progressAPI">
    <h4 id="tieuDeBH" class="mt-5">
      <b>Bảng tiến độ học tập</b>
    </h4>
    <table id="tableTest" v-if="getProgress != ''">
      <tr class="text-center">
        <th><b>Bài học</b></th>
        <th><b>Từ vựng</b></th>
        <th><b>Ngữ pháp</b></th>
        <th><b>Nghe</b></th>
        <th><b>Bài tập</b></th>
        <th><b>Tỷ lệ</b></th>
      </tr>
      <tr class="text-center" v-for="(p, i) in getProgress" :key="i">
        <td>{{ p.mabh }}</td>
        <td>
          <i
            v-if="p.tuvung == true"
            class="fa fa-check text-success"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-times text-danger" aria-hidden="true"></i>
        </td>
        <td>
          <i
            v-if="p.nguphap == true"
            class="fa fa-check text-success"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-times text-danger" aria-hidden="true"></i>
        </td>
        <td>
          <i
            v-if="p.nghe == true"
            class="fa fa-check text-success"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-times text-danger" aria-hidden="true"></i>
        </td>
        <td>
          <i
            v-if="p.baitap == true"
            class="fa fa-check text-success"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-times text-danger" aria-hidden="true"></i>
        </td>
        <td>{{ tyLe(p.tuvung, p.nguphap, p.nghe, p.baitap) }}%</td>
      </tr>
    </table>
    <p v-else class="text-center">Chưa học bài nào</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import LoginStore from "../../store/LoginStore";
import { getModule } from "vuex-module-decorators";

const loginStore = getModule(LoginStore);

@Component
export default class Progress extends Vue {
  private progress = "";

  get getProgress() {
    return this.progress;
  }

  get progressAPI() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/progress/getAll", {
        params: {
          matk: loginStore.getSessionMaTk,
        },
      })
      .then((res) => {
        this.progress = res.data;
      });
    return 0;
  }

  tyLe(tv: any, np: any, n: any, bt: any) {
    if (tv == true) tv = 1;
    else tv = 0;
    if (np == true) np = 1;
    else np = 0;
    if (n == true) n = 1;
    else n = 0;
    if (bt == true) bt = 1;
    else bt = 0;

    return ((tv + np + n + bt) / 4) * 100;
  }
}
</script>

<style></style>
