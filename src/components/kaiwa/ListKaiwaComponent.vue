<template>
  <div id="menuKaiwa" class="mr-2">
    <h5 class="text-light"><strong>KAIWA</strong></h5>
    <p
      @click="selectKaiwa({ i: i, id: kw.maht, name: kw.tenht })"
      :class="{ menuKWActive: getActiveKaiwa == i }"
      v-for="(kw, i) in getList"
      :key="kw.maht"
    >
      <b>Bài {{ i + 1 }}: {{ kw.tenht }}</b>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class ListKaiwa extends Vue {
  private listKaiwa = [];
  private activeKaiwa = 0;

  get getList() {
    return this.listKaiwa;
  }

  get getActiveKaiwa() {
    return this.activeKaiwa;
  }

  selectKaiwa(selected: any) {
    this.activeKaiwa = selected.i;
    this.$emit("selectKW", selected);
  }

  async created() {
    await axios.get("https://backend-fois-smile.herokuapp.comkaiwa").then((res) => {
      this.listKaiwa = res.data;
    });
  }
}
</script>

<style>
/* menu con */
#menuKaiwa {
  width: 20%;
  background-color: white;
}
#menuKaiwa h5 {
  background-color: #ff69b4;
  padding: 5px;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#menuKaiwa p {
  color: #ff0080;
  border: 2px solid rgb(90, 90, 90);
  border-radius: 10px;
  margin-bottom: 4px;
  padding: 2px 5px;
  box-shadow: 2px 2px #888888;
}
#menuKaiwa p:hover,
.menuKWActive {
  border: 2px solid #ff0080 !important;
  color: rgb(255, 255, 255) !important;
  background-color: #ffb6c1;
  cursor: pointer;
  transform: scale(1.05);
}
</style>
