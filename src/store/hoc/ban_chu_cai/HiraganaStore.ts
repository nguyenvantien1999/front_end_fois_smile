import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import axios, { AxiosResponse } from "axios";

@Module({ dynamic: true, store: store, name: "hiraganaStore" })
export default class HigaranaStore extends VuexModule {
  stateBangChuDon = [];
  stateBangChuKep = [];

  get getStateBangChuDon() {
    return this.stateBangChuDon;
  }

  get getStateBangChuKep() {
    return this.stateBangChuKep;
  }

  @Action
  async getBDHiraApi() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/word/hiragana/chudon")
      .then((res) => {
        this.context.commit("setBangHiraganaDon", res.data);
      });
  }

  @Action
  async getBKHiraApi() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/word/hiragana/chukep")
      .then((res) => {
        this.context.commit("setBangHiraganakep", res.data);
      });
  }

  @Mutation
  private setBangHiraganaDon(payload: any) {
    this.stateBangChuDon = payload;
  }

  @Mutation
  private setBangHiraganakep(payload: any) {
    this.stateBangChuKep = payload;
  }
}
