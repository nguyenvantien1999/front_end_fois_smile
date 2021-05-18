<template>
  <div>
    <div id="bodyTest" class="container d-flex">
      <list-test @selectTest="handleEvent" />
      <div id="noiDungTest">
        <content-test :propMaBai="getMaBaiKT" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ListTest from "./ListTestComponent.vue";
import ContentTest from "./ContentTestComponent.vue";

@Component({
  components: {
    ListTest,
    ContentTest,
  },
})
export default class Test extends Vue {
  private maBaiKT = "";

  get getMaBaiKT() {
    return this.maBaiKT;
  }

  handleEvent(data: string) {
    this.maBaiKT = data;
  }
}
</script>

<style>
#bodyTest {
  padding: 0px;
  margin-bottom: 10px;
}

#noiDungTest {
  width: 80%;
  box-shadow: 4px 2px 2px #d3969f;
  border: 1px solid #ff0080;
  border-radius: 10px;
}
</style>
