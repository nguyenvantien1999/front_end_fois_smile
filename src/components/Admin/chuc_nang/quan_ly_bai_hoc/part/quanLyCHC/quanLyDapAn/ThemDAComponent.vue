<template>
  <b-modal :id="'addDA' + propMaCHC" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-text-width" aria-hidden="true"></i
        ></span>
      </div>
      <textarea
        class="form-control input_user"
        placeholder="Tên đáp án đúng"
        cols="30"
        rows="1"
        v-model="tendadung"
      ></textarea>
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Thêm câu trả lời"
        @click="addCorrectAnswerApi()"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import firebase from "firebase";
import axios from "axios";

@Component
export default class ThemDA extends Vue {
  @Prop()
  private propMaCHC: any;
  @Prop()
  private propCorrectAnswerLength: any;
  private tendadung = "";
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Thêm đáp án đúng</b>";

  get getMaDA() {
    return (
      this.propMaCHC +
      (this.propCorrectAnswerLength + 1 < 10
        ? "0" + (this.propCorrectAnswerLength + 1)
        : this.propCorrectAnswerLength + 1)
    );
  }
  get getTenDADung(){
      return this.tendadung;
  }

  addCorrectAnswerApi() {
    if (this.getTenDADung != "") {
        axios
          .get("http://localhost:3000/correctanswer/add", {
            params: {
              madadung: this.getMaDA,
              tendadung: this.getTenDADung,
              machc: this.propMaCHC,
            },
          })
          .then((res) => {
            if (res.data == true) {
              alert("Đã thêm đáp án thành công!!!");
              this.$emit("reloadCHC");
              this.$bvModal.hide("addDA" + this.propMaCHC);
              this.tendadung = "";

            }
          });

    } else {
      alert("Chưa nhập tên đáp án!!!");
    }
    return 0;
  }
}
</script>

<style></style>
