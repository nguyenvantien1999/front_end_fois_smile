<template>
  <div @show="transcriptAPI">
    <h4 id="tieuDeBH" class="mt-5">
      <b>Bảng điểm kiểm tra</b>
    </h4>
    <table id="tableTest" v-if="getTestTranscript != ''">
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
    <p v-else class="text-center">Chưa có bài kiểm tra nào</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import LoginStore from "../../store/LoginStore";
import { getModule } from "vuex-module-decorators";

const loginStore = getModule(LoginStore);

@Component
export default class TestTranscript extends Vue {
  private testTranscript = "";
  get getTestTranscript() {
    return this.testTranscript;
  }
  get transcriptAPI() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/testTranscript/get", {
        params: {
          matk: loginStore.getSessionMaTk,
        },
      })
      .then((res) => {
        this.testTranscript = res.data;
        console.log(res.data);
      });
    return 0;
  }
}
</script>

<style>
#tableTest {
  margin: 0 auto;
}
#tableTest td,
#tableTest th {
  border: 1px solid silver;
}
#tableTest th {
  color: white;
  padding: 0 20px;
  background-color: palevioletred;
}
</style>
