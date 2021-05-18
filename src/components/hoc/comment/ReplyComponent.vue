<template>
  <div>
    <p v-for="(r, i) in getReplyLimit" :key="i">
      <i class="replyText">
        <u>{{ r.hoten }}:</u> {{ r.ndrep }}
        <span class="text-secondary">|{{ r.thoigian }}</span></i
      >
    </p>
    <p class="row" v-if="getReply.length > limit">
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

@Component
export default class Reply extends Vue {
  @Prop()
  propMaBL: any;
  private reply = [];
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

  get getReplyLimit() {
    return lodash.slice(this.getReply, this.getStartArray, this.getEndArray);
  }

  nextPage() {
    if (this.startArray + this.getLimit < this.getReply.length) {
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

  get getReply(): any {
    return this.reply;
  }

  created() {
    setInterval(() => this.getReplyAPI(), 100);
  }

  getReplyAPI() {
    axios
      .get("https://backend-fois-smile.herokuapp.com/reply/getreply", {
        params: {
          mabl: this.propMaBL,
        },
      })
      .then((res) => {
        this.reply = res.data;
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
