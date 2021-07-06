import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ dynamic: true, store: store, name: "loginStore" })
export default class LoginStore extends VuexModule {
  private stateAccount: any = "";
  private stateAccountInfor: any = "";

  get getAccountInfor() {
    return this.stateAccountInfor;
  }

  get getStateAccount(): any {
    return this.stateAccount;
  }

  get getSessionMaTk() {
    if (localStorage.getItem("matk") != undefined) {
      return localStorage.getItem("matk");
    } else {
      return sessionStorage.getItem("matk");
    }
  }

  get getSessionPassword() {
    if (localStorage.getItem("password") != undefined) {
      return localStorage.getItem("password");
    } else {
      return sessionStorage.getItem("password");
    }
  }

  get getSessionUsername() {
    if (localStorage.getItem("username") != undefined) {
      return localStorage.getItem("username");
    } else {
      return sessionStorage.getItem("username");
    }
  }

  get getSessionLoaiTK() {
    if (localStorage.getItem("loaitk") != undefined) {
      return localStorage.getItem("loaitk");
    } else {
      return sessionStorage.getItem("loaitk");
    }
  }

  @Action
  async updateAccountApi() {
    if (this.getStateAccount != "") {
      const acc: any = this.getStateAccount;
      await axios
        .get("https://backend-fois-smile.herokuapp.com/account/update", {
          params: {
            matk: acc.matk,
            username: acc.username,
            password: acc.password,
            loaitk: acc.loaitk,
            thoigiandn: acc.thoigiandn,
            remove: acc.remove,
          },
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  @Action
  async updateAccountInforApi() {
    const acc: any = this.getAccountInfor;
    await axios
      .get("https://backend-fois-smile.herokuapp.com/account/info/update", {
        params: {
          matt: acc.matt,
          hoten: acc.hoten,
          ngaysinh: acc.ngaysinh != null ? Date.parse(acc.ngaysinh): 0,
          gioitinh: acc.gioitinh,
          diachi: acc.diachi,
          matk: acc.matk,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @Action
  async getAccountApi(acc: any) {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/account", {
        params: {
          username: acc.user,
          password: acc.pass,
        },
      })
      .then((res) => {
        this.context.commit("setAccount", res.data);
      });
  }

  @Action
  async getAccountInforApi() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/account/infor", {
        params: {
          matk: this.getSessionMaTk,
        },
      })
      .then((res) => {
        this.context.commit("setAccountInfor", res.data);
      });
  }

  @Mutation
  private setAccount(payload: any) {
    this.stateAccount = payload;
    if (payload != "") {
      this.stateAccount.thoigiandn = Date.now();
      sessionStorage.setItem("matk", payload.matk);
      sessionStorage.setItem("username", payload.username);
      sessionStorage.setItem("password", payload.password);
      sessionStorage.setItem("loaitk", payload.loaitk)
    }
  }

  @Mutation
  private setAccountInfor(payload: any) {
    this.stateAccountInfor = payload;
  }
}
