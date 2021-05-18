<template>
  <b-modal id="chiTietTKHV" hide-footer :title-html="title">
    <table id="ChiTietKTHV" @show="getInfoTKApi">
      <tr>
        <td><b>Họ và Tên:</b></td>
        <td class="pl-4">{{ getInfoTK.hoten }}</td>
      </tr>
      <tr>
        <td><b>Giới tính:</b></td>
        <td class="pl-4">
          {{
            getInfoTK.gioitinh == 1
              ? "Nam"
              : this.getInfoTK.gioitinh == 0
              ? "Nữ"
              : "Chưa xác định"
          }}
        </td>
      </tr>
      <tr>
        <td><b>Ngày sinh:</b></td>
        <td class="pl-4">{{ getDateOfBirth(getInfoTK.ngaysinh) }}</td>
      </tr>
      <tr>
        <td><b>Địa chỉ:</b></td>
        <td class="pl-4">
          {{ getInfoTK.diachi == null ? "Chưa xác định" : getInfoTK.diachi }}
        </td>
      </tr>
    </table>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import LoginAdminStore from "@/store/LoginAdminStore";
import { getModule } from "vuex-module-decorators";

const loginAdminStore = getModule(LoginAdminStore);

@Component
export default class ChiTietTKHV extends Vue {
  @Prop()
  propMaTK: any;
  private title = "<b style='color: #ff69b4; text-shadow: 1px 1px 1px black;'>Chi tiết tài khoản</b>";

  get getInfoTK() {
    return loginAdminStore.getStateAccHVtInfor;
  }
  get getInfoTKApi() {
    if (this.propMaTK != "") {
      loginAdminStore.getAccHVInforApi(this.propMaTK);
    }
    return 0;
  }
  getDateOfBirth(ngaysinh: string) {
    if (ngaysinh != null) {
      let date = new Date(ngaysinh);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    } else {
      return "Chưa xách định";
    }
  }
}
</script>

<style>
#ChiTietKTHV {
  margin: 0 auto;
}
#ChiTietKTHV b {
  color: #ff69b4;
}
</style>
