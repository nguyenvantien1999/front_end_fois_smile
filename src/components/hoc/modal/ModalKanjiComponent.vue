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
          <div id="draw">
            <div id="sampleKanji-btn" class="ml-3">
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
          <p class="btn btn-primary" id="r" @click="reset">
            <i class="fa fa-undo" aria-hidden="true"></i>
          </p>
          <p id="pa" class="ml-2">
            Âm Hán tự: <b>{{ chuCai.amtiet }}</b> <br />
            Nghĩa: <b>{{ chuCai.nghia }}</b> <br />
            Phát âm:
            <i
              @click="audio(chuCai.tenchu)"
              id="speaker"
              class="fa fa-volume-up"
              aria-hidden="true"
            ></i>
            <br />
            On'yomi:
            <span v-for="on in getOnyomi" :key="on.maam"
              >「{{ on.tenam }}」
            </span>
            <br />
            Kun'yomi:
            <span v-for="on in getKunyomi" :key="on.maam"
              >「{{ on.tenam }}」 </span
            ><br />
            <span>
              <b>Ví dụ:</b> <br />
              <span id="vdKanji" v-for="ex in getExampleKanji" :key="ex.mavd">
                <i
                  @click="audio(ex.tenvd)"
                  id="speaker"
                  class="fa fa-volume-up"
                  aria-hidden="true"
                ></i>
                {{ ex.tenvd }}&nbsp;&nbsp;{{ ex.nghia }} <br />
              </span>
            </span>
          </p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import KanjiStore from "../../../store/hoc/ban_chu_cai/KanjiStore";
import Example from "../../../store/hoc/ExampleStore";
import { getModule } from "vuex-module-decorators";

const kanjiStore = getModule(KanjiStore);
const example = getModule(Example);

@Component
export default class ModalKanji extends Vue {
  @Prop(String)
  propID!: string;

  @Prop()
  chuCai?: any;

  get getOnyomi() {
    return kanjiStore.getStateOnyomi;
  }

  get getKunyomi() {
    return kanjiStore.getStateKunyomi;
  }

  get getExampleKanji() {
    return example.getStateExample;
  }
  draw() {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `var draw = document.getElementById("draw");
		var dmak = new Dmak('${this.chuCai.tenchu}',{ 
      'element': "draw", 
      "uri": "https://kanjivg.tagaini.net/kanjivg/kanji/", 
      height: 150,
      width: 150,
      step: 0.015});
    `;
    document.body.appendChild(drawScript);

    kanjiStore.getOnyomiApi(this.chuCai.machu);
    kanjiStore.getKunyomiApi(this.chuCai.machu);
    example.getExampleApi(this.chuCai.machu);
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
  audio(tenChu: string) {
    let drawScript = document.createElement("script");
    drawScript.innerHTML = `responsiveVoice.speak("${tenChu}", "Japanese Female")`;
    document.body.appendChild(drawScript);
  }
}
</script>

<style>
#vdKanji {
  border: 1px solid blanchedalmond;
}
</style>
