<template>
  <div>
    <!-- footer -->
    <div onclick="onTop()">
      <i id="up" class="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
    <hr />
    <div id="footer">
      <div class="container pt-4 pb-2 text-dark">
        <div class="row">
          <div style="width: 40%">
            <div id="logoFooter" class="row">
              <img
                width="25%"
                height="10%"
                src="../assets/images/logoJapan.jpg"
                alt="logo"
              />
              <div class="ml-2">
                <h3 style="margin-top: 30px">
                  <b>
                    <span class="text-primary"
                      >F<span class="text-danger">O</span>IS</span
                    >
                    <i
                      id="smile"
                      class="fa fa-smile-o bg-warning text-danger"
                      aria-hidden="true"
                    ></i>
                    <span class="text-danger">Smile</span>
                  </b>
                </h3>
                <p style="margin-top: -15px; color: red">
                  <i>Nụ cười Nhật ngữ</i>
                </p>
              </div>
            </div>
            <div>
              <p>
                <i
                  class="fa fa-home"
                  style="color: #ff0080"
                  aria-hidden="true"
                ></i>
                Trụ sở: 06 Phan Vinh, phường Vĩnh Hòa, thành phố Nha Trang, tỉnh
                Khánh Hòa.
                <br />
                <i class="fa fa-envelope-o text-danger" aria-hidden="true"></i>
                tien.nv.59cntt@ntu.edu.vn
                <br />
                <i
                  class="fa fa-facebook-square text-primary"
                  aria-hidden="true"
                ></i>
                Fanpage
                <br />
                <i class="fa fa-phone text-success" aria-hidden="true"></i>
                +(84)981.530.459
              </p>
            </div>
          </div>
          <div style="width: 30%" class="pl-3 pt-2">
            <h4><b>VỀ CHÚNG TÔI</b></h4>
            <ul>
              <li>Về FOIS Smile</li>
              <li>Điều khoảng sử dụng</li>
              <li>Chính sách bảo mật thông tin</li>
            </ul>
          </div>
          <div style="width: 30%" class="pl-3 pt-2">
            <h4><b>Lịch làm việc</b></h4>
            Thứ 2 đến thứ 6
            <ul>
              <li>Sáng: 8h - 12h</li>
              <li>Chiều: 13h - 17h30</li>
            </ul>
            Thứ 7
            <ul>
              <li>Sáng: 8h - 12h</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        id="bottom_footer"
        class="text-center"
        style="background-color: #ff0080; color: antiquewhite"
      >
        <i>Copyright © 2021 Thiết kể bởi <b>Nguyễn Văn Tiến</b></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  //   sticky = document.getElementById("header");
  // _header = document.getElementById("_header");
  // up = document.getElementById("up");
  // window.onscroll = function (e)
  // 	{
  // 		if(this.scrollY > 5){
  // 			sticky.style.backgroundColor = "#ffb6c190";
  // 			sticky.style.transform = "scaleY(0.8)";
  // 			sticky.style.transformOrigin = "top";
  // 			_header.style.transform = "scale(0.8)";
  // 			up.style.display = "block";
  // 		}
  // 		else{
  // 			sticky.style.backgroundColor = "#FFB6C1";
  // 			sticky.style.transform = "scale(1)";
  // 			_header.style.transform = "scale(1)";
  // 			up.style.display = "none";
  // 		}
  // 	}
  // onTop(){
  // 	document.documentElement.scrollTop = 0;
  // }
}
</script>

<style>
/* footer */
#footer {
  background-color: #ffe4e1;
}

#footer h4 b {
  color: #ff0080;
}

#bottom_footer {
  border-top: 1px solid #ffffff;
}
#up {
  display: none;
  position: fixed;
  padding: 10px;
  bottom: 30px;
  background-color: #ffffff;
  border-radius: 50px;
  color: #ff0080;
  right: 30px;
  box-shadow: 1px 1px 3px #ff0080;
  cursor: pointer;
}
#up:hover {
  color: lightgoldenrodyellow;
  background-color: #ff0080;
  box-shadow: 1px 1px 3px black;
}
</style>
