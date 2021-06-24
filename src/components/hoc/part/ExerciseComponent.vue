<template>
  <div @show="getExerciseApi" class="ml-5 mr-5">
    <h2 id="tieuDeBH" class="mt-5 mb-4">
      <b>Bài tập bài {{ propBH }}</b>
    </h2>
    <b
      class="text-danger"
      v-if="getExercise[getViTriCH] != undefined"
      v-html="`${getViTriCH + 1}. ${getExercise[getViTriCH].tench}`"
    >
    </b>
    <div>
      <img
        class="img-thumbnail"
        v-if="
          getExercise[getViTriCH] != undefined &&
          getExercise[getViTriCH].hinhanh != undefined
        "
        :src="
          require('../../../assets/images/question/' +
            getExercise[getViTriCH].hinhanh)
        "
        alt=""
      />
    </div>
    <question
      class="ml-4"
      v-if="getExercise[getViTriCH] != undefined"
      :propMaCH="getExercise[getViTriCH].mach"
      :propShowDA="getShowDA"
    />
    <div class="text-center" v-if="getExercise[getViTriCH] != undefined">
      <input
        v-if="!getShowDA"
        class="btnTestPage btn"
        type="button"
        @click="check"
        value="Đáp án"
      />
      <input
        v-else-if="viTriCH + 1 != getExercise.length"
        class="btnTestPage btn"
        type="button"
        @click="nextQuestion"
        value="Tiếp theo"
      />
      <input
        v-else
        class="btnTestPage btn mt-3"
        @click="reset"
        type="button"
        value="Làm lại"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import LoginStore from "@/store/LoginStore";
import Question from "./QuestionComponent.vue";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    Question,
  },
})
export default class Exercise extends Vue {
  @Prop()
  propBH!: number;
  private exercise = [];
  private viTriCH = 0;
  private showDA = false;

  get getMaBT() {
    if (this.propBH < 10) return `BT00${this.propBH}`;
    return `BT0${this.propBH}`;
  }
  get getShowDA() {
    return this.showDA;
  }
  get getViTriCH() {
    return this.viTriCH;
  }
  get getExercise() {
    return this.exercise;
  }
  nextQuestion() {
    if (this.viTriCH + 1 < this.exercise.length) {
      this.showDA = false;
      return this.viTriCH++;
    }
  }
  check() {
    this.showDA = true;
  }
  reset() {
    this.showDA = false;
    this.viTriCH = 0;
  }

  get getExerciseApi() {
    this.showDA = false;
    this.viTriCH = 0;
    axios
      .get("http://localhost:3000/question", {
        params: {
          mabai: this.getMaBT,
        },
      })
      .then((res) => {
        this.exercise = res.data;
      });
    return 0;
  }
}
</script>

<style></style>
