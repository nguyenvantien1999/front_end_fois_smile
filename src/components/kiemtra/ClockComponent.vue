<template>
  <div>
    <div id="timer" class="text-center">
      <span id="minute">{{ getMinute }}</span>
      <span id="colon">:</span>
      <span id="seconds">{{ getSeconds }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Clock extends Vue {
  private timer = 0;
  private totalTime = 60 * 60;

  startTimer() {
    this.timer = setInterval(() => this.countdown(), 1000);
  }
  countdown() {
    this.totalTime--;
  }
  padTime(time: any) {
    return (time < 10 ? "0" : "") + time;
  }
  get getMinute(): any {
    return this.padTime(Math.floor(this.totalTime / 60));
  }
  get getSeconds(): any {
    return this.padTime(this.totalTime - this.getMinute * 60);
  }
  mounted() {
    this.startTimer();
    var timerId = setInterval(() => {
      if (this.getMinute == 0 && this.getSeconds == 0) {
        alert("Bạn đã hết giờ làm bài, hệ thống sẽ tính điểm những gì bạn đã nộp");
        this.$emit("hetgio", true);
        clearInterval(timerId);
      }
    }, 1000);
  }
}
</script>

<style>
#timer {
  font-size: 20px;
  color: gray;
}
#buttons {
  display: flex;
}
button {
  margin: 2px;
}
</style>
