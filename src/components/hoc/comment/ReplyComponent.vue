<template>
  <div @show="getReplyAPI">
    <span class="d-flex justify-content-center">
      <textarea
        rows="1"
        placeholder="Viết câu trả lời của bạn"
        v-model="reply"
      ></textarea>
      <button @click="addReply" class="btn btn-info">Trả lời</button>
    </span>
    <p v-for="(r, i) in getReplyLimit" :key="i">
      <i class="replyText">
        <u>{{ r.hoten }}:</u> {{ r.ndrep }}
        <span class="text-secondary">|{{ r.thoigian }}</span></i
      >
    </p>
    <p class="row" v-if="getReplyList.length > limit">
      <i
        @click="backPage"
        class="btn-page fa fa-arrow-circle-o-left mt-1"
        aria-hidden="true"
      ></i>
      <span style="font-size: smaller" class="ml-1 mr-1"
        >Trang: {{ getCurrentPage }}</span
      >
      <i
        @click="nextPage"
        class="btn-page fa fa-arrow-circle-o-right mt-1"
        aria-hidden="true"
      ></i>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import lodash from "lodash";
import { getModule } from "vuex-module-decorators";
import LoginStore from "@/store/LoginStore";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

const loginStore = getModule(LoginStore);

@Component
export default class Reply extends Vue {
  @Prop()
  propMaBL: any;
  private replyList = [];
  private startArray = 0;
  private currentPage = 1;
  private limit = 5;
  private reply = "";
  private stompClient: any;

  get getReply() {
    return this.reply;
  }

  get getLimit() {
    return this.limit;
  }

  get getStartArray() {
    return this.startArray;
  }

  get getAccountInfor() {
    return loginStore.getAccountInfor;
  }

  get getCurrentPage() {
    return this.currentPage;
  }

  get getEndArray() {
    return this.startArray + this.getLimit;
  }

  get getReplyLimit() {
    return lodash.slice(
      this.getReplyList,
      this.getStartArray,
      this.getEndArray
    );
  }

  nextPage() {
    if (this.startArray + this.getLimit < this.getReplyList.length) {
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

  get getReplyList(): any {
    return this.replyList;
  }

  get getReplyAPI() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/reply/getreply", {
        params: {
          mabl: this.propMaBL,
        },
      })
      .then((res) => {
        if (this.replyList != res.data) {
          this.replyList = res.data;
        }
      });
    this.connect();
    return 0;
  }
  async addReply() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/reply/addreply", {
        params: {
          ndrep: this.getReply,
          thoigian: Date.now(),
          matk: this.getAccountInfor.matk,
          mabl: this.propMaBL,
        },
      })
      .catch((e) => {
        console.log(e);
      });
    this.send();
    this.reply = "";
  }
  send() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send("/app/repSocket", this.propMaBL, {});
    } else {
      console.log("Lỗi socket");
    }
  }
  connect() {
    this.stompClient = Stomp.over(new SockJS("https://backend-fois-smile.herokuapp.com/websocket"));
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe("/topic/getRepSocket", (tick: any) => {
        this.replyList = JSON.parse(tick.body);
        this.$emit("countRep", this.replyList.length);
      });
    });
  }
}
</script>

<style>
.replyText {
  font-size: smaller;
}
.btn-page:hover {
  cursor: pointer;
  color: brown;
}
</style>
