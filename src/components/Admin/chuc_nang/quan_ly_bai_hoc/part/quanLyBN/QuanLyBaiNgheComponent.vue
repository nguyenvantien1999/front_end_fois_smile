<template>
  <div @show="getListenApi">
    <p v-for="(listen, i) in getListening" :key="i">
      <span class="">
        <b>{{ listen.tenbainghe }}</b>
        <quan-ly-cau-hoi :propBN="listen.mabainghe" />
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import QuanLyCauHoi from "../quanLyCH/QuanLyCHComponent.vue";

@Component({
  components: {
    QuanLyCauHoi,
  },
})
export default class QuanLyBaiNghe extends Vue {
  @Prop()
  propBH!: any;
  private listening = [];

  get getListenApi() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/listening", {
        params: {
          mabh: this.propBH,
        },
      })
      .then((res) => {
        this.listening = res.data;
      });
    return 0;
  }

  get getListening() {
    return this.listening;
  }
}
</script>

<style></style>
