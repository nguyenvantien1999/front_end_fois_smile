<template>
  <div id="menuTest">
    <h5 class="text-light"><strong>Bài kiểm tra</strong></h5>
    <p
      @click="selectTest({ i: i, id: test.mabaikt })"
      :class="{ menuTestActive: getActiveTest == i }"
      v-for="(test, i) in getTest"
      :key="test.mabaikt"
    >
      <b>Bài {{ i + 1 }}: {{ test.tenbaikt }}</b>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class ListTest extends Vue {
  private test = [];
  private activeTest = -1;

  get getTest() {
    return this.test;
  }

  get getActiveTest() {
    return this.activeTest;
  }

  selectTest(selected: any) {
    this.activeTest = selected.i;
    this.$emit("selectTest", selected.id);
  }

  async created() {
    await axios.get("https://backend-fois-smile.herokuapp.comtest").then((res) => {
      this.test = res.data;
    });
  }
}
</script>

<style>
#menuTest {
  width: 20%;
  margin-right: 10px;
  background-color: white;
}
#menuTest h5 {
  background-color: #ff69b4;
  padding: 5px;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#menuTest p {
  color: #ff0080;
  border: 2px solid rgb(90, 90, 90);
  border-radius: 10px;
  margin-bottom: 4px;
  padding: 2px 5px;
  box-shadow: 2px 2px #888888;
}
#menuTest p:hover,
.menuTestActive {
  border: 2px solid #ff0080 !important;
  color: rgb(255, 255, 255) !important;
  background-color: #ffb6c1;
  cursor: pointer;
  transform: scale(1.05);
}
</style>
