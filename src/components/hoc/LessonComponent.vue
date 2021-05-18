<template>
  <div id="contentBH">
    <div id="menuPart" class="d-flex" style="background-color: #ffb6c1">
      <h4
        class="btnBH"
        v-for="(part, i) in lessonPart"
        :key="i"
        :class="{ isActive: getLessonPart == i }"
        @click="setLessonPart(i)"
      >
        <b>{{ part }}</b>
      </h4>
    </div>
    <vocabulary :propBH="getPropContent" v-show="getLessonPart == 0" />
    <grammar :propBH="getPropContent" v-show="getLessonPart == 1" />
    <listening :propBH="getPropContent" v-show="getLessonPart == 2" />
    <exercise :propBH="getPropContent" v-show="getLessonPart == 3" />
    <h4 id="tieuDeBH" class="mt-2 text-left ml-5">
      <b>Bình luận</b>
    </h4>
    <hr />
    <div class="ml-5 mb-5 ml-5">
      <div class="d-flex justify-content-center mb-3">
        <p>
          <b class="text-danger">{{ getAccountInfor.hoten }}</b>
        </p>
        <textarea
          class="ml-2"
          placeholder="Viết bình luận của bạn"
          rows="1"
          v-model="comment"
        ></textarea>
        <button class="btn btn-info ml-2" @click="addComment">bình luận</button>
      </div>
      <comment :propMaBH="propMaBH" :key="getReloadComment" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Vocabulary from "../hoc/part/VocabularyComponent.vue";
import Grammar from "../hoc/part/GrammarComponent.vue";
import Listening from "../hoc/part/ListeningComponent.vue";
import Exercise from "../hoc/part/ExerciseComponent.vue";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import LoginStore from "@/store/LoginStore";
import Comment from "./comment/CommentComponent.vue";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    Vocabulary,
    Grammar,
    Listening,
    Exercise,
    Comment,
  },
})
export default class LessonComponent extends Vue {
  @Prop()
  propContent!: number;
  @Prop()
  propMaBH: any;
  private lessonPart = ["Từ vựng", "Ngữ pháp", "Nghe", "Bài tập"];
  private selectLessonPart = 0;
  private comment = "";
  private reloadComment = 0;

  get getReloadComment() {
    return this.reloadComment;
  }

  get getComment() {
    return this.comment;
  }

  get getPropContent() {
    this.selectLessonPart = 0;
    return this.propContent;
  }

  get getLessonPart() {
    return this.selectLessonPart;
  }

  get getAccountInfor() {
    return loginStore.getAccountInfor;
  }

  setLessonPart(part: number) {
    this.selectLessonPart = part;
    switch (part) {
      case 1: {
        this.progressNP();
        break;
      }
      case 2: {
        this.progressNghe();
        break;
      }
      case 3: {
        this.progressBT();
        break;
      }
    }
  }

  progressNP() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/progress/updateNP", {
        params: {
          matk: loginStore.getSessionMaTk,
          mabh: this.propMaBH,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  progressNghe() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/progress/updateNghe", {
        params: {
          matk: loginStore.getSessionMaTk,
          mabh: this.propMaBH,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  progressBT() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/progress/updateBT", {
        params: {
          matk: loginStore.getSessionMaTk,
          mabh: this.propMaBH,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async addComment() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/comment/addcomment", {
        params: {
          ndbl: this.getComment,
          thoigian: Date.now(),
          matk: this.getAccountInfor.matk,
          mabh: this.propMaBH,
        },
      })
      .catch((e) => {
        console.log(e);
      });
    this.comment = "";
    this.reloadComment++;
  }
}
</script>

<style>
#menuPart {
  background-color: #ffb6c1;
  border-bottom: 1px solid #ff0080;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 1px 1px 1px #ffb6c1;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 5px;
}
.btnBH {
  background-color: #ff69b4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ff0080;
  color: white;
  position: relative;
  top: 1px;
  width: 33%;
  padding: 10px 25px;
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
}
.btnBH:not(.isActive):hover {
  background-color: #fdf181;
  color: #535343;
  cursor: pointer;
}

.isActive {
  border: 1px solid #ff0080;
  border-bottom: none;
  background-color: #ffffff;
  box-shadow: 2px 0px 2px #535343;
  color: #535343;
}
</style>
