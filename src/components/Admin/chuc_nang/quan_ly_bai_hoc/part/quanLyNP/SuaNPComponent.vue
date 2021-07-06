<template>
  <b-modal id="editNP" hide-footer :title-html="title">
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
        v-model="propGrammar.tennp"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Sửa ngữ pháp"
        @click="editNP"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
@Component
export default class SuaNP extends Vue {
  @Prop()
  private propGrammar: any;

  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Sửa ngữ pháp</b>";
  private tenNP = "";

  editNP() {
    if (this.propGrammar.tennp != "") {
      axios
        .get("http://localhost:3000/grammar/edit", {
          params: {
            manp: this.propGrammar.manp,
            tennp: this.propGrammar.tennp,
            mabh: this.propGrammar.mabh,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã sửa ngữ pháp thành công!!!");
            this.$emit("reloadNP");
            this.$bvModal.hide("editNP");
          }
        });
    } else {
      alert("Chưa nhập tên ngữ pháp!!!");
    }
  }
}
</script>

<style></style>
