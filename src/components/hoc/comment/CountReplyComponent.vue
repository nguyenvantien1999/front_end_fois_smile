<template>
  <span>
    {{ getLength }}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class CountReply extends Vue {
  @Prop()
  propMaBL: any;
  private length = 0;

  get getLength() {
    return this.length;
  }

  mounted() {
    setInterval(() => {
      this.getReplyAPI();
    }, 1000);
  }

  getReplyAPI() {
    let length = 0;
    axios
      .get("https://backend-fois-smile.herokuapp.com/reply/getreply", {
        params: {
          mabl: this.propMaBL,
        },
      })
      .then(async (res) => {
        this.length = res.data.length;
      });
  }
}
</script>

<style></style>
