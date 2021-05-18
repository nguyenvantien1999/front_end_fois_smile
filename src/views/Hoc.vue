<template>
  <div>
    <n5 />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import N5 from "../components/hoc/N5Component.vue";

@Component({
  components: {
    N5,
  },
})
export default class Hoc extends Vue {}
</script>

<style></style>
