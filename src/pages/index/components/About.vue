<template>
  <div id="about">
    <div class="switch-container">
      <ul class="switch">
        <li
          class="switch-item"
          v-for="(item, index) in menuItems"
          :key="item.id"
          :class="{ active: currentIndex === index }"
          @mouseenter="selectItem(index)"
        >
          <img
            class="switch-icon"
            :src="require(`@/assets/svg/${item.id}.svg`)"
            alt=""
          />
          <div class="switch-item-info">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>

    <div class="core-content">
      <div
        v-for="(item, index) in menuItems"
        :key="item.id"
        v-show="currentIndex === index"
      >
        <div class="lottie-container">
          <video
            width="460"
            height="460"
            :src="item.video"
            preload
            muted="muted"
            loop
            autoplay="autoplay"
            style="object-fit: cover"
          >
            <source :src="item.video" />
          </video>
        </div>
        <div class="fade">
          <div class="fade-switch fadeSwitchClass">
            <div class="fade-switch-item">
              <div class="slotNum">
                <img :src="item.image" alt="" />
              </div>
            </div>
            <div class="fade-switch-item">
              <h3>{{ item.subtitle }}</h3>
            </div>
            <div class="fade-switch-item">
              <div class="itemCard">
                <div class="serape">
                  <div class="spot"></div>
                  <div class="desc">
                    {{ item.des[0] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="fade-switch-item">
              <div class="itemCard">
                <div class="serape" style="animation-delay: 200ms">
                  <div class="spot"></div>
                  <div class="desc">
                    {{ item.des[1] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="fade-switch-item">
              <div class="itemCard">
                <div class="serape" style="animation-delay: 400ms">
                  <div class="spot"></div>
                  <div class="desc">
                    {{ item.des[2] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="fade-switch-item">
              <div class="itemCard">
                <div class="serape" style="animation-delay: 600ms">
                  <div class="spot"></div>
                  <div class="desc">
                    {{ item.des[3] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          id: "voice",
          title: "语音识别",
          video:
            "https://lf1-cdn-tos.bytescm.com/obj/ad-growth-fe/qianchuan/videos/hlyl.mp4",
          image:
            "https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/87af037cc7b246e397d6f21c0aae4503.png~tplv-hhc0kcolqq-image-v5:0:q100.image",
          subtitle: "唤醒智能，对话未来",
          des: [
            "使用snowboy实现语音唤醒",
            "百度云API进行语音识别",
            "客悦进行意图分析定制",
            "选择API实现智能对话",
          ],
        },
        {
          id: "face",
          title: "人脸识别",
          video:
            "https://lf1-cdn-tos.bytescm.com/obj/ad-growth-fe/qianchuan/videos/gddx.mp4",
          image:
            "https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/98374f679c2846e98bd6617a454aeb15.png~tplv-hhc0kcolqq-image-v5:284:q100.image",
          subtitle: "面面俱到，识别无忧",
          des: [
            "OpenCV库实现人脸检测",
            "人脸中心与图像中心距离计算",
            "图像处理支持人脸识别",
            "摄像头调用与结果返回流程",
          ],
        },
        {
          id: "control",
          title: "远程操控",
          video:
            "https://lf1-cdn-tos.bytescm.com/obj/ad-growth-fe/qianchuan/videos/wsjk.mp4",
          image:
            "https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/f423b078b1734c94b9d481077a7b92d5.png~tplv-hhc0kcolqq-image-v5:283:q100.image",
          subtitle: "掌上遥控，智在千里",
          des: [
            "树莓派与服务器通过HTTP通信",
            "网页端远程检测电量与状态",
            "远程控制家用电器与机器人",
            "本地云服务部署与数据交换",
          ],
        },
        {
          id: "hand",
          title: "手势识别",
          video:
            "https://lf1-cdn-tos.bytescm.com/obj/ad-growth-fe/qianchuan/videos/qcqc.mp4",
          image:
            "https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/46197b9804914a40a3d5026be478d449.png~tplv-hhc0kcolqq-image-v5:289:q100.image",
          subtitle: "手势引领，智能互动",
          des: [
            "百度云API实现手势识别",
            "手势编号识别与返回",
            "摄像头拍摄与API调用流程",
            "手势识别与语音交互结合",
          ],
        },
        {
          id: "state",
          title: "状态管理",
          video:
            "https://lf1-cdn-tos.bytescm.com/obj/ad-growth-fe/qianchuan/videos/llxt.mp4",
          image:
            "https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/cf0523f51bcc4aa88ab7f95e7f346bae.png~tplv-hhc0kcolqq-image-v5:281:q100.image",
          subtitle: "状态一目了然，掌控随心",
          des: [
            "百度云API实现手势识别",
            "手势编号识别与返回",
            "摄像头拍摄与API调用流程",
            "手势识别与语音交互结合",
          ],
        },
      ],
      currentIndex: 0,
      carouselInterval: null,
    };
  },
  mounted() {
    this.startCarousel();
  },
  methods: {
    // 自动切换
    startCarousel() {
      this.carouselInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.menuItems.length;
      }, 5000);
    },

    selectItem(index) {
      this.currentIndex = index;
      // 重置计时器
      clearInterval(this.carouselInterval);
      this.startCarousel();
    },
  },
};
</script>

<style lang="less" scoped>
#about {
  height: 100vh;
  background: #1b212e;
  color: #ffffff;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  transform: translate(0);
  z-index: 5;
}

