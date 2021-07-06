<template>
  <b-modal :id="'addCT' + propNP" hide-footer :title-html="title">
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
        v-model="tenct"
      />
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
        placeholder="Nghĩa cấu trúc"
        v-model="nghia"
      />
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
        v-model="chuy"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Thêm cấu trúc"
        @click="addCT()"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ThemCT extends Vue {
  @Prop()
  private propNP: any;
  @Prop()
  private propgetStrucLength: any;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Thêm cấu trúc ngữ pháp</b>";
  private tenct = "";
  private nghia = "";
  private chuy = "";

  get getTenCT() {
    return this.tenct;
  }
  get getNghia() {
    return this.nghia;
  }
  get getChuY() {
    return this.chuy;
  }
  get getMaCT() {
    return (
      this.propNP.slice(-2) +
      (this.propgetStrucLength + 1 >= 10
        ? "0" + (this.propgetStrucLength + 1)
        : "00" + (this.propgetStrucLength + 1))
    );
  }

  addCT() {
    if (this.getTenCT != "" && this.getNghia != "" ) {
      axios
        .get("https://backend-fois-smile.herokuapp.com/structure/add", {
          params: {
            mact: this.getMaCT,
            tenct: this.getTenCT,
            nghia: this.getNghia,
            chuy: this.getChuY,
            manp: this.propNP,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã thêm cấu trúc thành công!!!");
            this.$emit("reloadCT");
            this.$bvModal.hide("addCT" + this.propNP);
          }
        });
    } else {
      alert("Chưa nhập tên cấu trúc!!!");
    }
  }
}
</script>

<style></style>
