import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import axios, { AxiosResponse } from "axios";

@Module({ dynamic: true, store: store, name: "katakananaStore" })
export default class KatakanaStore extends VuexModule {
  stateBangChuDon = [];
  stateBangChuKep = [];

  get getStateKataChuDon() {
    return this.stateBangChuDon;
  }

  get getStateKataChuKep() {
    return this.stateBangChuKep;
  }

  @Action
  async getBDKaTaApi() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/word/katakana/chudon")
      .then((res) => {
        this.context.commit("setBangKatakanaDon", res.data);
      });
  }

  @Action
  async getBKKataApi() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/word/katakana/chukep")
      .then((res) => {
        this.context.commit("setBangKatakanakep", res.data);
      });
  }

  @Mutation
  private setBangKatakanaDon(payload: any) {
    this.stateBangChuDon = payload;
  }

  @Mutation
  private setBangKatakanakep(payload: any) {
    this.stateBangChuKep = payload;
  }
}
