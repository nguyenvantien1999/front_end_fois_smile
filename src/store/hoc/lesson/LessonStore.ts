import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import LoginStore from "@/store/LoginStore";
import { getModule } from "vuex-module-decorators";

const loginStore = getModule(LoginStore);
@Module({ dynamic: true, store: store, name: "lessonStore" })
export default class LessonStore extends VuexModule {
  stateLesson = [];
  stateProgress = [];

  get getStateProgress(){
    return this.stateProgress;
  }

  get geStateLesson() {
    return this.stateLesson;
  }

  @Action
  async getLessonApi() {
    await axios.get("https://backend-fois-smile.herokuapp.comlesson").then((res) => {
      this.context.commit("setLesson", res.data);
    });
  }

  @Action
  async getProgressAPI() {
    await axios
      .get("https://backend-fois-smile.herokuapp.comprogress/getAllMaBH", {
        params: {
          matk: loginStore.getSessionMaTk,
        },
      })
      .then((res) => {
        this.context.commit("setProgress", res.data);
      });
  }

  @Mutation
  private setLesson(payload: any) {
    this.stateLesson = payload;
  }

  @Mutation
  private setProgress(payload: any) {
    this.stateProgress = payload;
  }
}
