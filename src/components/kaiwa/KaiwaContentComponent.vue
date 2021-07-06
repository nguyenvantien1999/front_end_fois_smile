<template>
  <div @show="getKWApi" class="ml-5 mr-5 mb-5">
    <h2 id="tieuDeBH" class="mt-5 mb-4">
      <b>{{ propKW.name }}</b>
    </h2>
    <table style="margin: 0 auto" v-for="(kw, i) in getNDKW" :key="i">
      <tr class="text-center">
        <audio
          class="mb-3"
          id="audioKaiwa"
          :src="kw.linkaudio"
          controls
        ></audio>
      </tr>
      <tr v-if="!showNghia" v-html="kw.noidung"></tr>
      <tr v-else v-html="kw.nghia"></tr>
      <tr class="text-center">
        <p id="btnNghia" @click="showNghia = !showNghia" class="btn">
          <b>{{ btnNghia }}</b>
        </p>
      </tr>
    </table>
    <div class="text-center">
      <img
        width="500px"
        height="auto"
        :src="kw.hinhanh"
        alt="logo"
        v-for="(kw, i) in getNDKW"
        :key="i"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class KaiwaContent extends Vue {
  @Prop()
  propKW = { i: 0, id: "KW001", name: "はじめまして" };
  private noidungKW = {};
  private showNghia = false;

  get btnNghia() {
    if (this.getShowNghia == false) {
      return "Tiếng Việt";
    } else {
      return "Tiếng Nhật";
    }
  }

  get getShowNghia() {
    return this.showNghia;
  }
  get getNDKW() {
    return this.noidungKW;
  }
  get getIDKW() {
    return this.propKW.id;
  }
  get getKWApi() {
    axios
      .get("http://localhost:3000/kaiwa/content", {
        params: {
          maht: this.getIDKW,
        },
      })
      .then((res) => {
        this.noidungKW = res.data;
      });
    return 0;
  }
}
</script>

<style>
#btnNghia {
  background-color: #ff0080;
  color: white;
  box-shadow: 1px 1px 1px black;
}
#btnNghia:active {
  box-shadow: 1px 1px 1px rgb(112, 111, 111);
}
#audioKaiwa {
  border: 1px solid #ff0080 !important;
  border-radius: 25px;
  box-shadow: 2px 2px 2px violet;
}
table {
  font-family: "Noto Serif JP", serif;
}
</style>
