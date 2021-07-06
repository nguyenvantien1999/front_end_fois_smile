<template>
  <b-modal :id="'addCTL' + propMaCHC" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-text-width" aria-hidden="true"></i
        ></span>
      </div>
      <textarea
        class="form-control input_user"
        placeholder="Tên đáp án"
        cols="30"
        rows="1"
        v-model="tenda"
      ></textarea>
    </div>
    <div>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text">Hình ảnh</span>
        </div>
        <input
          class="form-control"
          type="file"
          @change="previewImage"
          accept="image/*"
        />
        <button class="btn btn-info" @click="onUploadImg">Tải lên</button>
      </div>
      <div class="text-center">
        <progress :value="uploadImg" v-if="imageData != ''"></progress>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Thêm câu trả lời"
        @click="addAnswerApi()"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import firebase from "firebase";
import axios from "axios";

@Component
export default class ThemCTL extends Vue {
  @Prop()
  private propMaCHC: any;
  @Prop()
  private propAnswerLength: any;
  private tenda = "";
  private hinhanh = "";
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Thêm câu trả lời</b>";
  private imageData: any = "";
  private uploadImg = 100;

  get getTenDA() {
    return this.tenda;
  }
  get getHinhAnh() {
    return this.hinhanh;
  }
  get getMaDA() {
    return (
      this.propMaCHC +
      (this.propAnswerLength + 1 < 10
        ? "0" + (this.propAnswerLength + 1)
        : this.propAnswerLength + 1)
    );
  }

  previewImage(e: any) {
    this.uploadImg = 0;
    this.imageData = e.target.files[0];
  }

  onUploadImg() {
    if (this.imageData != "") {
      let storageRef = firebase
        .storage()
        .ref(`images/questions/${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(`state_changed`, () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.hinhanh = url;
          this.uploadImg = 100;
        });
      });
    }
    return 0;
  }

  addAnswerApi() {
    if (this.getTenDA != "") {
      if (this.uploadImg == 100) {
        axios
          .get("http://localhost:3000/answer/add", {
            params: {
              mada: this.getMaDA,
              tenda: this.getTenDA,
              machc: this.propMaCHC,
              hinhanh: this.getHinhAnh,
            },
          })
          .then((res) => {
            if (res.data == true) {
              alert("Đã thêm câu trả lời thành công!!!");
              this.$emit("reloadCHC");
              this.$bvModal.hide("addCTL" + this.propMaCHC);
              this.imageData = "";
              this.tenda = "";
              this.hinhanh = "";
            }
          });
      } else {
        alert("Tải ảnh chưa hoàn thiện");
      }
    } else {
      alert("Chưa nhập tên câu trả lời!!!");
    }
    return 0;
  }
}
</script>

<style></style>
