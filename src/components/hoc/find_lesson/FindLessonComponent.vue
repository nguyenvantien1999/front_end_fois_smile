<template>
  <div class="container">
    <b-form inline>
      <div id="findLesson">
        <b-form-input
          id="inputFindLesson"
          placeholder="vd: bài 1, từ vựng 1, ngữ pháp 1, bài tập 1 hoặc người & ngôn ngữ"
          v-model="findText"
        ></b-form-input>
        <input
          id="bthFind"
          class="ml-2 btn"
          type="button"
          value="Tìm kiếm"
          @click="search"
        />
      </div>
    </b-form>
    <p id="infoSearch" class="text-danger">{{ getInfoSearch }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LessonStore from "../../../store/hoc/lesson/LessonStore";
import { getModule } from "vuex-module-decorators";
import { forEach, flatten } from "lodash";
import axios from "axios";
import LoginStore from "@/store/LoginStore";

const lessonStore = getModule(LessonStore);
const loginStore = getModule(LoginStore);
@Component
export default class FindLesson extends Vue {
  private findText = "";
  private infoSearch = "";

  get getInfoSearch() {
    return this.infoSearch;
  }

  get getFindText() {
    return this.findText;
  }

  get getLesson() {
    return lessonStore.geStateLesson;
  }

  get getProgress() {
    return lessonStore.getStateProgress;
  }

  created() {
    lessonStore.getProgressAPI();
  }

  async insertProgress(matk: any, mabh: any) {
    await axios
      .get("https://backend-fois-smile.herokuapp.comprogress/insert", {
        params: {
          tuvung: true,
          matk: matk,
          mabh: mabh,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  search() {
    let vitri = 0;
    let invalid = 0;
    this.getLesson.forEach(async (lesson: { mabh: any; tenbh: any }) => {
      vitri++;
      console.log();
      if (
          parseInt(this.getFindText.slice(-2)) == vitri||
        lesson.tenbh.toLowerCase().indexOf(this.getFindText) != -1
      ) {
        if (this.getProgress.length >= vitri - 1) {
          this.$emit("selectBH", vitri);
          this.$emit("selectMaBH", lesson.mabh);
          this.$emit("selectPart", this.getFindText);
          await this.insertProgress(loginStore.getSessionMaTk, lesson.mabh);
          await lessonStore.getProgressAPI();
          this.infoSearch = "";
        } else {
          this.infoSearch = "Bài " + vitri + " chưa được mở khóa";
        }
      } else {
        invalid++;
      }
    });
    if (invalid == this.getLesson.length) {
      this.infoSearch = "không tồn tại bài như trên";
    } else {
      this.findText = "";
    }
  }
}
</script>

<style>
#findLesson {
  margin: 0px auto;
  margin-top: 10px;
}
#inputFindLesson {
  width: 40vw;
  border: solid 2px palevioletred;
}
#infoSearch {
  text-align: center;
  margin-bottom: 10px;
  font-size: small;
}
#bthFind{
  background-color: #ff1d5e;
  color: white;
}
</style>
