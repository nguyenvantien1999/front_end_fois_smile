<template>
  <div>
    <test />
  </div>
</template>

<script lang="ts">
import Test from "../components/kiemtra/TestComponent.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Test,
  },
})
export default class KiemTra extends Vue {}
</script>

<style></style>
