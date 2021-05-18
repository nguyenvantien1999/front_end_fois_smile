<template>
  <div @show="getGramApi" class="m-5">
    <h2 id="tieuDeBH" class="mt-5">
      <b>Ngữ pháp bài {{ propBH }}</b>
    </h2>
    <div class="mt-5">
      <p class="grammar" v-for="(gram, i) in getGrammar" :key="gram.manp">
        <b class="text-danger">{{ i + 1 }}. {{ gram.tennp }}</b
        ><br />
        <structure :propNP="gram.manp" :propID="i" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import GrammarStore from "../../../store/hoc/lesson/GrammarStore";
import Structure from "../part/StructureComponent.vue";
import axios from "axios";
import LoginStore from "@/store/LoginStore";

const loginStore = getModule(LoginStore);
const grammarStore = getModule(GrammarStore);

@Component({
  components: {
    Structure,
  },
})
export default class Grammar extends Vue {
  @Prop()
  propBH!: number;

  get getMaBH() {
    if (this.propBH < 10) return `BH00${this.propBH}`;
    return `BH0${this.propBH}`;
  }

  get getGramApi() {
    return grammarStore.getGrammarApi(this.getMaBH);
  }

  get getGrammar() {
    return grammarStore.getStateGrammar;
  }
}
</script>

<style></style>
