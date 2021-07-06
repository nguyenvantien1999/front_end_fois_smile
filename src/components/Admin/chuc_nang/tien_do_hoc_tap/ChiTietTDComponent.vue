<template>
  <b-modal id="chiTietTD" hide-footer :title-html="title">
    <table id="tableTest" @show="progressAPI">
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
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class chiTietTD extends Vue {
  @Prop()
  propMaTK: any;
  private progress = "";
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Tiến độ học tập</b>";

  get getProgress() {
    return this.progress;
  }
  get progressAPI() {
    if (this.propMaTK != "") {
      axios
        .get("https://backend-fois-smile.herokuapp.comprogress/getAll", {
          params: {
            matk: this.propMaTK,
          },
        })
        .then((res) => {
          this.progress = res.data;
        });
    }
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
