<template>
  <div>
    <div class="ml-5 text-right">
      <button
        id="addPart"
        class="btn"
        @click="$bvModal.show('addCT' + propNP)"
        :key="propNP"
      >
        <i class="fa fa-plus" aria-hidden="true"></i> <b>Cấu trúc</b>
      </button>
    </div>
    <table id="tableTest" class="mb-2">
      <tr class="text-center" v-if="getStructure != ''">
        <th style="width: 20%"><b>Tên cấu trúc</b></th>
        <th style="width: 50%"><b>Nghĩa</b></th>
        <th style="width: 20%"><b>Chú ý</b></th>
        <th style="width: 10%"><b>Ví dụ</b></th>
        <th style="width: 2%"><b>Sửa</b></th>
        <th style="width: 2%"><b>Xóa</b></th>
      </tr>
      <tr v-for="struc in getStructure" :key="struc.mact">
        <td>{{ struc.tenct }}</td>
        <td>{{ struc.nghia }}</td>
        <td>{{ struc.chuy }}</td>
        <td class="text-info text-center">
          <i class="fa fa-eye icon" aria-hidden="true" @click="$bvModal.show('qlVD' + struc.mact)"></i>
          <quan-ly-vd :propCT="struc.mact"/>
        </td>
        <td class="text-center">
          <i
            class="fa fa-pencil text-warning icon"
            aria-hidden="true"
            @click="$bvModal.show('editCT' + propNP), setPropStructure(struc)"
          ></i>
        </td>
        <td class="text-center">
          <i
            class="fa fa-trash text-danger icon"
            aria-hidden="true"
            @click="removeCT(struc.mact)"
          ></i>
        </td>
      </tr>
    </table>
    <them-ct
      :propNP="propNP"
      :propgetStrucLength="getStructure.length"
      @reloadCT="reloadCT"
    />
    <sua-ct
      :propStructure="getPropStructure"
      @reloadCT="reloadCT"
      :propNP="propNP"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import StructureStore from "@/store/hoc/lesson/StructureStore";
import { getModule } from "vuex-module-decorators";
import Example from "@/components/hoc/part/ExampleComponent.vue";
import axios, { AxiosResponse } from "axios";
import ThemCt from "./ThemCTComponent.vue";
import SuaCt from "./SuaCTComponent.vue";
import QuanLyVd from "./quanLyVD/QuanLyVDComponent.vue";

const structureStore = getModule(StructureStore);

@Component({
  components: {
    Example,
    ThemCt,
    SuaCt,
    QuanLyVd,
  },
})
export default class QuanLyCT extends Vue {
  @Prop()
  propNP!: any;

  @Prop()
  propID!: any;

  private structure = [];
  private propStructure = "";

  get getPropStructure() {
    return this.propStructure;
  }
  setPropStructure(structure: any) {
    this.propStructure = structure;
  }

  created() {
    this.getStructureAPI();
  }

  async getStructureAPI() {
    await axios
      .get("http://localhost:3000/structure", {
        params: {
          manp: this.propNP,
        },
      })
      .then((res) => {
        this.structure = res.data;
      });
  }

  removeCT(mact: any) {
    let retVal = confirm(`Bạn thật sự muốn xóa cấu trúc này`);
    if (retVal == true) {
      axios
        .get("http://localhost:3000/structure/remove", {
          params: {
            mact: mact,
          },
        })
        .then((res) => {
          this.reloadCT();
        });
    }
  }

  async reloadCT() {
    this.getStructureAPI();
  }

  get getStructure() {
    return this.structure;
  }
}
</script>

<style></style>
