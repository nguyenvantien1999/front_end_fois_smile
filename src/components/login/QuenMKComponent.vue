<template>
  <b-modal
    id="quenMK"
    hide-footer
    title-html="<b>Đừng lo lắng khi quên mật khẩu</b>"
  >
    <div id="header_bang_tin">
      <h6>
        <b
          >Cung cấp tên đăng nhập <br />
          để nhận lại mật khẩu</b
        >
      </h6>
    </div>
    <div class="text-center">
      <input
        type="text"
        class="form-control"
        placeholder="Nhập tên tài khoản của bạn"
        v-model="username"
      />
      <input
        @click="sendPass(), getKetQua ? $bvModal.hide('quenMK') : null"
        type="button"
        class="btn btn-primary mt-3"
        value="Nhận mật khẩu"
      />
    </div>
    <load v-if="getLoading" />
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Load from "../LoadComponent.vue";

@Component({
  components: {
    Load,
  },
})
export default class QuenMK extends Vue {
  private username = "";
  private ketQua = false;
  private loading = false;

  get getLoading() {
    return this.loading;
  }
  get getKetQua() {
    return this.ketQua;
  }
  get getUserName() {
    return this.username;
  }

  sendPass() {
    if (this.getUserName != "") {
      this.loading = true;
      axios
        .get("https://backend-fois-smile.herokuapp.com/sendpasstomail", {
          params: {
            username: this.username,
          },
        })
        .then((res) => {
          this.loading = false;
          if (res.data == true) {
            alert("Mật khẩu đã được gửi đến email: " + this.getUserName);
            this.$bvModal.hide("quenMK");
          } else {
            alert("Tài khoản: " + this.getUserName + " không tồn tại");
          }
        });
    } else {
      this.loading = false;
      alert("Hãy nhập tên tài khoản của bạn!!!");
    }
  }
}
</script>

<style></style>
