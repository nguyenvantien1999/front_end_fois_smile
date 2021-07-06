<template>
  <div @show="getExerciseApi">
    <p v-for="(ex, i) in getExercise" :key="i">
      <span class="">
        <b>{{ ex.tenbainghe }}</b>
        <quan-ly-cau-hoi :propBN="ex.mabt" />
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
export default class QuanLyBaiTap extends Vue {
  @Prop()
  propBH!: any;
  private exercise = [];

  get getExerciseApi() {
    axios
      .get("https://backend-fois-smile.herokuapp.comexercise", {
        params: {
          mabh: this.propBH,
        },
      })
      .then((res) => {
        this.exercise = res.data;
      });
    return 0;
  }

  get getExercise() {
    return this.exercise;
  }
}
</script>

<style></style>
