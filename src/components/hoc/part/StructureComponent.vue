<template>
  <div>
    <p v-for="(struc, i) in getStructure" :key="struc.mact">
      <b v-show="struc.tenct != null">{{ i + 1 }}) {{ struc.tenct }} <br /></b>
      {{ struc.nghia }}<br />
      <example :propCT="struc.mact" />
      <span style="color: red" v-show="struc.chuy != null">
        Chú ý {{ struc.chuy }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import StructureStore from "../../../store/hoc/lesson/StructureStore";
import { getModule } from "vuex-module-decorators";
import Example from "./ExampleComponent.vue";
import axios, { AxiosResponse } from "axios";

const structureStore = getModule(StructureStore);

@Component({
  components: {
    Example,
  },
})
export default class Structure extends Vue {
  @Prop()
  propNP!: any;

  @Prop()
  propID!: any;

  private structure = [];

  async created() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/structure", {
        params: {
          manp: this.propNP,
        },
      })
      .then((res) => {
        this.structure = res.data;
      });
  }

  get getStructure() {
    return this.structure;
  }
}
</script>

<style></style>
