<template>
  <div>
    <login-admin v-if="getAccAdmin == null" />
    <admin-component v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginAdmin from "../components/Admin/LoginAdminComponent.vue";
import AdminComponent from "../components/Admin/AdminComponent.vue";
import LoginAdminStore from "../store/LoginAdminStore";
import { getModule } from "vuex-module-decorators";

const loginAdminStore = getModule(LoginAdminStore);

@Component({
  components: {
    LoginAdmin,
    AdminComponent,
  },
})
export default class Admin extends Vue {
  get getAccAdmin() {
    return loginAdminStore.getSessionMaTkAdmin;
  }
  created() {
    this.$emit("admin", true);
  }
}
</script>

<style></style>
