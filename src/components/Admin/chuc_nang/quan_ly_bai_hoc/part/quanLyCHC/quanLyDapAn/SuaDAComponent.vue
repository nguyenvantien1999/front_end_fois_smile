<template>
  <b-modal :id="'editDA' + propDaDung.madadung" hide-footer :title-html="title">
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
        v-model="propDaDung.tendadung"
      ></textarea>
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Thêm câu trả lời"
        @click="editCorrectAnswerApi()"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import firebase from "firebase";
import axios from "axios";

@Component
export default class SuaDA extends Vue {
  @Prop()
  private propDaDung: any;
  
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Sửa đáp án đúng</b>";

  editCorrectAnswerApi() {
    if (this.propDaDung.tendadung != "") {
        axios
          .get("https://backend-fois-smile.herokuapp.comcorrectanswer/edit", {
            params: {
              madadung: this.propDaDung.madadung,
              tendadung: this.propDaDung.tendadung,
              machc: this.propDaDung.machc,
            },
          })
          .then((res) => {
            if (res.data == true) {
              alert("Đã sửa đáp án thành công!!!");
              this.$emit("reloadCHC");
              this.$bvModal.hide("editDA" + this.propDaDung.madadung);
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
