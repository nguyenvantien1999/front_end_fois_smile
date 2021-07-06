<template>
  <div id="menuBH" class="mr-2">
    <h5 class="text-light"><strong>Mina no nihongo 1</strong></h5>
    <p
      @click="selectBH({ vitri: 0, mabh: -1 })"
      :class="{ menuBHActive: getActiveBH == 0 }"
    >
      <b>Bảng chữ cái</b>
    </p>
    <p
      @mouseover="hover = i"
      @mouseleave="hover = -1"
      @click="selectBH({ vitri: i + 1, mabh: lesson.mabh })"
      :class="{
        learned: getProgress.indexOf(lesson.mabh) != -1,
        menuBHActive: getActiveBH == i + 1,
      }"
      v-for="(lesson, i) in getLesson"
      :key="lesson.mabh"
    >
      <span v-if="getHover == i">
        <i
          v-if="
            getProgress.length != i && getProgress.indexOf(lesson.mabh) == -1
          "
          class="fa fa-lock text-danger mr-1 lock"
          aria-hidden="true"
        ></i>
        <i
          v-else-if="getProgress.length == i"
          class="fa fa-unlock-alt text-light mr-1 lock"
          aria-hidden="true"
        ></i>
      </span>
      <b>Bài {{ i + 1 }}: {{ lesson.tenbh }}</b>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import LessonStore from "../../store/hoc/lesson/LessonStore";
import { getModule } from "vuex-module-decorators";
import axios from "axios";
import LoginStore from "@/store/LoginStore";

const lessonStore = getModule(LessonStore);
const loginStore = getModule(LoginStore);

@Component
export default class ListBH extends Vue {
  @Prop()
  private propBH: any;
  private activeBH = 0;
  private hover = -1;

  get getHover() {
    return this.hover;
  }
  get getActiveBH() {
    if(this.propBH != null) this.activeBH = this.propBH;
    return this.activeBH;
  }
  get getLesson() {
    return lessonStore.geStateLesson;
  }
  get getProgress() {
    return lessonStore.getStateProgress;
  }

  beforeCreate() {
    lessonStore.getLessonApi();
  }

  created() {
    lessonStore.getProgressAPI();
  }

  async selectBH(bai: any) {
    if (this.getProgress.length >= bai.vitri-1) {
      this.activeBH = bai.vitri;
      this.$emit("selectBH", bai.vitri);
      this.$emit("selectMaBH", bai.mabh);
      if (bai.mabh != -1) {
        await axios
          .get("https://backend-fois-smile.herokuapp.comprogress/insert", {
            params: {
              tuvung: true,
              matk: loginStore.getSessionMaTk,
              mabh: bai.mabh,
            },
          })
          .catch((e) => {
            console.log(e);
          });
        await lessonStore.getProgressAPI();
      }
    }
  }
}
</script>

<style>
/* menu con */
#menuBH {
  width: 20%;
  background-color: white;
}
#menuBH h5 {
  background-color: #ff69b4;
  padding: 5px;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#menuBH p {
  color: #ff0080;
  border: 2px solid rgb(90, 90, 90);
  border-radius: 10px;
  margin-bottom: 4px;
  padding: 2px 5px;
  box-shadow: 2px 2px #888888;
}
#menuBH p:hover,
.menuBHActive {
  border: 2px solid #ff0080 !important;
  color: rgb(255, 255, 255) !important;
  background-color: #ffb6c1 !important;
  cursor: pointer;
  transform: scale(1.05);
}

.learned {
  background-color: rgba(112, 69, 103, 0.027);
  text-decoration: underline !important;
}
.lock {
  text-shadow: 1px 1px 1px black;
}
</style>
