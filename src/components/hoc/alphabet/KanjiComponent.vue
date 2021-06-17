<template>
  <div class="row" name="Higarana">
    <div>
      <table class="mt-5 mb-5 ml-5 d-none d-lg-block" name="Kanji">
        <tr v-for="(hang, i) in getKanjiLG" :key="i">
          <b-th
            @click="$bvModal.show(`kanjiModal${chu.machu}`)"
            :class="{ th: chu.tenchu != '' }"
            v-for="chu in hang"
            :key="chu.machu"
            >{{ chu.tenchu
            }}<modal-kanji
              :propID="`kanjiModal${chu.machu}`"
              v-if="chu.tenchu != ''"
              :chuCai="chu"
          /></b-th>
        </tr>
      </table>
    </div>
    <b-col class="d-lg-none">
      <table class="mt-5 mb-5" style="margin: 0 auto" name="Kanji">
        <tr v-for="(hang, i) in getKanji" :key="i">
          <b-th
            @click="$bvModal.show(`kanjiModal${chu.machu}`)"
            :class="{ th: chu.tenchu != '' }"
            v-for="chu in hang"
            :key="chu.machu"
            >{{ chu.tenchu
            }}<modal-kanji
              :propID="`kanjiModal${chu.machu}`"
              v-if="chu.tenchu != ''"
              :chuCai="chu"
          /></b-th>
        </tr>
      </table>
    </b-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import KanjiStore from "../../../store/hoc/ban_chu_cai/KanjiStore";
import ModalKanji from "../modal/ModalKanjiComponent.vue";
import lodash from "lodash";

const kanjiStore = getModule(KanjiStore);

@Component({
  components: {
    ModalKanji,
  },
})
export default class Kanji extends Vue {
  get getKanji() {
    return lodash.chunk(kanjiStore.getStateKanji, 5);
  }

  get getKanjiLG() {
    return lodash.chunk(kanjiStore.getStateKanji, 10);
  }

  beforeCreate() {
    kanjiStore.getKanjiApi();
  }
}
</script>

<style></style>
