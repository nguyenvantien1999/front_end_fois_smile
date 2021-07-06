<template>
  <div @show="getQuestionApi">
    <button id="addTK" class="btn" @click="$bvModal.show('addCH' + propMaCH)">
      <i class="fa fa-plus" aria-hidden="true"></i> <b>Câu hỏi con</b>
    </button>
    <p v-for="(ques, i) in getQuestion" :key="i">
      <span @click="selectCHC = i" class="select">
        {{ i + 1 }}. {{ ques.tenchc }} | Loại:
        {{ ques.maloaich == "TN" ? "Trắc nghiệm" : "Tự luận" }}
        <br v-if="ques.hinhanh != '' || ques.linkaudio != ''" />
        <img
          v-if="ques.hinhanh != ''"
          width="300px"
          height="150px"
          class="img-thumbnail"
          :src="ques.hinhanh"
          alt=""
        />
        <audio
          v-if="ques.linkaudio != ''"
          class="mb-3"
          id="audioListen"
          :src="ques.linkaudio"
          controls
        ></audio>
      </span>
      <span v-if="getSelectCHC == i">
        <br />
        <i
          class="fa fa-pencil text-warning icon"
          @click="$bvModal.show('editCHC' + ques.machc)"
          aria-hidden="true"
        ></i>
        <sua-chc :propCHC="ques" @reloadCHC="setQuestionApi" />
        <i
          @click="removeCHC(ques.machc, ques.tenchc)"
          class="fa fa-trash text-danger icon ml-2"
          aria-hidden="true"
        ></i>
        <i
          class="fa fa-times-circle ml-2 icon"
          aria-hidden="true"
          @click="selectCHC = -1"
          style="color: red"
        ></i>
      </span>
      <span v-if="getSelectCHC == i">
        <button
          v-if="ques.maloaich == 'TN'"
          id="addTK"
          class="btn ml-2"
          @click="$bvModal.show('addCTL' + ques.machc)"
        >
          <i class="fa fa-plus" aria-hidden="true"></i> <b>Đáp án</b>
        </button>
        <them-ctl
          :propMaCHC="ques.machc"
          :propAnswerLength="getAnswerQuestion[i].length"
          @reloadCHC="setQuestionApi"
        />
        <button
          id="addTK"
          class="btn ml-2"
          @click="$bvModal.show('addDA' + ques.machc)"
        >
          <i class="fa fa-plus" aria-hidden="true"></i> <b>Đáp án đúng</b>
        </button>
        <them-da
          :propMaCHC="ques.machc"
          :propCorrectAnswerLength="getCorrectAnswer[i].length"
          @reloadCHC="setQuestionApi"
        />
      </span>
      <br />
      <span class="inline">
        <span v-for="(a, y) in getAnswerQuestion[i]" :key="y">
          <span @click="selectAnswer = y + ' ' + i" class="select">
            {{ a.tenda }}
            <img
              width="80px"
              height="80px"
              class="img-thumbnail"
              v-if="a.hinhanh != ''"
              :src="a.hinhanh"
              alt=""
            />
          </span>
          <span v-if="getSelectAnswer == y + ' ' + i">
            <i
              class="fa fa-pencil text-warning icon"
              @click="$bvModal.show('editCTL' + a.mada)"
              aria-hidden="true"
            >
            </i>
            <sua-ctl :propAswer="a" />
            <i
              @click="removeCTL(a.mada, a.tenda)"
              class="fa fa-trash text-danger icon ml-2"
              aria-hidden="true"
            ></i>
            <i
              class="fa fa-times-circle ml-2 icon"
              aria-hidden="true"
              @click="selectAnswer = -1"
              style="color: red"
            ></i>
          </span>
          |
        </span>
      </span>
      <span v-for="(c, y) in getCorrectAnswer[i]" :key="y">
        <span @click="selectCorrectAnswer = y + '' + i" class="select">
          Đáp án: {{ c.tendadung }}
        </span>
        <span v-if="getSelectCorrectAnswer == y + '' + i">
          <i
            class="fa fa-pencil text-warning icon"
            @click="$bvModal.show('editDA' + c.madadung)"
            aria-hidden="true"
          ></i>
          <sua-da :propDaDung="c" />
          <i
            @click="removeDA(c.madadung, c.tendadung)"
            class="fa fa-trash text-danger icon ml-2"
            aria-hidden="true"
          ></i>
          <i
            class="fa fa-times-circle ml-2 icon"
            aria-hidden="true"
            @click="selectCorrectAnswer = -1"
            style="color: red"
          ></i>
        </span>
      </span>
    </p>
    <them-chc
      :propMaCH="propMaCH"
      :propCHCLength="getQuestion.length"
      @reloadCHC="setQuestionApi"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ThemChc from "./ThemCHCComponent.vue";
