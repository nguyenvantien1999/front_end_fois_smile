<template>
  <div>
    <span v-for="ex in getExample" :key="ex.mavd">
      <i
        @click="audio(ex.tenvd)"
        id="speaker"
        class="fa fa-volume-up"
        aria-hidden="true"
      ></i>
      <span class="ml-1" v-html="ex.tenvd"></span>
      <span class="ml-5"> {{ ex.nghia }}</span> <br />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ExampleStore from "../../../store/hoc/ExampleStore";
import { getModule } from "vuex-module-decorators";
import axios, { AxiosResponse } from "axios";

const exampleStore = getModule(ExampleStore);

@Component
export default class Example extends Vue {
  @Prop()
  propCT: any;

  private example = [];

  get getExample() {
    return this.example;
  }

  async created() {
    await axios
      .get("https://backend-fois-smile.herokuapp.comexample", {
        params: {
          machu: this.propCT,
        },
      })
      .then((res) => {
        this.example = res.data;
      });
  }

  audio(tenChu: string) {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `responsiveVoice.speak("${tenChu}", "Japanese Female")`;
    document.body.appendChild(drawScript);
  }
}
</script>

<style>
#speaker:hover {
  cursor: pointer;
}
</style>
