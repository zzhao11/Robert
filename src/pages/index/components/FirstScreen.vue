<template>
  <div id="index">
    <div class="container">
      <canvas
        ref="webGLCanvas"
        width="300"
        height="300"
        style="border-radius: 50%"
      ></canvas>
      <h1 class="title">智能桌面宠物机器人</h1>
      <p class="subtitle">为你的桌面增添快乐</p>
      <div class="button-container">
        <a class="button" href="">前端博客 →</a>
      </div>
    </div>
  </div>
</template>

<script>
import WebGL from "@/utils/WebGL.js";
import logo from "@/assets/img/walle.png";
import noise from "@/assets/img/noise.png";

export default {
  name: "WebGLCanvas",
  mounted() {
    this.initWebGl();
  },
  methods: {
    loadImage(path) {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = path;
        image.onload = function () {
          resolve(image);
        };
      });
    },
    async initWebGl() {
      const vsSource = `
            precision mediump float;

      attribute vec2 aPosition;
      attribute vec2 aUV;
      
      varying vec2 vUV;
      varying vec2 vPos;
      
      void main() {
          gl_Position = vec4(aPosition, 0.0, 1.0);
          vUV = aUV;
          vPos = aPosition;
      }
      `;
      const fsSource = `
      precision mediump float;
      
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      
      uniform float uVar;
      
      varying vec2 vUV;
      varying vec2 vPos;
      
      
      float random (vec2 st) {
          return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
      }
      
      void main() {
          vec4 color1 = texture2D(uTexture1, vUV);
          vec4 color2 = texture2D(uTexture2, vUV);
          vec4 color3 = vec4(vec3(random(vUV)), 1.);
      
          if (color2.r - uVar < 0.0) {
              discard;
          }
      
          gl_FragColor = color1;
      }
     `;

      const [banana, xeno] = await Promise.all([
        this.loadImage(logo),
        this.loadImage(noise),
      ]);
      const aka = new WebGL(this.$refs.webGLCanvas);
      const { gl } = aka;

      console.log(banana, xeno, gl);

      aka
        .init(vsSource, fsSource)
        .loadBuffer(
          new Float32Array([
            1.0, 1.0, 1, 1, -1.0, 1.0, 0, 1, -1.0, -1.0, 0, 0, -1.0, -1.0, 0, 0,
            1.0, -1.0, 1, 0, 1.0, 1.0, 1, 1,
          ])
        )
        .setAttrib("aPosition", 2, gl.FLOAT, false, 16, 0)
        .setAttrib("aUV", 2, gl.FLOAT, false, 16, 8)
        .loadTexture(banana)
        .setUniform("uTexture1", "uniform1i", 0)
        .loadTexture(xeno)
        .setUniform("uTexture2", "uniform1i", 1);

      let value = 0.0;
      let reverse = false;
      draw();

      function draw() {
        const uniform2 = gl.getUniformLocation(aka.program, "uVar");
        gl.uniform1f(uniform2, reverse ? (value -= 0.01) : (value += 0.01));

        if (value >= 1) {
          reverse = true;
        }

        if (value <= 0) {
          reverse = false;
        }

        aka.draw(aka.gl.TRIANGLES, 6);

        requestAnimationFrame(draw);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#index {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(to bottom right, #9bb4d0 5%, #d8e5fe 90% );
  // background-color: #c6e6e8;
  background: #e0eafc;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #cfdef3, #e0eafc);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #cfdef3, #e0eafc);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 45px;
  font-weight: 700;
}

.subtitle {
  margin: 20px 0 3.5rem 0;
  font-size: 1.5rem;
  line-height: 2rem;
}

.button-container {
  display: flex;
  align-items: center;

  .button {
    background-color: #ebedf0;
    color: #1c1e21;
    border-radius: calc(0.4rem);
    cursor: pointer;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.5;
    padding: 8px 32px;
    text-align: center;
    user-select: none;
    white-space: nowrap;
  }
}
</style>
