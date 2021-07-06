import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ dynamic: true, store: store, name: "structureStore" })
export default class StructureStore extends VuexModule {
  stateStructure = [];

  get getStateStructure() {
    return this.stateStructure;
  }

  @Action
  async getStructureApi(manp: string) {
    await axios
      .get("https://backend-fois-smile.herokuapp.comstructure", {
        params: {
          manp: manp,
        },
      })
      .then((res) => {
        this.context.commit("setStructure", res.data);
      });
  }

  @Mutation
  private setStructure(payload: any) {
    this.stateStructure.push(payload as never);
  }
}
