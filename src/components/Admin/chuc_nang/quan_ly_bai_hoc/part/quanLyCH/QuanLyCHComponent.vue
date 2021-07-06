<template>
  <div @show="getQuestionApi">
    <button id="addTK" class="btn" @click="$bvModal.show('addCH')">
      <i class="fa fa-plus" aria-hidden="true"></i> <b>Câu hỏi</b>
    </button>
    <table>
      <tr
        v-for="(ques, i) in getQuestion"
        :key="i"
        style="border: 1px solid black"
      >
        <td style="width: 35%">
          <div class="text-center" v-if="getSelectCH == i">
            <i
              class="fa fa-pencil text-warning icon mr-3"
              @click="$bvModal.show('editCH' + ques.mach)"
              aria-hidden="true"
            ></i>
            <i
              @click="removeCH(ques.mach, ques.tench)"
              class="fa fa-trash text-danger icon mr-3"
              aria-hidden="true"
            ></i>
            <i
              class="fa fa-times-circle icon"
              aria-hidden="true"
              @click="selectCH = -1"
              style="color: red"
            ></i>
          </div>
          <span @click="selectCH = i" class="select"
          v-html="ques.tench"
            >
            <br />
            <img
              v-if="ques.hinhanh != null"
              width="300px"
              height="150px"
              class="img-thumbnail"
              :src="ques.hinhanh"
              alt=""
            />
          </span>
          <br />
          <audio
            v-if="ques.linkaudio != null"
            class="mb-3"
            id="audioListen"
            :src="ques.linkaudio"
            controls
          ></audio>
        </td>
        <td class="pl-3" style="width: 65%">
          <quan-ly-chc :propMaCH="ques.mach" @reloadCH="reloadQuestionApi" />
        </td>
        <sua-ch :propCH="ques" />
      </tr>
    </table>
    <them-ch
      :propMaBH="propBN"
      :propCHLength="getQuestion.length"
      @reloadCH="reloadQuestionApi"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import QuanLyChc from "../quanLyCHC/QuanLyCHCComponent.vue";
import ThemCh from "./ThemCHComponent.vue";
import SuaCh from "./SuaCHComponent.vue";

@Component({
  components: {
    QuanLyChc,
    ThemCh,
    SuaCh,
  },
})
export default class QuanLyCauHoi extends Vue {
  @Prop()
  private propBN: any;
  private question = "";
  private selectCH = -1;

  get getSelectCH() {
    return this.selectCH;
  }

  get getQuestion() {
    return this.question;
  }

  get getQuestionApi() {
    axios
      .get("http://localhost:3000/question", {
        params: {
          mabai: this.propBN,
        },
      })
      .then((res) => {
        this.question = res.data;
      });
    return 0;
  }
  reloadQuestionApi() {
    axios
      .get("http://localhost:3000/question", {
        params: {
          mabai: this.propBN,
        },
      })
      .then((res) => {
        this.question = res.data;
      });
  }
  removeCH(mach: any, tench: any){
    let retVal = confirm(`Bạn thật sự muốn xóa câu hỏi: ${tench}`);
    if (retVal == true) {
      axios
        .get("http://localhost:3000/question/remove", {
          params: {
            mach: mach,
          },
        })
        .then((res) => {
          this.reloadQuestionApi();
        });
    }
  }
}
</script>

<style></style>
