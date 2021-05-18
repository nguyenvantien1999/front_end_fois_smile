<template>
  <div>
    <p v-for="(c, i) in getCommentLimit" :key="i">
      <b>{{ c.hoten }}:</b> {{ c.ndbl }}
      <span class="text-secondary"
        ><small>|{{ c.thoigian }}</small></span
      >
      <span class="reply ml-1 text-danger" v-if="getReplyFlag == i">
        <i @click="hidenReply()">Ẩn trả lời</i></span
      >
      <span v-else class="reply ml-1 text-primary">
        <span><count-reply :propMaBL="c.mabl" /></span>
        <i @click="showReply(i)"> trả lời</i></span
      >
      <br />
      <span v-if="getReplyFlag == i">
        <span class="d-flex justify-content-center">
          <textarea
            rows="1"
            placeholder="Viết câu trả lời của bạn"
            v-model="reply"
          ></textarea>
          <button @click="addReply(c.mabl)" class="btn btn-info">
            Trả lời
          </button>
        </span>
        <reply
          class="ml-4"
          :propMaBL="c.mabl"
        />
      </span>
    </p>
    <div class="text-right mr-5" style="color: #ff1493">
      <p v-if="getComment.length > limit">
        <i
          @click="backPage"
          class="btn-page fa fa-arrow-circle-o-left mt-1"
          aria-hidden="true"
        ></i>
        <span style="font-size: smaller" class="ml-1 mr-1 text-dark"
          >Trang: {{ getCurrentPage }}</span
        >
        <i
          @click="nextPage"
          class="btn-page fa fa-arrow-circle-o-right mt-1"
          aria-hidden="true"
        ></i>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import LoginStore from "@/store/LoginStore";
import Reply from "./ReplyComponent.vue";
import CountReply from "./CountReplyComponent.vue";
import lodash from "lodash";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    Reply,
    CountReply,
  },
})
export default class Comment extends Vue {
  @Prop()
  propMaBH: any;

  private comment = [];
  private replyFlag = -1;
  private reply = "";
  private startArray = 0;
  private currentPage = 1;
  private limit = 5;

  get getLimit() {
    return this.limit;
  }

  get getStartArray() {
    return this.startArray;
  }

  get getCurrentPage() {
    return this.currentPage;
  }

  get getEndArray() {
    return this.startArray + this.getLimit;
  }

  get getCommentLimit() {
    return lodash.slice(this.getComment, this.getStartArray, this.getEndArray);
  }

  nextPage() {
    if (this.startArray + this.getLimit < this.getComment.length) {
      this.currentPage++;
      this.startArray += this.getLimit;
    }
  }
  backPage() {
    if (this.startArray > 0) {
      this.currentPage--;
      this.startArray -= this.getLimit;
    }
  }

  get getReply() {
    return this.reply;
  }

  get getReplyFlag() {
    return this.replyFlag;
  }
  get getComment() {
    return this.comment;
  }

  mounted() {
    setInterval(() => {
      this.getCommentAPI();
    }, 1000);
  }
  getCommentAPI() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/comment/getcomment", {
        params: {
          mabh: this.propMaBH,
        },
      })
      .then((res) => {
        this.comment = res.data;
      });
  }

  get getAccountInfor() {
    return loginStore.getAccountInfor;
  }

  showReply(i: any) {
    this.replyFlag = i;
  }
  hidenReply() {
    this.replyFlag = -1;
  }

  async addReply(mabl: number) {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/reply/addreply", {
        params: {
          ndrep: this.getReply,
          thoigian: Date.now(),
          matk: this.getAccountInfor.matk,
          mabl: mabl,
        },
      })
      .catch((e) => {
        console.log(e);
      });
    this.reply = "";
  }
}
</script>

<style>
.reply {
  font-size: smaller;
}
.reply:hover {
  cursor: pointer;
  color: red !important;
}
</style>