.switch-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 0 auto;
  background: #262d3c;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
}

.switch {
  max-width: 1200px;
  border-radius: 0;
  position: relative;
  overflow: hidden;
  height: 100px;
  background: rgba(38, 45, 60, 0.6);
  backdrop-filter: blur(32px);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.switch-container ul {
  display: flex;
  overflow-x: auto;
}

.switch-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 100%;
  position: relative;
  cursor: default;
  transition: all 0.3s;
  padding: 24px 32px;
  box-sizing: border-box;
  color: hsla(0, 0%, 100%, 0.5);
  opacity: 0.8;

  &.active {
    opacity: 1;
    color: #fff;
    border-bottom: 4px solid #194ce5;
  }
}

.switch-icon {
  width: 56px;
}

.switch-item-info {
  margin-left: 18px;
  font-weight: 500;
  font-size: 24px;
}

.core-content {
  position: relative;
  width: 1200px;
  margin: 0 auto;
}

.lottie-container {
  position: absolute;
  top: 80px;
  left: 0;
  background: #1b212e;
}

video {
  mix-blend-mode: screen;
}

img {
  width: 136px;
  height: 116px;
}

.fade {
  position: absolute;
  top: 214px;
  right: 0;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
}

.fade-switch {
  width: 487px;
  position: relative;
  left: 0;
  opacity: 1;
  transition-property: all;
}

.fade-switch-item {
  left: 0;
  transition-duration: 500ms;
  transition-delay: 0ms;
  opacity: 1;
  transition-property: all;

  & h3 {
    position: relative;
    font-weight: 600;
    margin-bottom: 2.5rem;
    font-size: 2.25rem;
    line-height: 2.5rem;
    animation: text-fade-in 1s;
  }
}

.itemCard {
  margin-bottom: 20px;
}

.slotNum {
  position: absolute;
  left: -100px;
  top: -78px;
  width: 136px;
  height: 200px;
  animation: num-fade-in 1s;
}

.serape {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  animation: text-fade-in 2s;
}

.spot {
  width: 10px;
  height: 10px;
  background: #194ce5;
  border-radius: 50%;
  margin-right: 12px;
}

.desc {
  font-weight: 400;
  font-size: 18px;
  color: rgb(255, 255, 255);
  opacity: 0.5;
}

@keyframes text-fade-in {
  0% {
    opacity: 0;
    left: 40px;
  }

  100% {
    opacity: 1;
    left: 0;
  }
}

@keyframes num-fade-in {
  0% {
    opacity: 0;
    left: -60px;
  }

  100% {
    opacity: 1;
    left: -100px;
  }
}
</style>
