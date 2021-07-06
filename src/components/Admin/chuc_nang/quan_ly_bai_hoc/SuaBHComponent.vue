<template>
  <b-modal :id="'editBaiHoc' + propMaBH" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-book" aria-hidden="true"></i
        ></span>
      </div>
      <input
        type="text"
        class="form-control input_user"
        placeholder="Tên bài học"
        v-model="propTenBH"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Sửa bài học"
        @click="editBH"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class SuaBH extends Vue {
  @Prop()
  private propMaBH: any;
  @Prop()
  private propTenBH: any;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Sửa bài học</b>";

  editBH() {
    if (this.propTenBH != "") {
      axios
        .get("https://backend-fois-smile.herokuapp.comlesson/edit", {
          params: {
            mabh: this.propMaBH,
            tenbh: this.propTenBH,
          },
        })
        .then((res) => {
          if (res.data == true) {
            alert("Đã sửa bài học thành công!!!");
            this.$emit("reloadBH");
            this.$bvModal.hide('editBaiHoc' + this.propMaBH);
          }
        });
    } else {
      alert("Chưa nhập tên bài học!!!");
    }
  }
}
</script>

<style></style>
