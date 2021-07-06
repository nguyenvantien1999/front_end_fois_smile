<template>
  <div @show="getQuestionAPI">
    <p class="text-right mr-5">Điểm câu {{ propViTriCH + 1 }}: {{ getDiem }}</p>
    <p v-for="(q, i) in getQuestion" :key="i" class="ml-4">
      <span class="ml-2" v-html="`${i + 1}) ${q.tenchc}`"> </span><br />
      <span class="row">
        <textarea
          rows="1"
          class="ml-5"
          type="text"
          :id="q.machc"
          v-model="answer[i]"
        />
        <span v-if="getNopBai" class="ml-2">
          Đáp án:<br />
          <span v-for="(correct, y) in q.dapandung" :key="y">
            - {{ correct.tendadung }}
            <i
              v-if="getAnswer[i] == correct.tendadung"
              class="fa fa-check text-success"
              aria-hidden="true"
            ></i>
            <i v-else class="fa fa-times text-danger" aria-hidden="true"></i>
            <br />
          </span>
        </span>
      </span>
    </p>
    <hr />
    <div class="text-center">
      <input
        v-if="!getNopBai"
        class="btnTestPage btn"
        type="button"
        @click="check"
        value="Nộp bài"
      />
      <input
        v-else-if="propViTriCH + 1 != propLength"
        class="btnTestPage btn"
        type="button"
        @click="propNext"
        value="Tiếp theo"
      />
      <input
        v-else
        class="btnTestPage btn"
        type="button"
        @click="showDiem"
        value="Xem điểm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import axios from "axios";
import lodash from "lodash";

@Component
export default class QuestionTest extends Vue {
  @Prop()
  private propMaCH: any;

  @Prop()
  private propPoint: any;

  @Prop()
  private propNext: any;

  @Prop()
  private propViTriCH: any;

  @Prop()
  private propLength: any;

  private answer = [];
  private nopbai = false;
  private question: any = [];
  private tong = 0;

  get getNopBai() {
    return this.nopbai;
  }

  get getQuestion() {
    return this.question;
  }

  get getAnswer(): any {
    return this.answer;
  }

  get getDiem(): number {
    return this.tong;
  }
  showDiem() {
    this.$emit("selectShowDiem", true);
  }

  check() {
    this.nopbai = true;
    this.tong = 0;
    let soCH = this.getQuestion.length;
    let question = this.getQuestion;
    let soCauDung = 0;

    for (let i = 0; i < soCH; i++) {
      for (let y = 0; y < question[i].dapandung.length; y++) {
        if (this.getAnswer[i] == question[i].dapandung[y].tendadung) {
          this.tong += this.question[i].diem;
          soCauDung++;
        }
      }
    }
    this.propPoint({ diem: this.tong, soCauDung: soCauDung, soCH: soCH });
  }

  get getQuestionAPI() {
    this.tong = 0;
    this.answer = [];
    this.nopbai = false;
    axios
      .get("https://backend-fois-smile.herokuapp.comchildquestion", {
        params: {
          mach: this.propMaCH,
        },
      })
      .then((res) => {
        this.question = res.data;
      })
      .finally(async () => {
        await this.question.forEach(
          async (que: { dapandung: any; machc: any }) => {
            que.dapandung = await this.getCorrectAnswerApi(que.machc);
          }
        );
      });

    return 0;
  }

  async getCorrectAnswerApi(mach: string) {
    let dapandung: never[] = [];
    await axios
      .get("https://backend-fois-smile.herokuapp.comcorrectanswer", {
        params: {
          machc: mach,
        },
      })
      .then((res) => {
        dapandung = res.data;
      });
    return dapandung;
  }
}
</script>

<style>
.btnTestPage {
  color: white !important;
  background-color: #ff0080 !important;
  text-shadow: 1px 1px 1px rgb(141, 141, 141);
  display: flex;
  margin: 0 auto;
  align-items: center !important;
  justify-content: center !important;
}
.btnTestPage:hover {
  color: white !important;
  box-shadow: 1px 1px 1px rgb(141, 141, 141);
}
textarea {
  width: 35%;
}
</style>
