<template>
  <div class="form-login mt-5">
    <div id="header_bang_tin" class="mt-4 mb-5">
      <h4><b id="titleLoginAdmin">Đăng nhập để vào trang quản trị</b></h4>
    </div>
    <div class="d-flex justify-content-center">
      <form>
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
        <div class="input-group mb-2">
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
        <div class="d-flex justify-content-center mt-3 login_container">
          <button class="btn login_btn" @click="dangnhap">Đăng nhập</button>
        </div>
      </form>
    </div>
    <div class="mt-4 mb-5">
      <div class="d-flex justify-content-center links">
        <a href="#">Quên mật khẩu?</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginAdminStore from "../../store/LoginAdminStore";
import { getModule } from "vuex-module-decorators";

const loginAdminStore = getModule(LoginAdminStore);

@Component
export default class LoginAdmin extends Vue {
  private username = "";
  private password = "";

  get getUsername() {
    return this.username;
  }
  get getPassword() {
    return this.password;
  }
  get getAccount() {
    return loginAdminStore.getStateAccAdmin;
  }

  async dangnhap() {
    await loginAdminStore.getAccAdminApi({
      user: this.getUsername,
      pass: this.getPassword,
    });
    if (this.getAccount != undefined && this.getAccount != "") {
      alert(
        "Tài khoản: " + this.getAccount.username + " đăng nhập thành công !!!"
      );
    } else alert("Đăng nhập thất bại, có thể tài khoản bạn không đủ quyền truy cập.");
  }
}
</script>

<style>
.form-login {
  border: 3px solid #aa2828;
  border-radius: 40px;
  box-shadow: 1px 2px 2px #50464b;
  background-color: rgba(253, 159, 198, 0.123);
  margin: 0 34%;
}
#titleLoginAdmin {
  text-shadow: 1px 1px 1px black;
}
</style>
