<template>
  <div @show="getQuestionApi">
    <p v-for="(q, i) in getQuestion" :key="i">
      {{ i + 1 }}) {{ q.tenchc }}
      <br />
      <span v-if="q.maloaich == 'TL'">
        <textarea rows="1" v-model="answer[i]" />
      </span>
      <span class="row" v-else>
        <span v-for="(a, y) in getAnswerQuestion[i]" :key="y">
          <input
            type="radio"
            :value="a.tenda"
            v-model="answer[i]"
            class="ml-5"
          />
          <label
            >{{ a.tenda }}
            <img
              width="150px"
              height="150px"
              class="img-thumbnail"
              v-if="a.hinhanh != undefined"
              :src="require('../../../assets/images/answer/' + a.hinhanh)"
              alt=""
            />
          </label>
        </span>
      </span>
      <span v-if="propShowDA">
        <span v-for="(c, y) in getCorrectAnswer[i]" :key="y">
          Đáp án: {{ c.tendadung }}
          <i
            v-if="getAnswer[i] == c.tendadung"
            class="fa fa-check text-success"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-times text-danger" aria-hidden="true"></i>
        </span>
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class Question extends Vue {
  @Prop()
  private propMaCH: any;
  @Prop()
  private propShowDA: any;
  private question = [];
  private answerQuestion = [];
  private answer = [];
  private correctAnswer = [];

  get getAnswerQuestion() {
    return this.answerQuestion;
  }

  get getCorrectAnswer() {
    return this.correctAnswer;
  }

  get getAnswer() {
    return this.answer;
  }
  get getQuestion() {
    return this.question;
  }
  get getQuestionApi() {
    this.answer = [];
    this.answerQuestion = [];
    this.correctAnswer = [];
    axios
      .get("https://backend-fois-smile.herokuapp.com/childquestion", {
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
    return 0;
  }

  getAnswerApi(machc: any) {
    axios
      .get("https://backend-fois-smile.herokuapp.com/answer", {
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
      .get("https://backend-fois-smile.herokuapp.com/correctanswer", {
        params: {
          machc: machc,
        },
      })
      .then(async (res) => {
        this.correctAnswer.push(res.data as never);
      });
  }
}
</script>

<style>
input:checked + label {
  color: #ff0080;
}
</style>
