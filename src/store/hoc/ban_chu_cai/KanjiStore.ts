import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import axios, { AxiosResponse } from "axios";

@Module({ dynamic: true, store: store, name: "kanjiStore" })
export default class KanjiStore extends VuexModule {
  stateBangKanji = [];
  stateOnyomi = [];
  stateKunnyomi = [];

  get getStateKanji() {
    return this.stateBangKanji;
  }

  get getStateKunyomi() {
    return this.stateKunnyomi;
  }

  get getStateOnyomi() {
    return this.stateOnyomi;
  }

  @Action
  async getKanjiApi() {
    await axios.get("https://backend-fois-smile.herokuapp.comword/kanji").then((res) => {
      this.context.commit("setBangKanji", res.data);
    });
  }

  @Action
  async getOnyomiApi(machu: string) {
    await axios
      .get("https://backend-fois-smile.herokuapp.comkanji_syllables/on", {
        params: {
          machu: machu,
        },
      })
      .then((res) => {
        this.context.commit("setOnyomi", res.data);
      });
  }

  @Action
  async getKunyomiApi(machu: string) {
    await axios
      .get("https://backend-fois-smile.herokuapp.comkanji_syllables/kun", {
        params: {
          machu: machu,
        },
      })
      .then((res) => {
        this.context.commit("setKunyomi", res.data);
      });
  }

  @Mutation
  private setKunyomi(payload: any) {
    this.stateKunnyomi = payload;
  }

  @Mutation
  private setOnyomi(payload: any) {
    this.stateOnyomi = payload;
  }

  @Mutation
  private setBangKanji(payload: any) {
    this.stateBangKanji = payload;
  }
}
