<template>
  <b-modal id="addTaiKhoan" hide-footer :title-html="title">
    <form class="ml-3 mr-3">
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text"
            ><i class="fa fa-user-circle-o" aria-hidden="true"></i
          ></span>
        </div>
        <input
          type="email"
          class="form-control input_user"
          placeholder="Email"
          v-model="username"
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text"
            ><i class="fa fa-id-card" aria-hidden="true"></i
          ></span>
        </div>
        <input
          type="text"
          class="form-control input_user"
          placeholder="Họ tên"
          v-model="hoten"
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text"
            ><i class="fa fa-key" aria-hidden="true"></i
          ></span>
        </div>
        <input
          type="password"
          class="form-control input_pass"
          placeholder="Mật khẩu"
          v-model="password"
        />
      </div>
      <div class="input-group mb-2">
        <div class="input-group-append">
          <span class="input-group-text"
            ><i class="fa fa-check" aria-hidden="true"></i>
          </span>
        </div>
        <input
          type="password"
          class="form-control input_pass"
          placeholder="Nhập lại mật khẩu"
          v-model="passAgain"
        />
      </div>
      <div class="input-group mb-2">
        <div class="input-group-append">
          <span class="input-group-text"
            >Loại tài khoản
          </span>
        </div>
        <select id="loaitk" class="form-control" v-model="loaitk">
          <option value="3">Học viên</option>
          <option v-if="getLoaiTKAccount == 1" value="2">Nhân viên</option>
          <option v-if="getLoaiTKAccount == 1" value="1">Quản trị</option>
        </select>
      </div>
      <div class="d-flex justify-content-center mt-3 login_container">
        <input
          type="button"
          class="btn login_btn"
          value="Đăng ký"
          @click="registration"
        />
      </div>
    </form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import LoginAdminStore from '@/store/LoginAdminStore';
import { getModule } from 'vuex-module-decorators';

const loginAdminStore = getModule(LoginAdminStore);
@Component
export default class ThemTK extends Vue {
  private username = "";
  private hoten = "";
  private password = "";
  private passAgain = "";
  private loaitk = 3;
  private title = "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Thêm tài khoản</b>";

  get getLoaiTKAccount() {
    return loginAdminStore.getSessionLoaiTkAdmin;
  }

  get getLoaiTk() {
    return this.loaitk;
  }

  get getUsername() {
    return this.username;
  }
  get getHoTen() {
    return this.hoten;
  }
  get getPassword() {
    return this.password;
  }
  get getPassAgain() {
    return this.passAgain;
  }

  async registration() {
    if (
      this.getUsername != "" &&
      this.getHoTen != "" &&
      this.getPassword != "" &&
      this.getPassAgain != ""
    ) {
      if (this.validatEemail(this.getUsername) == false) {
        alert("Vui lòng nhập đúng địa chỉ email");
      } else if (this.getPassword != this.getPassAgain) {
        alert("Mật khẩu không đồng nhất");
      } else {
        await axios
          .get("https://backend-fois-smile.herokuapp.com/account/regis", {
            params: {
              record: {
                username: this.getUsername,
                pass: this.getPassword,
                hoten: this.getHoTen,
                loaitk: this.getLoaiTk,
              },
            },
          })
          .then((res) => {
            if (res.data == true) {
              alert("Thêm thành công");
              this.password = "";
            } else {
              alert("Thêm thất bại, tài khoản đã tồn tại");
            }
          });
      }
    } else {
      alert("Không được để trống các trường!!!");
    }
  }
  validatEemail(email: string) {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      return false;
    } else return true;
  }
}
</script>

<style></style>
