<template>
  <b-modal id="addNguPhap" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-book" aria-hidden="true"></i
        ></span>
      </div>
      <input
        type="text"
        class="form-control input_user"
        placeholder="Tên ngữ pháp"
        v-model="tenNP"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Thêm ngữ pháp"
        @click="addNP"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ThemNP extends Vue {
  @Prop()
  private propGrammarLength: any;
  @Prop()
  private propMaBH: any;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Thêm ngữ pháp</b>";
  private tenNP = "";

  get getTenNP() {
    return this.tenNP;
  }
  get getMaNP() {
    return (
      this.propMaBH.slice(-2) +
      (this.propGrammarLength.length + 1 >= 10
        ? "0" + (this.propGrammarLength + 1)
        : "00" + (this.propGrammarLength + 1))
    );
  }
  addNP() {
    if (this.getTenNP != "") {
      axios
        .get("http://localhost:3000/grammar/add", {
          params: {
            manp: this.getMaNP,
            tennp: this.getTenNP,
            mabh: this.propMaBH,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã thêm ngữ pháp thành công!!!");
            this.$emit("reloadNP");
            this.$bvModal.hide("addNguPhap");
          }
        });
    } else {
      alert("Chưa nhập tên ngữ pháp!!!");
    }
  }
}
</script>

<style></style>
