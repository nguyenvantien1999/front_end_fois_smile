<template>
  <b-modal
    id="login"
    class="container h-100"
    hide-footer
    hide-header
    v-if="!getLogged"
  >
    <div class="d-flex justify-content-center mt-5">
      <div class="user_card">
        <i
          id="hideLogin"
          class="fa fa-times"
          aria-hidden="true"
          @click="$bvModal.hide('login')"
        ></i>
        <div class="d-flex justify-content-center">
          <div class="brand_logo_container">
            <img
              src="../../assets/images/logoJapanlogin.jpg"
              class="brand_logo"
              alt="Logo"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center form_container">
          <form v-if="!getLogin">
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
            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customControlInline"
                  v-model="rememberMe"
                />
                <label class="custom-control-label" for="customControlInline"
                  >Ghi nhớ đăng nhập</label
                >
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3 login_container">
              <button
                type="button"
                class="btn login_btn"
                @click="getAccountApi"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <!-- Dang ky -->
          <form v-else>
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
            <div class="d-flex justify-content-center mt-3 login_container">
              <input
                type="button"
                class="btn login_btn"
                value="Đăng ký"
                @click="registration"
              />
            </div>
          </form>
        </div>
        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            {{ getTextlogin }}
            <a href="#" class="ml-2" @click="dangKy_dangNhap">{{
              getLinkLogin
            }}</a>
          </div>
          <div class="d-flex justify-content-center links">
            <a href="#" @click="$bvModal.show('quenMK')">Quên mật khẩu?</a>
          </div>
        </div>
      </div>
    </div>
    <quen-mk />
    <load v-if="getLoading" />
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import LoginStore from "../../store/LoginStore";
import { getModule } from "vuex-module-decorators";
import QuenMk from "./QuenMKComponent.vue";
import Load from "../LoadComponent.vue";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    QuenMk,
    Load,
  },
})
export default class Login extends Vue {
  private username = "";
  private password = "";
  private hoten = "";
  private passAgain = "";
  private logged = false;
  private loggin = false;
  private rememberMe = false;
  private textlogin = "Chưa có tài khoản?";
  private linklogin = "Đăng ký";
  private loading = false;

  get getLoading() {
    return this.loading;
  }
  get getPassAgain() {
    return this.passAgain;
  }
  get getRememberMe() {
    return this.rememberMe;
  }
  get getTextlogin() {
    return this.textlogin;
  }
  get getLinkLogin() {
    return this.linklogin;
  }
  get getHoTen() {
    return this.hoten;
  }
  get getLogin() {
    return this.loggin;
  }
  get getLogged() {
    return this.logged;
  }
  get getUsername() {
    return this.username;
  }
  get getPassword() {
    return this.password;
  }
  get getAccount() {
    return loginStore.getStateAccount;
  }

  async getAccountApi() {
    if (this.getUsername != "" && this.getPassword != "") {
      this.loading = true;
      await loginStore.getAccountApi({
        user: this.getUsername,
        pass: this.getPassword,
      });
      if (this.getAccount != undefined && this.getAccount != "") {
        this.loggin = false;
        alert(
          "Tài khoản: " + this.getAccount.username + " đăng nhập thành công !!!"
        );
        this.logged = true;
        loginStore.updateAccountApi();
        if (this.getRememberMe) {
          localStorage.setItem("matk", this.getAccount.matk);
          localStorage.setItem("username", this.getAccount.username);
          localStorage.setItem("password", this.getAccount.password);
          localStorage.setItem("loaitk", this.getAccount.loaitk);
        }
        window.location.reload();
      } else {
        this.loading = false;
        alert("Đăng nhập thất bại");
      }
    } else {
      this.loggin = false;
      alert("không được để trống các trường!!!");
    }
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
        this.loading = true;
        await axios
          .get("http://localhost:3000/account/regis", {
            params: {
              record: {
                username: this.getUsername,
                pass: this.getPassword,
                hoten: this.getHoTen,
                loaitk: 3,
              },
            },
          })
          .then((res) => {
            if (res.data == true) {
              this.loading = false;
              alert("Đăng ký thành công");
              this.loggin = !this.loggin;
              this.linklogin = "Đăng ký";
              this.password = "";
            } else {
              this.loading = false;
              alert("Đăng ký thất bại, tài khoản đã tồn tại");
            }
          });
      }
    } else {
      this.loading = false;
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

  dangKy_dangNhap() {
    this.loggin = !this.loggin;
    if (this.loggin != true) {
      this.textlogin = "Chưa có tài khoản?";
      this.linklogin = "Đăng ký";
    } else {
      this.textlogin = "Đã có tài khoản?";
      this.linklogin = "Đăng nhập";
    }
  }
}
</script>

<style>
#login___BV_modal_content_ {
  background: rgba(0, 0, 0, 0.01);
  border: none;
}
#hideLogin {
  margin-left: auto;
}
#hideLogin:hover {
  cursor: pointer;
  color: #ff0080;
}
.user_card {
  /* height: 500px; */
  width: 350px;
  margin-top: auto;
  margin-bottom: auto;
  background: #ffe4e1;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.user_card a {
  color: #ff0080;
  text-shadow: 1px 1px 1px thistle;
}
.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -75px;
  border-radius: 50%;
  background: #ff0080;
  padding: 10px;
  text-align: center;
}
.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid white;
}
.form_container {
  margin-top: 100px;
}
.login_btn {
  width: 100%;
  background: #ff0080 !important;
  color: white !important;
  box-shadow: 1px 1px 1px black;
}
.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.login_container {
  padding: 0 2rem;
}
.input-group-text {
  background: #ff0080 !important;
  color: white !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}
.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #c0392b !important;
}
</style>
