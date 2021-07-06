<template>
  <div>
    <login-admin @setDN="setDN" v-if="getAccAdmin == false" />
    <admin-component v-else />
    admin: {{getAccAdmin}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginAdmin from "../components/Admin/LoginAdminComponent.vue";
import AdminComponent from "../components/Admin/AdminComponent.vue";

@Component({
  components: {
    LoginAdmin,
    AdminComponent,
  },
})
export default class Admin extends Vue {
  private logged = false;
  get getAccAdmin() {
    return this.logged;
  }
  setDN(data: any){
    this.logged = data;
  }

  created() {
    this.$emit("admin", true);
  }
}
</script>

<style></style>
