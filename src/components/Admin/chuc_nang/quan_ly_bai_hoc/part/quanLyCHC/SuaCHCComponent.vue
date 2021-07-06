<template>
  <b-modal :id="'editCHC'+propCHC.machc" hide-footer :title-html="title">
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-text-width" aria-hidden="true"></i
        ></span>
      </div>
      <textarea
        class="form-control input_user"
        placeholder="Câu hỏi con"
        v-model="propCHC.tenchc"
        cols="30"
        rows="1"
      ></textarea>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text"
          ><i class="fa fa-text-width" aria-hidden="true"></i
        ></span>
      </div>
      <input
        class="form-control"
        placeholder="Điểm [null]"
        v-model="propCHC.diem"
        type="number"
      />
    </div>
    <div class="input-group mb-2">
      <div class="input-group-append">
        <span class="input-group-text">Loại câu hỏi</span>
      </div>
      <select class="form-control" v-model="propCHC.maloaich">
        <option value="TL">Tự luận</option>
        <option value="TN">Trắc nghiệm</option>
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
        value="Sửa câu hỏi con"
        @click="editChcApi"
      />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import firebase from "firebase";
import axios from "axios";

@Component
export default class SuaCHC extends Vue {
  @Prop()
  private propCHC: any;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Sửa câu hỏi con</b>";
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
      storageRef.on(
        `state_changed`,
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.propCHC.hinhanh = url;
            this.uploadImg = 100;
          });
        }
      );
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
    storageRef.on(
      `state_changed`,
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.propCHC.linkaudio = url;
          this.uploadAudio = 100;
        });
      }
    );
    return 0;
  }

  editChcApi() {
    if (this.propCHC.tenchc!= "" && this.propCHC.maloaich!= "") {
      if (this.uploadImg == 100 && this.uploadAudio == 100) {
        axios
          .get("https://backend-fois-smile.herokuapp.com/childquestion/edit", {
            params: {
              machc: this.propCHC.machc,
              tenchc: this.propCHC.tenchc,
              diem: this.propCHC.diem,
              mach: this.propCHC.mach,
              maloaich: this.propCHC.maloaich,
              hinhanh: this.propCHC.hinhanh,
              linkaudio: this.propCHC.linkaudio,
            },
          })
          .then((res) => {
            if (res.data == true) {
              alert("Đã sửa câu hỏi con thành công!!!");
              this.$emit("reloadCHC");
              this.$bvModal.hide('editCHC'+this.propCHC.machc);
            }
          });
      }
      else{
        alert("Tải ảnh hoặc audio chưa hoàn thiện");
      }
    } else {
      alert("Chưa nhập tên câu hỏi con hoặc loại câu hỏi!!!");
    }
  }
}
</script>

<style></style>
