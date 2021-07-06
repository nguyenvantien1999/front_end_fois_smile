<template>
  <b-modal :id="'addVD'" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-book" aria-hidden="true"></i
        ></span>
      </div>
      <input
        type="text"
        class="form-control input_user"
        placeholder="Ví dụ"
        v-model="tenvd"
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
        placeholder="Nghĩa ví dụ"
        v-model="nghia"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Thêm ví dụ"
        @click="addVD()"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ThemVD extends Vue {
  @Prop()
  private propCT: any;
  @Prop()
  private propGetVDLength: any;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Thêm ví dụ</b>";
  private tenvd = "";
  private nghia = "";

  get getTenVD() {
    return this.tenvd;
  }
  get getNghia() {
    return this.nghia;
  }
  get getMaCT() {
    return (
      this.propCT.slice(-2) +
      (this.propGetVDLength + 1 >= 10
        ? "0" + (this.propGetVDLength + 1)
        : "00" + (this.propGetVDLength + 1))
    );
  }
  addVD() {
    if (this.getTenVD != "" && this.getNghia != "") {
      axios
        .get("https://backend-fois-smile.herokuapp.com/example/add", {
          params: {
            mavd: this.getMaCT,
            tenvd: this.getTenVD,
            nghia: this.getNghia,
            matv: this.propCT,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã thêm ví dụ thành công!!!");
            this.$emit("reloadVD");
            this.$bvModal.hide("addVD");
          }
        });
    } else {
      alert("Chưa nhập tên cấu trúc!!!");
    }
  }
}
</script>

<style></style>