import SuaChc from "./SuaCHCComponent.vue";
import ThemCtl from "./quanLyCauTraLoi/ThemCTLComponent.vue";
import SuaCtl from "./quanLyCauTraLoi/SuaCTLComponent.vue";
import ThemDa from "./quanLyDapAn/ThemDAComponent.vue";
import SuaDa from "./quanLyDapAn/SuaDAComponent.vue";
import axios from "axios";
@Component({
  components: {
    ThemChc,
    SuaChc,
    ThemCtl,
    SuaCtl,
    ThemDa,
    SuaDa,
  },
})
export default class QuanLyCHC extends Vue {
  @Prop()
  private propMaCH: any;
  private question = [];
  private answerQuestion = [];
  private correctAnswer = [];
  private selectCHC = -1;
  private selectAnswer = [];
  private selectCorrectAnswer = -1;

  get getSelectCHC() {
    return this.selectCHC;
  }

  get getSelectAnswer() {
    return this.selectAnswer;
  }

  get getSelectCorrectAnswer() {
    return this.selectCorrectAnswer;
  }

  get getAnswerQuestion() {
    return this.answerQuestion;
  }

  get getCorrectAnswer() {
    return this.correctAnswer;
  }

  get getQuestion() {
    return this.question;
  }
  get getQuestionApi() {
    this.setQuestionApi();
    return 0;
  }
  setQuestionApi() {
    this.answerQuestion = [];
    this.correctAnswer = [];
    axios
      .get("http://localhost:3000/childquestion", {
        params: {
          mach: this.propMaCH,
        },
      })
      .then((res) => {
        this.question = res.data;
        this.question.forEach((que: any) => {
          this.getAnswerApi(que.machc);
          this.getCorrectAnswerApi(que.machc);
        });
      });
  }

  getAnswerApi(machc: any) {
    axios
      .get("http://localhost:3000/answer", {
        params: {
          machc: machc,
        },
      })
      .then((res) => {
        this.answerQuestion.push(res.data as never);
      });
    return 0;
  }

  getCorrectAnswerApi(machc: string) {
    axios
      .get("http://localhost:3000/correctanswer", {
        params: {
          machc: machc,
        },
      })
      .then(async (res) => {
        this.correctAnswer.push(res.data as never);
      });
  }

  removeDA(madadung: any, tenda: any) {
    let retVal = confirm(`Bạn thật sự muốn xóa đáp án: ${tenda}`);
    if (retVal == true) {
      axios
        .get("http://localhost:3000/correctanswer/remove", {
          params: {
            madadung: madadung,
          },
        })
        .then((res) => {
          this.setQuestionApi();
        });
    }
  }

  removeCTL(mactl: any, tenctl: any) {
    let retVal = confirm(`Bạn thật sự muốn xóa câu trả lời: ${tenctl}`);
    if (retVal == true) {
      axios
        .get("http://localhost:3000/answer/remove", {
          params: {
            mada: mactl,
          },
        })
        .then((res) => {
          this.setQuestionApi();
        });
    }
  }

  removeCHC(machc: any, tenchc: any){
    let retVal = confirm(`Bạn thật sự muốn xóa câu hỏi con: ${tenchc}`);
    if (retVal == true) {
      axios
        .get("http://localhost:3000/childquestion/remove", {
          params: {
            machc: machc,
          },
        })
        .then((res) => {
          this.setQuestionApi();
        });
    }
  }
  
}
</script>

<style>
.select:hover {
  cursor: pointer;
}
</style>
