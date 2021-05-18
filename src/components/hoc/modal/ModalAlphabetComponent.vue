<template>
  <div>
    <b-modal
      @show="draw"
      class="modal"
      :id="propID"
      hide-footer
      title="Chi tiết chữ cái"
    >
      <div class="modal-body">
        <div class="d-flex">
          <div id="draw"></div>
          <p class="btn btn-primary" id="r" @click="reset">
            <i class="fa fa-undo" aria-hidden="true"></i>
          </p>
          <p id="pa" class="ml-2">
            Đơn vị âm: <b>{{ chuCai.amtiet }}</b> <br />
            Phát âm:
            <i
              @click="audio"
              id="speaker"
              class="fa fa-volume-up"
              aria-hidden="true"
            ></i>
          </p>
        </div>
        <div id="sample-btn" class="ml-3">
          <p class="btn btn-secondary" id="p" @click="backward">
            <i class="fa fa-step-backward" aria-hidden="true"></i>
          </p>
          <p class="btn btn-danger" id="s" @click="pause">
            <i class="fa fa-stop" aria-hidden="true"></i>
          </p>
          <p class="btn btn-success" id="g" @click="play">
            <i class="fa fa-play" aria-hidden="true"></i>
          </p>
          <p class="btn btn-secondary" id="n" @click="forward">
            <i class="fa fa-step-forward" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop(String)
  propID!: string;

  @Prop()
  chuCai?: any;

  private isLoaded = false;

  get getIsLoaded() {
    return this.isLoaded;
  }

  draw() {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `var draw = document.getElementById("draw");
		var dmak = new Dmak('${this.chuCai.tenchu}',{ 
      'element': "draw", 
      "uri": "http://kanjivg.tagaini.net/kanjivg/kanji/", 
      height: 150,
      width: 150,
      step: 0.015});
    `;
    document.body.appendChild(drawScript);
  }
  reset() {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `dmak.reset()`;
    document.body.appendChild(drawScript);
  }
  play() {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `dmak.render();`;
    document.body.appendChild(drawScript);
  }
  pause() {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `dmak.pause();`;
    document.body.appendChild(drawScript);
  }
  backward() {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `dmak.eraseLastStrokes(1);`;
    document.body.appendChild(drawScript);
  }
  forward() {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `dmak.renderNextStrokes(1);`;
    document.body.appendChild(drawScript);
  }

  audio() {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `responsiveVoice.speak("${this.chuCai.tenchu}", "Japanese Female")`;
    document.body.appendChild(drawScript);
  }
  // mounted() {
  //   document.onreadystatechange = () => {
  //     if (document.readyState == "complete") {
  //       this.isLoaded = true;
  //     }
  //   };
  // }
}
</script>

<style>
#p,
#r,
#s,
#g,
#n {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}

#r {
  position: absolute;
  margin-left: 120px;
}

#speaker:hover {
  color: red;
}

#speaker:active {
  color: cornsilk;
}
svg.dmak-svg {
  border: 1px solid #cccccc;
  margin-right: 1px;
}
</style>
