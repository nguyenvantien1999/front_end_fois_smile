<template>
  <div id="divLoad">
    <semipolar-spinner
      id="loading"
      :animation-duration="2000"
      :size="65"
      color="#ff1d5e"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SemipolarSpinner } from "epic-spinners";
@Component({
  components: {
    SemipolarSpinner,
  },
})
export default class Load extends Vue {}
</script>
<style>
#loading {
  position: absolute;
  left: 210px;
  top: 200px;
}
</style>
