<template>
  <div id="bangChuCai">
    <div id="menuBC" class="d-flex" style="background-color: #ffb6c1">
      <h4
        class="btnBC"
        v-for="(bang, index) in getBangChu"
        :key="bang.mabang"
        :class="{ isActive: getLoaiBang == index }"
        @click="setLoaiBang(index)"
      >
        <b>{{ bang.tenbang }}</b>
      </h4>
    </div>
    <hiragana v-show="getLoaiBang == 0" />
    <katakana v-show="getLoaiBang == 1" />
    <kanji v-show="getLoaiBang == 2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ListBH from "./ListBHComponent.vue";
import Hiragana from "./HiraganaComponent.vue";
import Katakana from "./KatakanaComponent.vue";
import Kanji from "./KanjiComponent.vue";
import AlphabetStore from "../../../store/hoc/ban_chu_cai/AlphabetStore";
import { getModule } from "vuex-module-decorators";

const alphabetStore = getModule(AlphabetStore);

@Component({
  components: {
    Hiragana,
    Katakana,
    Kanji,
  },
})
export default class Alphabet extends Vue {
  private loaiBang = 0;

  setLoaiBang(loaiBang: number) {
    this.loaiBang = loaiBang;
  }

  get getLoaiBang() {
    return this.loaiBang;
  }

  get getBangChu() {
    return alphabetStore.stateBangChu;
  }
  beforeCreate() {
    alphabetStore.getBCApi();
  }
}
</script>

<style>
/* bản chữ cái */
#menuBC {
  background-color: #ffb6c1;
  border-bottom: 1px solid #ff0080;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 1px 1px 1px #ffb6c1;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 5px;
}
.btnBC {
  background-color: #ff69b4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ff0080;
  color: white;
  position: relative;
  top: 1px;
  width: 33%;
  padding: 10px 25px;
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
}
.btnBC:not(.isActive):hover {
  background-color: #fdf181;
  color: #535343;
  cursor: pointer;
}

.isActive {
  border: 1px solid #ff0080;
  border-bottom: none;
  background-color: #ffffff;
  box-shadow: 2px 0px 2px #535343;
  color: #535343;
}
</style>
