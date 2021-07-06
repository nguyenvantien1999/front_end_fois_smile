<template>
  <b-modal :id="'editCH' + propCH.mach" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-text-width" aria-hidden="true"></i
        ></span>
      </div>
      <textarea
        class="form-control input_user"
        placeholder="Câu hỏi"
        v-model="propCH.tench"
        cols="30"
        rows="1"
      ></textarea>
    </div>
    <div class="input-group mb-2">
      <div class="input-group-append">
        <span class="input-group-text">Phần câu hỏi</span>
      </div>
      <select class="form-control" v-model="propCH.maphanch">
        <option value="DOC">Đọc</option>
        <option value="NGHE">Nghe</option>
        <option value="NP">Ngữ pháp</option>
      </select>
    </div>
    <div>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text">Hình ảnh câu hỏi</span>
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
    <div>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text">Audio câu hỏi</span>
        </div>
        <input
          class="form-control"
          type="file"
          @change="previewAudio"
          accept="audio/*"
        />
        <button class="btn btn-info" @click="onUploadAudio">Tải lên</button>
      </div>
      <div class="text-center">
        <progress :value="uploadAudio" v-if="audioData != ''"></progress>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3 login_container">
      <input
        type="button"
        class="btn login_btn ml-5 mr-5"
        value="Sửa câu hỏi"
        @click="editChApi()"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import firebase from "firebase";

@Component
export default class SuaCH extends Vue {
  @Prop()
  private propCH: any;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Sửa câu hỏi</b>";
  private imageData: any = "";
  private uploadImg = 100;
  private audioData: any = "";
  private uploadAudio = 100;

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
          this.propCH.hinhanh = url;
          this.uploadImg = 100;
        });
      });
    }
    return 0;
  }

  previewAudio(e: any) {
    this.uploadAudio = 0;
    this.audioData = e.target.files[0];
  }

  onUploadAudio() {
    let storageRef = firebase
      .storage()
      .ref(`audio/${this.audioData.name}`)
      .put(this.audioData);
    storageRef.on(`state_changed`, () => {
      storageRef.snapshot.ref.getDownloadURL().then((url) => {
        this.propCH.linkaudio = url;
        this.uploadAudio = 100;
      });
    });
    return 0;
  }

  editChApi() {
    if (this.propCH.tench != "" && this.propCH.maphanch != "") {
      if (this.uploadImg == 100 && this.uploadAudio == 100) {
        axios
          .get("http://localhost:3000/question/edit", {
            params: {
              mach: this.propCH.mach,
              tench: this.propCH.tench,
              mabai: this.propCH.mabai,
              maphanch: this.propCH.maphanch,
              hinhanh: this.propCH.hinhanh,
              linkaudio: this.propCH.linkaudio,
            },
          })
          .then((res) => {
            if (res.data == true) {
              alert("Đã sửa câu hỏi thành công!!!");
              this.$emit("reloadCH");
              this.$bvModal.hide("addCH");
            }
          });
      } else {
        alert("Tải ảnh hoặc audio chưa hoàn thiện");
      }
    } else {
      alert("Chưa nhập tên câu hỏi hoặc phần câu hỏi!!!");
    }
    return 0;
  }
}
</script>

<style></style>
