<template>
  <div @show="getVobApi">
    <div class="ml-5 text-right">
      <button id="addPart" class="btn" @click="$bvModal.show('addTV')">
        <i class="fa fa-plus" aria-hidden="true"></i> <b>Từ vựng</b>
      </button>
    </div>
    <table id="tableTest" class="mb-2">
      <tr class="text-center">
        <th><b>Từ vựng</b></th>
        <th><b>Kanji</b></th>
        <th><b>Nghĩa</b></th>
        <th><b>Sửa</b></th>
        <th><b>Xóa</b></th>
      </tr>
      <tr v-for="vob in getVocabularyLimit" :key="vob.matv">
        <td>{{ vob.tentv }}</td>
        <td>{{ vob.tenkanji }}</td>
        <td id="nghia">{{ vob.nghia }}</td>
        <td class="text-center">
          <i
            class="fa fa-pencil text-warning icon"
            @click="$bvModal.show('editTV'), setVob(vob)"
            aria-hidden="true"
          ></i>
        </td>
        <td class="text-center">
          <i
            @click="removeTV(vob.matv, vob.tentv)"
            class="fa fa-trash text-danger icon"
            aria-hidden="true"
          ></i>
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
    <sua-tv :propVob="getVob" />
    <them-tv :propBH="propBH" :propVob="getVocabulary" @reloadtv="reloadtv" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import VocabularyStore from "../../../../../../store/hoc/lesson/VocabularyStore";
import { getModule } from "vuex-module-decorators";
import lodash from "lodash";
import LoginStore from "@/store/LoginStore";
import axios from "axios";
import ThemTv from "./ThemTVComponent.vue";
import SuaTv from "./SuaTVComponent.vue";

const loginStore = getModule(LoginStore);
const vocabularyStore = getModule(VocabularyStore);

@Component({
  components: {
    ThemTv,
    SuaTv,
  },
})
export default class QuanLyTV extends Vue {
  @Prop()
  propBH!: string;

  private startArray = 0;
  private currentPage = 1;
  private limit = 15;
  private vob = "";

  get getVob() {
    return this.vob;
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
    return vocabularyStore.getVocabularyApi(this.propBH);
  }

  async reloadtv() {
    await vocabularyStore.getVocabularyApi(this.propBH);
  }

  setVob(vob: any) {
    this.vob = vob;
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
  removeTV(matv: any, tentv: any) {
    let retVal = confirm(`Bạn thật sự muốn xóa từ vựng: ${tentv}`);
    if (retVal == true) {
      axios
        .get("http://localhost:3000/vocabulary/remove", {
          params: {
            matv: matv,
          },
        })
        .then((res) => {
          this.reloadtv();
        });
    }
  }
}
</script>

<style>
#addPart {
  background-color: #ff1d5e;
  color: white;
  font-size: small;
}
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
