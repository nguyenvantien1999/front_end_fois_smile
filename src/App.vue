<template>
  <div id="app">
    <header-component v-if="getShowAdmin == false" />
    <router-view @admin="adminFlag" />
    <footer-component v-if="getShowAdmin == false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

@Component({
  components: {
    HeaderComponent,
    FooterComponent,
  },
})
export default class App extends Vue {
  showAdmin = false;
  get getShowAdmin() {
    return this.showAdmin;
  }
  adminFlag(data: boolean) {
    this.showAdmin = data;
  }
}
</script>
<style>
/* Font-awesome */
@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

#app,
.modal-body,
pre {
  font-family: "Noto Serif JP", serif !important;
}
pre {
  font-size: 18px !important;
}
</style>
