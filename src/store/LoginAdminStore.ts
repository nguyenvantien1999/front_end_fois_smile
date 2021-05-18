import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ dynamic: true, store: store, name: "loginAdminStore" })
export default class LoginAdminStore extends VuexModule {
  private stateAccAdmin: any = "";
  private stateAccAdmintInfor: any = "";
  private stateAccHVtInfor: any = "";

  get getStateAccHVtInfor(){
    return this.stateAccHVtInfor;
  }
  get getAccAdminInfor() {
    return this.stateAccAdmintInfor;
  }
  get getStateAccAdmin(): any {
    return this.stateAccAdmin;
  }
  get getSessionMaTkAdmin() {
    return sessionStorage.getItem("matkadmin");
  }

  @Action
  async getAccAdminApi(acc: any) {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/account/admin", {
        params: {
          username: acc.user,
          password: acc.pass,
        },
      })
      .then((res) => {
        this.context.commit("setAccAdmin", res.data);
      });
  }
  @Action
  async getAccAdminInforApi() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/account/infor", {
        params: {
          matk: this.getSessionMaTkAdmin,
        },
      })
      .then((res) => {
        this.context.commit("setAccAdminInfor", res.data);
      });
  }
  @Action
  async getAccHVInforApi(matk: any) {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/account/infor", {
        params: {
          matk: matk,
        },
      })
      .then((res) => {
        this.context.commit("setAccHVInfor", res.data);
      });
  }

  @Mutation
  private setAccAdmin(payload: any) {
    this.stateAccAdmin = payload;
    if (payload != "") {
      sessionStorage.setItem("matkadmin", payload.matk);
      localStorage.setItem("userAdmin", payload.username);
      localStorage.setItem("passAdmin", payload.password);
    }
  }
  @Mutation
  private setAccAdminInfor(payload: any) {
    this.stateAccAdmintInfor = payload;
  }
  @Mutation
  private setAccHVInfor(payload: any) {
    this.stateAccHVtInfor = payload;
  }
}
