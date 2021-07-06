<template>
  <b-modal id="editTK" hide-footer :title-html="title">
    <table id="inforTB">
      <tr v-for="(info, i) in inforTitle" :key="i">
        <td class="titleinfor">
          <b>{{ info }}</b>
        </td>
        <td class="tdValue">
          <input
            v-if="getEdit == 0 && i == 0"
            type="text"
            class="form-control"
            v-model="propTK.username"
          />
          <input
            v-else-if="getEdit == 1 && i == 1"
            type="text"
            class="form-control"
            v-model="propTK.password"
          />
          <input
            v-else-if="getEdit == 2 && i == 2"
            type="text"
            class="form-control"
            v-model="propTK.loaitk"
          />
          <span v-else>
            {{ getInforValue[i] }}
          </span>
        </td>
        <td>
          <i
            v-if="getEdit != i"
            class="fa fa-pencil text-danger"
            aria-hidden="true"
            @click="setEdit(i)"
          ></i>
          <span v-else>
            <i
              class="fa fa-times-circle"
              aria-hidden="true"
              @click="outEdit"
              style="color: red"
            ></i>
          </span>
        </td>
      </tr>
      <tr>
        <td class="titleinfor"><b>Cập nhật</b></td>
        <td>
          <i
            @click="updateAccountApi()"
            class="fa fa-cloud-upload text-primary"
            aria-hidden="true"
          ></i>
        </td>
      </tr>
    </table>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class EditTK extends Vue {
  @Prop()
  private propTK: any;
  private edit = -1;
  private title =
    "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Sửa thông tin tài khoản</b>";
  private inforTitle = ["Tài khoản", "Mật khẩu", "Loại"];
  get getInforValue() {
    return [this.propTK.username, this.propTK.password, this.propTK.loaitk];
  }
  get getEdit() {
    return this.edit;
  }
  private setEdit(i: number) {
    this.edit = i;
  }
  private outEdit() {
    this.edit = -1;
  }
  async updateAccountApi() {
    await axios
      .get("https://backend-fois-smile.herokuapp.com/account/update", {
        params: {
          matk: this.propTK.matk,
          username: this.propTK.username,
          password: this.propTK.password,
          loaitk: this.propTK.loaitk,
          thoigiandn:
            this.propTK.thoigiandn != null
              ? Date.parse(this.propTK.thoigiandn)
              : 0,
          remove: this.propTK.remove,
        },
      })
      .then(()=>{
        alert("Chỉ sửa thành công!!!");
        this.$emit("reload");
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
</script>

<style></style>
