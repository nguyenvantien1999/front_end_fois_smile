<template>
  <div>
    <div id="bodyKaiwa" class="container d-flex">
      <list-kaiwa @selectKW="eventListKW" />
      <div id="noiDungKaiwa">
        <kaiwa-content :propKW="getContentKW" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ListKaiwa from "./ListKaiwaComponent.vue";
import KaiwaContent from "./KaiwaContentComponent.vue";

@Component({
  components: {
    ListKaiwa,
    KaiwaContent,
  },
})
export default class KaiwaComponent extends Vue {
  private contentKW = {};

  get getContentKW() {
    return this.contentKW;
  }

  eventListKW(data: any) {
    this.contentKW = data;
  }
}
</script>

<style>
#bodyKaiwa {
  padding: 0px;
  margin-bottom: 10px;
}
#noiDungKaiwa {
  width: 80%;
  box-shadow: 4px 2px 2px #d3969f;
  border: 1px solid #ff0080;
  border-radius: 10px;
}
</style>
