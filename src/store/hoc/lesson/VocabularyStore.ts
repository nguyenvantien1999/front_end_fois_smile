import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ dynamic: true, store: store, name: "vocabularyStore" })
export default class VocabularyStore extends VuexModule {
  stateVocabulary = [];

  get getStateVocabulary() {
    return this.stateVocabulary;
  }

  @Action
  async getVocabularyApi(mabh: string) {
    await axios
      .get("http://localhost:3000/vocabulary", {
        params: {
          mabh: mabh,
        },
      })
      .then((res) => {
        this.context.commit("setVocabulary", res.data);
      });
  }

  @Mutation
  private setVocabulary(payload: any) {
    this.stateVocabulary = payload;
  }
}
