<template>
  <div @show="getQuestionAPI" class="mt-3 ml-4">
    <div v-if="getShowDiem">
      <h3 id="tieuDeBH" class="text-center">
        <b>Bạn đã hoàn thành bài kiểm tra</b>
      </h3>
      <h5 class="text-center mt-4">
        Điểm đạt được: <span class="text-danger">{{ getPoint }}/100点</span
        ><br />
        Số câu đúng: <span class="text-success">{{ getTongCauDung }}</span
        >/{{ getTongCH }} 質問 <br />
        <input
          class="btnTestPage btn mt-3"
          @click="reset"
          type="button"
          value="Làm lại"
        />
      </h5>
      <div class="nhanxet mt-4 mb-5 text-center" v-if="getPoint > 60">
        <h4 class="text-danger"><i>Điểm bạn rất cao, làm tốt lắm !!!</i></h4>
        <p class="text-danger">
          <i>あなたのスコアは非常に高く、良い仕事です!!!</i>
        </p>
        <img src="../../assets/images/diemcao.gif" alt="" />
      </div>
      <div class="nhanxet mt-4 mb-5 text-center" v-else>
        <h4 class="text-danger">
          <i>Bài làm không được tốt, cố gắng lần sau nhé !!!</i>
        </h4>
        <p class="text-danger">
          <i>よくありません。次回は頑張ってください!!!</i>
        </p>
        <img src="../../assets/images/diemthap.gif" alt="" />
      </div>
    </div>
    <p v-else>
      <clock v-if="propMaBai != '' && getQuestion[getviTriCH] != undefined" :key="propMaBai" @hetgio="hetgio"/>
      <span v-if="propMaBai != '' && getQuestion[getviTriCH] == undefined" class="text-center">
        <h3 class="mt-5" style="color: gray;">Chưa cập nhật đề kiểm tra</h3>
      </span>
      <b
        class="text-danger"
        v-if="getQuestion[getviTriCH] != undefined"
        v-html="`${getviTriCH + 1}. ${getQuestion[getviTriCH].tench}`"
      ></b>
      <question-test
        v-if="getQuestion[getviTriCH] != undefined"
        :propMaCH="getQuestion[getviTriCH].mach"
        :propPoint="setPoint"
        :propNext="nextQuestion"
        :propViTriCH="viTriCH"
        :propLength="getQuestion.length"
        @selectShowDiem="handleEvent"
      />
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import QuestionTest from "./QuestionTestComponent.vue";
import LoginStore from "../../store/LoginStore";
import { getModule } from "vuex-module-decorators";
import Clock from "./ClockComponent.vue";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    QuestionTest,
    Clock,
  },
})
export default class ContentTest extends Vue {
  @Prop()
  private propMaBai: any;

  private question = [];
  private viTriCH = 0;
  private point = 0;
  private tongCauDung = 0;
  private tongCH = 0;
  private showDiem = false;

  get getShowDiem() {
    return this.showDiem;
  }
  get getTongCH() {
    return this.tongCH;
  }
  get getTongCauDung() {
    return this.tongCauDung;
  }
  get getPropBai() {
    return this.propMaBai;
  }
  get getQuestion(): any {
    return this.question;
  }
  get getviTriCH() {
    return this.viTriCH;
  }
  get getPoint() {
    return this.point;
  }
  hetgio(data: boolean){
    this.showDiem = data;
    this.updateTranscript();
  }
  setPoint(answer: any) {
    this.point += answer.diem;
    this.tongCauDung += answer.soCauDung;
    this.tongCH += answer.soCH;
  }
  reset() {
    this.point = 0;
    this.tongCauDung = 0;
    this.tongCH = 0;
    this.showDiem = false;
    this.viTriCH = 0;
  }
  nextQuestion() {
    if (this.viTriCH <= this.question.length) {
      return this.viTriCH++;
    }
  }
  handleEvent(data: boolean) {
    this.showDiem = data;
    this.updateTranscript();
  }

  async updateTranscript(){
    await axios.get("https://backend-fois-smile.herokuapp.com/testTranscript/add", {
      params: {
        record: {
          diem: this.getPoint,
          matk: loginStore.getStateAccount.matk,
          mabaikt: this.propMaBai,
          thoigian: Date.now(),
        },
      },
    });
  }

  get getQuestionAPI() {
    this.point = 0;
    this.tongCauDung = 0;
    this.tongCH = 0;
    this.showDiem = false;
    this.viTriCH = 0;
    axios
      .get("https://backend-fois-smile.herokuapp.com/question", {
        params: {
          mabai: this.getPropBai,
        },
      })
      .then((res) => {
        this.question = res.data;
      });
    return 0;
  }
}
</script>

<style>
.nhanxet {
  margin: 0 15%;
  padding: 10px 0;
  border-top: 2px solid #ff0080;
  border-bottom: 2px solid #ff0080;
  border-radius: 20px;
}
</style>
