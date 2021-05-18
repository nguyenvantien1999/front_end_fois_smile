<template>
  <div>
    <div id="bodyN5" class="container d-flex">
      <listBH @selectBH="handleEvent" @selectMaBH="handleEvent1" />
      <div id="noiDungBH">
        <alphabet v-show="getContentBH == 0" />
        <lesson
          :propContent="getContentBH"
          :propMaBH="getMaBH"
          v-show="getContentBH > 0"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ListBH from "./ListBHComponent.vue";
import Alphabet from "./alphabet/AlphabetComponent.vue";
import Lesson from "./LessonComponent.vue";

@Component({
  components: {
    ListBH,
    Alphabet,
    Lesson,
  },
})
export default class N5 extends Vue {
  private contentBH = 0;
  private maBH = "";
  private isLoaded = false;

  get getIsLoaded() {
    return this.isLoaded;
  }
  get getMaBH() {
    return this.maBH;
  }
  get getContentBH() {
    return this.contentBH;
  }
  handleEvent(data: number) {
    this.contentBH = data;
  }
  handleEvent1(data: any) {
    this.maBH = data;
  }
}
</script>

<style>
/* body */
#bodyN5 {
  padding: 0px;
  margin-bottom: 10px;
}

#noiDungBH {
  width: 80%;
  box-shadow: 4px 2px 2px #d3969f;
  border: 1px solid #ff0080;
  border-radius: 10px;
}
#loadLesson {
  margin: 35vh auto;
}
</style>
