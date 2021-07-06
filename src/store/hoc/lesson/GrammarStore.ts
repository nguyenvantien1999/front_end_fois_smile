import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ dynamic: true, store: store, name: "grammarStore" })
export default class GrammarStore extends VuexModule {
  stateGrammar = [];

  get getStateGrammar() {
    return this.stateGrammar;
  }

  @Action
  async getGrammarApi(mabh: string) {
    await axios
      .get("https://backend-fois-smile.herokuapp.comgrammar", {
        params: {
          mabh: mabh,
        },
      })
      .then((res) => {
        this.context.commit("setGrammar", res.data);
      });
  }

  @Mutation
  private setGrammar(payload: any) {
    this.stateGrammar = payload;
  }
}
