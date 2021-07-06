<template>
  <div @show="getCommentAPI">
    <div>
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
    </div>
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
          <reply class="ml-4" :propMaBL="c.mabl"/>
        </span>
      </p>
      <div class="text-right mr-5" style="color: #ff1493">
        <p v-if="getCommentList.length > limit">
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
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

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

  private commentList = [];
  private replyFlag = -1;
  private startArray = 0;
  private currentPage = 1;
  private limit = 5;
  private comment = "";
  private stompClient: any;
 
  get getComment() {
    return this.comment;
  }

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
    return lodash.slice(
      this.getCommentList,
      this.getStartArray,
      this.getEndArray
    );
  }
 
  nextPage() {
    if (this.startArray + this.getLimit < this.getCommentList.length) {
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

  get getReplyFlag() {
    return this.replyFlag;
  }
  get getCommentList() {
    return this.commentList;
  }

  get getCommentAPI() {
    this.replyFlag = -1;
    axios
      .get("https://backend-fois-smile.herokuapp.com/comment/getcomment", {
        params: {
          mabh: this.propMaBH,
        },
      })
      .then((res) => {
        if (this.commentList != res.data) {
          this.commentList = res.data;
        }
      });
    return 0;
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
    this.send();
    this.comment = "";
  }

  created() {
    this.connect();
  }
  send() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send("/app/cmtSocket", this.propMaBH, {});
      console.log("Kết nối thành công socket comment");
    } else {
      console.log("Lỗi socket comment");
    }
  }
  connect() {
    this.stompClient = Stomp.over(new SockJS("https://backend-fois-smile.herokuapp.com/websocket"));
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe("/topic/getCmtSocket", (tick: any) => {
        this.commentList = JSON.parse(tick.body);
      });
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
