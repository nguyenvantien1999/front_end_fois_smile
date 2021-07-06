<template>
  <b-modal :id="'qlVD' + propCT" hide-footer :title-html="titleVD">
    <div class="ml-5 text-right">
      <button id="addPart" class="btn" @click="$bvModal.show('addVD')">
        <i class="fa fa-plus" aria-hidden="true"></i> <b>Ví dụ</b>
      </button>
    </div>
    <table id="tableTest" class="mb-2" v-if="getExample != ''">
      <tr class="text-center">
        <th><b>Tên Ví dụ</b></th>
        <th><b>Nghĩa</b></th>
        <th><b>Sửa</b></th>
        <th><b>Xóa</b></th>
      </tr>
      <tr v-for="(ex, i) in getExample" :key="ex.mavd">
        <td v-html="ex.tenvd" v-if="getEdit != i"></td>
        <td v-if="getEdit != i">{{ ex.nghia }}</td>
        <td style="width: 45%" v-if="getEdit == i">
          <textarea class="form-control" cols="50" rows="3" v-model="ex.tenvd"></textarea>
        </td>
        <td style="width: 45%" v-if="getEdit == i">
          <textarea class="form-control" cols="50" rows="3" v-model="ex.nghia"></textarea>
        </td>
        <td class="text-center">
          <i
            v-if="getEdit != i"
            class="fa fa-pencil text-warning icon"
            aria-hidden="true"
            @click="setEdit(i)"
          ></i>
          <span v-else>
            <i
              class="fa fa-cloud-upload text-primary icon"
              aria-hidden="true"
              @click="editVD(ex.mavd, ex.tenvd, ex.nghia)"
            ></i>
            &nbsp;&nbsp;
            <i
              class="fa fa-times-circle icon"
              aria-hidden="true"
              style="color: red"
              @click="setEdit(-1)"
            ></i>
          </span>
        </td>
        <td class="text-center">
          <i class="fa fa-trash text-danger icon" aria-hidden="true" @click="removeVD(ex.mavd, ex.tenvd)"></i>
        </td>
      </tr>
    </table>
    <them-vd
      :propCT="propCT"
      :propGetVDLength="getExample.length"
      @reloadVD="reloadVD"
    />
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import ThemVd from "./ThemVDComponent.vue";

@Component({
  components: {
    ThemVd,
  },
})
export default class QuanLyVD extends Vue {
  @Prop()
  propCT: any;
  private titleVD =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Quản lý ví dụ</b>";
  private example = [];
  private edit = -1;

  get getEdit() {
    return this.edit;
  }
  get getExample() {
    return this.example;
  }
  setEdit(i: number) {
    this.edit = i;
  }
  created() {
    this.getExampleAPI();
  }
  async getExampleAPI() {
    await axios
      .get("http://localhost:3000/example", {
        params: {
          machu: this.propCT,
        },
      })
      .then((res) => {
        this.example = res.data;
      });
  }
  editVD(mavd: any, tenvd: any, nghia: any){
    if ((tenvd != "" && nghia != "")) {
      axios
        .get("http://localhost:3000/example/edit", {
          params: {
            mavd: mavd,
            tenvd: tenvd,
            nghia: nghia,
            matv: this.propCT,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã sửa cấu thành công!!!");
            this.reloadVD();
            this.edit = -1;
          }
        });
    } else {
      alert("Chưa nhập tên ngữ pháp!!!");
    }
  }
  removeVD(mavd: any, tenvd: any) {
    let retVal = confirm(`Bạn thật sự muốn xóa ví dụ ${tenvd}`);
    if (retVal == true) {
      axios
        .get("http://localhost:3000/example/remove", {
          params: {
            mavd: mavd,
          },
        })
        .then((res) => {
          this.reloadVD();
        });
    }
  }

  reloadVD() {
    this.getExampleAPI();
  }
}
</script>

<style></style>
