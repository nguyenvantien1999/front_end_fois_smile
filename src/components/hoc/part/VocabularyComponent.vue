<template>
  <div @show="getVobApi">
    <h2 id="tieuDeBH" class="mt-5">
      <b>Từ vựng bài {{ propBH }}</b>
    </h2>
    <table id="vob" class="mt-5 mb-2">
      <tr v-for="vob in getVocabularyLimit" :key="vob.matv">
        <td>{{ vob.tentv }}</td>
        <td>{{ vob.tenkanji }}</td>
        <td id="nghia">{{ vob.nghia }}</td>
        <td class="text-center" id="speaker" @click="audio(vob.tentv)">
          <i id="speaker" class="fa fa-volume-up" aria-hidden="true"></i>
        </td>
      </tr>
    </table>
    <div id="btnVobPage" v-show="getVocabulary.length > limit">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import VocabularyStore from "../../../store/hoc/lesson/VocabularyStore";
import { getModule } from "vuex-module-decorators";
import lodash from "lodash";
import LoginStore from "@/store/LoginStore";
import axios from "axios";

const loginStore = getModule(LoginStore);
const vocabularyStore = getModule(VocabularyStore);

@Component
export default class Vocabulary extends Vue {
  @Prop()
  propBH!: number;

  private startArray = 0;
  private currentPage = 1;
  private limit = 15;

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

  get getMaBH() {
    if (this.propBH < 10) return `BH00${this.propBH}`;
    return `BH0${this.propBH}`;
  }

  get getVocabularyLimit() {
    return lodash.slice(
      vocabularyStore.getStateVocabulary,
      this.getStartArray,
      this.getEndArray
    );
  }

  get getVocabulary() {
    return vocabularyStore.getStateVocabulary;
  }

  get getVobApi() {
    this.startArray = 0;
    this.currentPage = 1;
    return vocabularyStore.getVocabularyApi(this.getMaBH);
  }

  nextPage() {
    if (this.startArray + this.getLimit < this.getVocabulary.length) {
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

  audio(tenChu: string) {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `responsiveVoice.speak("${tenChu}", "Japanese Female")`;
    document.body.appendChild(drawScript);
  }
}
</script>

<style>
#tieuDeBH {
  color: #ff0080;
  text-align: center;
  text-shadow: 1px 1px 1px black;
}
#vob {
  margin: 0 auto;
}
#vob tr:hover {
  background-color: #ffe4e1;
}
#vob td {
  vertical-align: top;
  width: 150px;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
#nghia {
  width: 400px !important;
}
#speaker {
  width: 50px !important;
}
#speaker :hover {
  cursor: pointer;
}
#btnVobPage {
  color: #ff0080;
  text-shadow: 1px 1px 1px rgb(141, 141, 141);
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnPage {
  font-size: 23px !important;
  color: #ff0080 !important;
  text-shadow: 1px 1px 1px black;
}
.btnPage:hover {
  color: #ff008081 !important;
}
</style>
