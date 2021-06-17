<template>
  <b-row name="Higarana">
    <b-col col lg="5">
      <table class="mt-5 mb-5 ml-5" name="HigaranaTuDon">
        <tr v-for="(hang, i) in getHigaDonState" :key="i">
          <b-th
            @click="$bvModal.show(`chuDonmyModal${chu.machu}`)"
            :class="{ th: chu.tenchu != '' }"
            v-for="chu in hang"
            :key="chu.machu"
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
      <table class="mt-lg-5 mb-5 ml-5 ml-xl-4" name="HigaranaTuKep">
        <tr v-for="(hang, i) in getHigaKepState" :key="i">
          <b-th
            v-b-modal="`chuKepmyModal${chu.machu}`"
            :class="{ th: chu.tenchu != '' }"
            v-for="chu in hang"
            :key="chu.machu"
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
import HiraganaStore from "../../../store/hoc/ban_chu_cai/HiraganaStore";
import modalComponent from "../modal/ModalAlphabetComponent.vue";
import lodash from "lodash";

const hiraganaStore = getModule(HiraganaStore);

@Component({
  components: {
    modalComponent,
  },
})
export default class Hiragana extends Vue {
  get getHigaDonState() {
    let bangDon: any = hiraganaStore.getStateBangChuDon;
    bangDon.splice(36, 0, { tenchu: "" });
    bangDon.splice(38, 0, { tenchu: "" });
    bangDon.splice(46, 0, { tenchu: "" });
    bangDon.splice(48, 0, { tenchu: "" });
    return lodash.chunk(bangDon, 5);
  }

  get getHigaKepState() {
    let bangKep: any = hiraganaStore.getStateBangChuKep;

    return lodash.chunk(bangKep, 3);
  }

  beforeCreate() {
    hiraganaStore.getBDHiraApi();
    hiraganaStore.getBKHiraApi();
  }
}
</script>

<style>
.th {
  padding: 0px 20px;
  font-size: 40px;
  border: 2px solid rgb(255, 0, 149);
  text-align: center;
}

.th:hover {
  /* background-color: rgb(30, 253, 253); */
  background-color: rgb(253, 95, 67);
  color: lightgoldenrodyellow;
  cursor: pointer;
}
</style>
