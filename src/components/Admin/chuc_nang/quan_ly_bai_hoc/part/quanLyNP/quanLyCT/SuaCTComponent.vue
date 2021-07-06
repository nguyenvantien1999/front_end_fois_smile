<template>
  <b-modal :id="'editCT' + propNP" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-book" aria-hidden="true"></i
        ></span>
      </div>
      <input
        type="text"
        class="form-control input_user"
        placeholder="Tên cấu trúc"
        v-model="propStructure.tenct"
      />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-book" aria-hidden="true"></i
        ></span>
      </div>
      <textarea
        class="form-control input_user"
        cols="30"
        rows="5"
        placeholder="Nghĩa cấu trúc"
        v-model="propStructure.nghia"
      ></textarea>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-book" aria-hidden="true"></i
        ></span>
      </div>
      <input
        type="text"
        class="form-control input_user"
        placeholder="Chú ý"
        v-model="propStructure.chuy"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Sửa cấu trúc"
        @click="editCT()"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
@Component
export default class SuaCT extends Vue {
  @Prop()
  private propNP: any;
  @Prop()
  private propStructure: any;

  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Sửa ngữ pháp</b>";
  private tenNP = "";

  editCT() {
    if ((this.propStructure.tenct != "", this.propStructure.nghia != "")) {
      axios
        .get("https://backend-fois-smile.herokuapp.comstructure/edit", {
          params: {
            mact: this.propStructure.mact,
            tenct: this.propStructure.tenct,
            nghia: this.propStructure.nghia,
            chuy: this.propStructure.chuy,
            manp: this.propStructure.manp,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã sửa cấu trúc thành công!!!");
            this.$emit("reloadCT");
            this.$bvModal.hide('editCT' + this.propNP);
          }
        });
    } else {
      alert("Chưa nhập tên ngữ pháp!!!");
    }
  }
}
</script>

<style></style>
