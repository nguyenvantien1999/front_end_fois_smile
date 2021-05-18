<template>
  <div class="container mt-5" id="infor">
    <div id="header_bang_tin">
      <h4><b>Thông tin tài khoảng</b></h4>
    </div>
    <table id="inforTB">
      <tr v-for="(info, i) in inforTitle" :key="i">
        <td class="titleinfor">
          <b>{{ info }}</b>
        </td>
        <td class="tdValue">
          <span v-if="getEdit == 2 && i == 2">
            <input type="radio" v-model="editText[i]" value="1" /> Nam
            <input type="radio" v-model="editText[i]" value="0" /> Nữ
          </span>
          <span v-else-if="getEdit == 3 && i == 3">
            <input class="form-control" type="date" v-model="editText[i]" />
          </span>
          <span v-else-if="getEdit == 5 && i == 5">
            <input
              type="password"
              class="form-control"
              v-model="passOld"
              placeholder="Mật khẩu cũ"
            />
            <input
              type="password"
              class="form-control"
              v-model="editText[i]"
              placeholder="Mật khẩu mới"
            />
            <input
              type="password"
              class="form-control"
              v-model="passNewAgain"
              placeholder="Nhập lại"
            />
          </span>
          <input
            v-else-if="getEdit == i"
            type="text"
            class="form-control"
            v-model="editText[i]"
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
              @click="update(i)"
              class="fa fa-cloud-upload text-primary"
              aria-hidden="true"
            ></i>
            <i
              class="fa fa-times-circle"
              aria-hidden="true"
              @click="outEdit"
              style="color: red"
            ></i>
          </span>
        </td>
      </tr>
    </table>
    <div class="row">
      <test-transcript class="col-6" />
      <progress1 class="col-6" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginStore from "../../store/LoginStore";
import { getModule } from "vuex-module-decorators";
import axios from "axios";
import TestTranscript from "./TestTranscriptComponent.vue";
import Progress1 from "./ProgressComponent.vue";

const loginStore = getModule(LoginStore);

@Component({
  components: {
    TestTranscript,
    Progress1,
  },
})
export default class InforAccount extends Vue {
  private inforTitle = [
    "Tài khoản",
    "Họ và tên",
    "Giới tính",
    "Ngày sinh",
    "Địa chỉ",
    "Mật khẩu",
  ];
  private edit = -1;
  private editText = [];
  private passOld = "";
  private passNewAgain = "";

  get getPassOld() {
    return this.passOld;
  }
  get getPassNewAgain() {
    return this.passNewAgain;
  }
  get getEditText() {
    return this.editText;
  }
  get getEdit() {
    return this.edit;
  }
  get getAccountInfor() {
    return loginStore.getAccountInfor;
  }
  get getSessionUsername() {
    return loginStore.getSessionUsername;
  }

  get getDateOfBirth() {
    if (this.getAccountInfor.ngaysinh != null) {
      let date = new Date(this.getAccountInfor.ngaysinh);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    } else {
      return "Chưa có ngày sinh";
    }
  }

  get getSessionPassLength() {
    let len = "";
    let pass: any = loginStore.getStateAccount.password;
    for (let i = 0; i < pass?.length; i++) {
      len += "*";
    }
    return len;
  }

  private setEdit(i: number) {
    this.edit = i;
  }

  private outEdit() {
    this.edit = -1;
  }

  private update(i: number) {
    switch (i) {
      case 0: {
        if (this.getEditText[i] != null) {
          loginStore.getStateAccount.username = this.getEditText[i];
          loginStore.updateAccountApi();
          sessionStorage.clear();
          localStorage.clear();
          alert("Thay đổi thành công, vui lòng đăng nhập lại");
          window.location.reload();
        } else {
          alert("Không được để trống");
        }
        break;
      }
      case 1: {
        if (this.getEditText[i] != null) {
          loginStore.getAccountInfor.hoten = this.getEditText[i];
          loginStore.updateAccountInforApi();
          alert("Thay đổi thành công");
          this.edit = -1;
        } else {
          alert("Không được để trống");
        }
        break;
      }
      case 2: {
        if (this.getEditText[i] != null) {
          loginStore.getAccountInfor.gioitinh = this.getEditText[i];
          loginStore.updateAccountInforApi();
          alert("Thay đổi thành công");
          this.edit = -1;
        } else {
          alert("Không được để trống");
        }
        break;
      }
      case 3: {
        if (this.getEditText[i] != null) {
          loginStore.getAccountInfor.ngaysinh = this.getEditText[i];
          loginStore.updateAccountInforApi();
          alert("Thay đổi thành công");
          this.edit = -1;
        } else {
          alert("Không được để trống");
        }
        break;
      }
      case 4: {
        if (this.getEditText[i] != null) {
          loginStore.getAccountInfor.diachi = this.getEditText[i];
          loginStore.updateAccountInforApi();
          alert("Thay đổi thành công");
          this.edit = -1;
        } else {
          alert("Không được để trống");
        }
        break;
      }
      case 5: {
        if (this.getEditText[i] != null) {
          if (loginStore.getStateAccount.password == this.getPassOld) {
            if (this.getPassNewAgain == this.getEditText[i]) {
              if (this.getEditText[i] == loginStore.getStateAccount.password)
                alert("Mật khẩu mới giống mật khẩu cũ");
              else {
                loginStore.getStateAccount.password = this.getEditText[i];
                loginStore.updateAccountApi();
                sessionStorage.clear();
                localStorage.clear();
                alert("Thay đổi thành công, vui lòng đăng nhập lại");
                window.location.reload();
              }
            } else {
              alert("Mật khẩu không trùng khớp");
            }
          } else {
            alert("Mật khẩu cũ không đúng, vui lòng nhập lại");
          }
        } else {
          alert("Không được để trống mật khẩu");
        }
        break;
      }
    }
  }

  get getInforValue() {
    return [
      this.getSessionUsername,
      this.getAccountInfor.hoten,
      this.getAccountInfor.gioitinh == 1
        ? "Nam"
        : this.getAccountInfor.gioitinh == 0
        ? "Nữ"
        : "Chưa xác định",
      this.getDateOfBirth,
      this.getAccountInfor.diachi != null
        ? this.getAccountInfor.diachi
        : "Chưa có địa chỉ",
      this.getSessionPassLength,
    ];
  }
}
</script>

<style>
#inforTB {
  margin: 0 auto;
}
#inforTB td {
  padding-left: 20px;
}
#inforTB i {
  font-size: 20px;
  margin-right: 10px;
}
#inforTB i:hover {
  cursor: pointer;
  text-shadow: 1px 1px 1px black;
}
.tdValue {
  width: 220px !important;
}
.titleinfor {
  width: 120px;
  color: #ff1493;
  text-shadow: 1px 1px 1px thistle;
}
</style>
