<template>
  <b-row class="row" name="katakana">
    <b-col col lg="5">
      <table class="mt-5 mb-5 ml-5" name="KatakanaTuDon">
        <tr v-for="(hang, i) in getKataDonState" :key="i">
          <b-th
            @click="$bvModal.show(`chuDonmyModal${chu.machu}`)"
            :class="{ th: chu.tenchu != '' }"
            v-for="chu in hang"
            :key="chu.machu"
            :name="chu.machu"
            >{{ chu.tenchu }}
            <modalComponent
              :propID="`chuDonmyModal${chu.machu}`"
              v-if="chu.tenchu != ''"
              :chuCai="chu"
            />
          </b-th>
        </tr>
      </table>
    </b-col>
    <b-col col lg="6" offset-lg="1">
      <table class="mt-lg-5 mb-5 ml-5 ml-lg-4" name="KatakanaTuKep">
        <tr v-for="(hang, i) in getKataKepState" :key="i">
          <b-th
            v-b-modal="`chuKepmyModal${chu.machu}`"
            :class="{ th: chu.tenchu != '' }"
            v-for="chu in hang"
            :key="chu.machu"
            :name="chu.machu"
            >{{ chu.tenchu }}
            <modalComponent
              :propID="`chuKepmyModal${chu.machu}`"
              v-if="chu.tenchu != ''"
              :chuCai="chu"
            />
          </b-th>
        </tr>
      </table>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import KatakanaStore from "../../../store/hoc/ban_chu_cai/KatakanaStore";
import modalComponent from "../modal/ModalAlphabetComponent.vue";
import lodash from "lodash";

const katakanaStore = getModule(KatakanaStore);

@Component({
  components: {
    modalComponent,
  },
})
export default class Katakana extends Vue {
  get getKataDonState() {
    let bangDon: any = katakanaStore.getStateKataChuDon;
    bangDon.splice(36, 0, { tenchu: "" });
    bangDon.splice(38, 0, { tenchu: "" });
    bangDon.splice(46, 0, { tenchu: "" });
    bangDon.splice(48, 0, { tenchu: "" });
    return lodash.chunk(bangDon, 5);
  }

  get getKataKepState() {
    let bangKep: any = katakanaStore.getStateKataChuKep;

    return lodash.chunk(bangKep, 3);
  }

  beforeCreate() {
    katakanaStore.getBDKaTaApi();
    katakanaStore.getBKKataApi();
  }
}
</script>

<style></style>
