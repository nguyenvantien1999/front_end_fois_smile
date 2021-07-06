<template>
  <span @show="getReplyAPI">
    {{ getLength }}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

@Component
export default class CountReply extends Vue {
  @Prop()
  propMaBL: any;
  private length = 0;

  get getLength() {
    return this.length;
  }

  created() {
    this.connect();
  }

  get getReplyAPI() {
    let length = 0;
    axios
      .get("https://backend-fois-smile.herokuapp.comreply/getreply", {
        params: {
          mabl: this.propMaBL,
        },
      })
      .then(async (res) => {
        if (this.length != res.data.length) {
          this.length = res.data.length;
        }
      });
    return 0;
  }
  connect() {
    const client = new SockJS("https://backend-fois-smile.herokuapp.comwebsocket");
    const stompClient = Stomp.over(client);
    stompClient.connect({}, (frame) => {
      stompClient.subscribe("/topic/getRepSocket", (tick) => {
        var rep = JSON.parse(tick.body);
        if (rep[0].mabl == this.propMaBL) {
          this.length = rep.length;
        }
      });
    });
  }
}
</script>

<style></style>
