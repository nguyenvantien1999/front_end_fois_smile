import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ dynamic: true, store: store, name: "lessonStore" })
export default class LessonStore extends VuexModule {
  stateLesson = [];

  get geStateLesson() {
    return this.stateLesson;
  }

  @Action
  async getLessonApi() {
    await axios.get("https://backend-fois-smile.herokuapp.com/lesson").then((res) => {
      this.context.commit("setLesson", res.data);
    });
  }

  @Mutation
  private setLesson(payload: any) {
    this.stateLesson = payload;
  }
}
