import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ dynamic: true, store: store, name: "alphaberStore" })
export default class AlphabetStore extends VuexModule {
  stateBangChu = [];

  get geStateBang() {
    return this.stateBangChu;
  }

  @Action
  async getBCApi() {
    await axios.get("http://localhost:3000/alphabet").then((res) => {
      this.context.commit("setBang", res.data);
    });
  }

  @Mutation
  private setBang(payload: any) {
    this.stateBangChu = payload;
  }
}
