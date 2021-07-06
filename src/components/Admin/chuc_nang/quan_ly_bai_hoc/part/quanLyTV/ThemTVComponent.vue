<template>
  <b-modal id="addTV" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-text-width" aria-hidden="true"></i
        ></span>
      </div>
      <input
        type="text"
        class="form-control input_user"
        placeholder="Từ vựng"
        v-model="tentv"
      />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-paint-brush" aria-hidden="true"></i
        ></span>
      </div>
      <input
        type="text"
        class="form-control input_user"
        placeholder="Chữ Kanji"
        v-model="kanji"
      />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-align-left" aria-hidden="true"></i
        ></span>
      </div>
      <input
        type="text"
        class="form-control input_user"
        placeholder="Nghĩa"
        v-model="nghia"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Thêm từ vựng"
        @click="addTuVung"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ThemTV extends Vue {
  @Prop()
  private propBH: any;
  @Prop()
  private propVob: any;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Thêm từ vựng</b>";
  private tentv = "";
  private kanji = "";
  private nghia = "";

  get getTenTV() {
    return this.tentv;
  }
  get getKanji() {
    return this.kanji;
  }
  get getNghia() {
    return this.nghia;
  }
  get getMaTV() {
    return (
      this.propBH.slice(-2) +
      ((this.propVob.length + 1) >= 10 ? "0" + (this.propVob.length + 1) : "00" + (this.propVob.length + 1))
    );
  }
  async addTuVung() {
    if (this.getTenTV != "" && this.getNghia != "") {
      axios
        .get("https://backend-fois-smile.herokuapp.com/vocabulary/add", {
          params: {
            matv: this.getMaTV,
            tentv: this.getTenTV,
            nghia: this.getNghia,
            mabh: this.propBH,
            tenkanji: this.getKanji,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã thêm bài học thành công!!!");
            this.$emit("reloadtv");
            this.$bvModal.hide("addTV");
          }
        });
    } else {
      alert("Cần nhập tên từ vựng và nghĩa!!!");
    }
  }
}
</script>

<style></style>
