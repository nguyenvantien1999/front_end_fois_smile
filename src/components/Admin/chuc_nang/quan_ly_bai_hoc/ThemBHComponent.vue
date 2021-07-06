<template>
  <b-modal id="addBaiHoc" hide-footer :title-html="title">
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
        v-model="tenBH"
      />
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Thêm bài học"
        @click="addBH"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ThemBH extends Vue {
  @Prop()
  private propLessonLength: any;

  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Thêm bài học</b>";
  private tenBH = "";

  get getTenBH() {
    return this.tenBH;
  }

  get getMaBH() {
    return parseInt(this.propLessonLength) + 1 > 10
      ? "BH0" + (parseInt(this.propLessonLength) + 1)
      : "BH00" + (parseInt(this.propLessonLength) + 1);
  }
  get getMaNghe() {
    return parseInt(this.propLessonLength) + 1 > 10
      ? "N00" + (parseInt(this.propLessonLength) + 1)
      : "N000" + (parseInt(this.propLessonLength) + 1);
  }
  addBH() {
    if (this.getTenBH != "") {
      axios
        .get("https://backend-fois-smile.herokuapp.comlesson/add", {
          params: {
            mabh: this.getMaBH,
            tenbh: this.getTenBH,
          },
        })
        .then((res) => {
          this.addListen();
          if (res.data == true) {
            alert("Đã thêm bài học thành công!!!");
            this.$emit("reloadBH");
            this.$bvModal.hide("addBaiHoc");
          }
        });
    } else {
      alert("Chưa nhập tên bài học!!!");
    }
  }

  addListen() {
    axios.get("https://backend-fois-smile.herokuapp.comlistening/add", {
      params: {
        mabainghe: this.getMaNghe,
        tenbainghe: "Bài nghe " + (parseInt(this.propLessonLength) + 1),
        mabh: this.getMaBH
      },
    });
  }
}
</script>

<style></style>
