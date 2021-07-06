<template>
  <div @show="getGramApi" class="mt-2">
    <div class="ml-5 text-right">
      <button id="addPart" class="btn" @click="$bvModal.show('addNguPhap')">
        <i class="fa fa-plus" aria-hidden="true"></i> <b>Ngữ pháp</b>
      </button>
    </div>
    <div>
      <span
        class="grammar"
        v-for="(gram, i) in getGrammarLimit"
        :key="gram.manp"
      >
        <span class="tenGram">
          <b class="text-danger">{{ i + 1 }}. {{ gram.tennp }}</b>
          |
          <i
            class="fa fa-pencil text-warning icon"
            aria-hidden="true"
            @click="$bvModal.show('editNP'), setGrammar(gram)"
          ></i>
          |
          <i
            class="fa fa-trash text-danger icon"
            aria-hidden="true"
            @click="removeNP(gram.manp, gram.tennp)"
          ></i>
        </span>
        <br />
        <quan-ly-ct :propNP="gram.manp" :propID="i" />
      </span>
    </div>
    <div id="btnVobPage" v-show="getGrammar.length > limit">
      <p class="btn btnPage" id="p" @click="backPage">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </p>
      <h5 class="pt-2 pl-2 pr-2">
        <b>Trang: {{ getCurrentPage }}</b>
      </h5>
      <p class="btn btnPage" id="p" @click="nextPage">
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </p>
    </div>
    <them-np
      :propGrammarLength="getGrammar.length"
      :propMaBH="propBH"
      @reloadNP="reloadNP"
    />
    <sua-np
      :propGrammar="getPropGrammar"
      :propgetGrammarLength="getGrammar.length"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import GrammarStore from "../../../../../../store/hoc/lesson/GrammarStore";
import axios from "axios";
import LoginStore from "@/store/LoginStore";
import lodash from "lodash";
import QuanLyCt from "./quanLyCT/QuanLyCauTrucComponent.vue";
import ThemNp from "./ThemNPComponent.vue";
import SuaNp from "./SuaNPComponent.vue";

const loginStore = getModule(LoginStore);
const grammarStore = getModule(GrammarStore);

@Component({
  components: {
    QuanLyCt,
    ThemNp,
    SuaNp,
  },
})
export default class QuanLyNP extends Vue {
  @Prop()
  propBH!: any;
  private startArray = 0;
  private currentPage = 1;
  private limit = 3;
  private grammar = "";

  get getPropGrammar() {
    return this.grammar;
  }

  get getLimit() {
    return this.limit;
  }

  get getStartArray() {
    return this.startArray;
  }

  get getCurrentPage() {
    return this.currentPage;
  }

  get getEndArray() {
    return this.startArray + this.getLimit;
  }

  get getGrammarLimit() {
    return lodash.slice(this.getGrammar, this.getStartArray, this.getEndArray);
  }

  setGrammar(grammar: any) {
    this.grammar = grammar;
  }

  nextPage() {
    if (this.startArray + this.getLimit < this.getGrammar.length) {
      this.currentPage++;
      this.startArray += this.getLimit;
    }
  }
  backPage() {
    if (this.startArray > 0) {
      this.currentPage--;
      this.startArray -= this.getLimit;
    }
  }

  get getGramApi() {
    return grammarStore.getGrammarApi(this.propBH);
  }

  get getGrammar() {
    return grammarStore.getStateGrammar;
  }
  reloadNP() {
    grammarStore.getGrammarApi(this.propBH);
  }
  removeNP(manp: any, tennp: any) {
    let retVal = confirm(`Bạn thật sự muốn xóa từ vựng: ${tennp}`);
    if (retVal == true) {
      axios
        .get("https://backend-fois-smile.herokuapp.com/grammar/remove", {
          params: {
            manp: manp,
          },
        })
        .then((res) => {
          this.reloadNP();
        });
    }
  }
}
</script>

<style>
.tenGram {
  position: relative;
  top: 25px !important;
}
</style>
