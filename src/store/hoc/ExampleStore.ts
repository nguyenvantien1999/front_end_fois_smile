import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "..";

@Module({ dynamic: true, store: store, name: "exampleStore" })
export default class ExampleStore extends VuexModule {
  stateExample = [];

  get getStateExample() {
    return this.stateExample;
  }

  @Action
  async getExampleApi(machu: string) {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/example", {
        params: {
          machu: machu,
        },
      })
      .then((res) => {
        this.context.commit("setExample", res.data);
      });
  }

  @Mutation
  private setExample(payload: any) {
    this.stateExample = payload;
  }
}
