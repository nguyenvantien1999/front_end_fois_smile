<template>
  <div @show="getListenApi" class="ml-5 mr-5">
    <h2 id="tieuDeBH" class="mt-5 mb-4">
      <b>Nghe bài {{ propBH }}</b>
    </h2>
    <b
      class="text-danger"
      v-if="getListening[getViTriCH] != undefined"
      v-html="`${getViTriCH + 1}. ${getListening[getViTriCH].tench}`"
    >
    </b>
    <div>
      <img
        class="img-thumbnail"
        v-if="
          getListening[getViTriCH] != undefined &&
          getListening[getViTriCH].hinhanh != undefined
        "
        :src="getListening[getViTriCH].hinhanh"
        alt=""
      />
    </div>
    <div class="text-center">
      <audio
        class="mb-3"
        id="audioListen"
        v-if="
          getListening[getViTriCH] != undefined &&
          getListening[getViTriCH].linkaudio != undefined
        "
        :src="getListening[getViTriCH].linkaudio"
        controls
      ></audio>
    </div>

    <question
      class="ml-4"
      v-if="getListening[getViTriCH] != undefined"
      :propMaCH="getListening[getViTriCH].mach"
      :propShowDA="getShowDA"
    />
    <div class="text-center" v-if="getListening[getViTriCH] != undefined">
      <input
        v-if="!getShowDA"
        class="btnTestPage btn"
        type="button"
        @click="check"
        value="Đáp án"
      />
      <input
        v-else-if="viTriCH + 1 != listening.length"
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
import axios, { AxiosResponse } from "axios";
import Question from "./QuestionComponent.vue";
import { getModule } from "vuex-module-decorators";
import LoginStore from "@/store/LoginStore";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    Question,
  },
})
export default class Listening extends Vue {
  @Prop()
  propBH!: number;
  private listening = [];
  private viTriCH = 0;
  private showDA = false;

  get getShowDA() {
    return this.showDA;
  }
  get getMaBN() {
    if (this.propBH < 10) return `N000${this.propBH}`;
    return `N00${this.propBH}`;
  }
  get getViTriCH() {
    return this.viTriCH;
  }
  nextQuestion() {
    if (this.viTriCH + 1 < this.listening.length) {
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

  get getListenApi() {
    this.showDA = false;
    this.viTriCH = 0;
    axios
      .get("https://backend-fois-smile.herokuapp.com/question", {
        params: {
          mabai: this.getMaBN,
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

<style>
.pre-formatted {
  white-space: pre-line !important;
}
#audioListen {
  border: 1px solid #ff0080 !important;
  border-radius: 25px;
  box-shadow: 2px 2px 2px violet;
}
</style>
