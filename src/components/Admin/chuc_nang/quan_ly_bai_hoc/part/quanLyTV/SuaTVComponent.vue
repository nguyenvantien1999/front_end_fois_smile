<template>
  <b-modal id="editTV" hide-footer :title-html="title">
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
        v-model="propVob.tentv"
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
        v-model="propVob.tenkanji"
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
        v-model="propVob.nghia"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Sửa từ vựng"
        @click="editTuVung"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class SuaTV extends Vue {
  @Prop()
  private propVob: any;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Sửa từ vựng</b>";

  async editTuVung() {
    if (this.propVob.tentv != "" && this.propVob.nghia != "") {
      axios
        .get("http://localhost:3000/vocabulary/edit", {
          params: {
            matv: this.propVob.matv,
            tentv: this.propVob.tentv,
            nghia: this.propVob.nghia,
            mabh: this.propVob.mabh,
            tenkanji: this.propVob.tenkanji,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã sửa bài học thành công!!!");
            this.$emit("reloadtv");
            this.$bvModal.hide("editTV");
          }
        });
    } else {
      alert("Cần nhập tên từ vựng và nghĩa!!!");
    }
  }
}
</script>

<style></style>
