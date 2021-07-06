<template>
  <b-modal id="chiTietKT" hide-footer :title-html="title">
    <table id="tableTest" @show="transcriptAPI">
      <tr>
        <th><b>STT</b></th>
        <th><b>Thời gian</b></th>
        <th><b>Tên bài kiểm tra</b></th>
        <th><b>Điểm</b></th>
      </tr>
      <tr class="text-center" v-for="(bai, i) in getTestTranscript" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ bai.thoigian }}</td>
        <td>{{ bai.tenbaikt }}</td>
        <td>{{ bai.diem }}/100点</td>
      </tr>
    </table>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ChiTietKiemTra extends Vue {
  @Prop()
  propMaTK: any;
  private testTranscript = "";
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Tiến độ làm kiểm tra</b>";

  get getTestTranscript() {
    return this.testTranscript;
  }
  get transcriptAPI() {
    axios
      .get("https://backend-fois-smile.herokuapp.comtestTranscript/get", {
        params: {
          matk: this.propMaTK,
        },
      })
      .then((res) => {
        this.testTranscript = res.data;
      });
    return 0;
  }
}
</script>

<style></style>
