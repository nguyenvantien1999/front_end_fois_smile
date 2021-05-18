<template>
  <div>
    <kaiwa />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Kaiwa from "../components/kaiwa/KaiwaComponent";
@Component({
  components: {
    Kaiwa,
  },
})
export default class KaiwaView extends Vue {}
</script>

<style></style>
