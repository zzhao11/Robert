<template>
  <div id="terminal">
    <div id="title">产品终端</div>
    <div id="subtitle">
      <div>多端结合，满足用户不同诉求</div>
    </div>
    <div class="terminals">
      <div class="terminals-card">
        <div
          v-for="(item, index) in cardList"
          :key="item.id"
          class="card-item"
          :class="{ active: index === currentIndex }"
          @mouseenter="selectItem(index)"
        >
          <div class="card-background"></div>
          <div class="title">{{ item.title }}</div>
          <div class="subtitle">{{ item.subtitle }}</div>
          <div>
            <div class="fade-switch">
              <div
                v-for="(item, index) in item.desc"
                :key="index"
                class="fade-switch-item"
              >
                <div class="wrapper">
                  <div class="item-card">
                    <div class="serape">
                      <div class="spot"></div>
                      <div class="desc">{{ item }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            :src="require(`@/assets/img/${item.id}.png`)"
            alt=""
            class="image"
          />
          <img
            src="https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/93848f9ca65045edb60a4275ed0efeac.png~tplv-hhc0kcolqq-image-v5:610:q100.image"
            alt=""
            class="baching"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Terminal",
  data() {
    return {
      cardList: [
        {
          id: "object",
          title: "实物",
          subtitle: "桌面新宠，智能生活伴侣",
          desc: [
            "互动娱乐，智能陪伴",
            "语音手势，双重控制",
            "人脸识别，安全守护",
          ],
        },
        {
          id: "web",
          title: "PC网页",
          subtitle: "网络一端，尽在掌握之中",
          desc: [
            "远程监控，状态一目了然",
            "智能控制，操作便捷",
            "数据管理，高效有序",
          ],
        },
        {
          id: "app",
          title: "手机APP",
          subtitle: "App在手，卓越触手可及",
          desc: [
            "界面友好, 简洁直观",
            "集控制、监控于一体",
            "实时互动, 即时响应",
          ],
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    selectItem(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
#terminal {
  height: 684px;
  background: url(https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/d3af496….png~tplv-hhc0kcolqq-image-v5:3075:q100.image),
    linear-gradient(180deg, @bg-dark, #141821);
  color: #ffffff;
  background-size: contain;
  text-align: center;
  padding-bottom: 5rem;
}

#title {
  margin-bottom: 0.5rem;
  padding-top: 5rem;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 600;
}

#subtitle {
  margin-bottom: 2.5rem;
  opacity: 0.5;
  font-size: 1rem;
  line-height: 1.5rem;
}

.terminals-card {
  width: 1200px;
  height: 400px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  justify-content: space-between;
}

.card-item {
  height: 400px;
  width: 300px;
  border-radius: 8px;
  padding: 32px 22px;
  position: relative;
  transition: all 0.6s;
  overflow: hidden;
  background-color: @bg-blue;
  cursor: default;

  &.active {
    width: 560px;
    padding: 32px;
    background: linear-gradient(180deg, #f7f9ff 25.1%, #ebf2ff) !important;

    .card-background {
      visibility: hidden;
    }

    .title {
      color: #000;
      opacity: 0.9;
    }

    .subtitle {
      color: #000;
    }

    .fade-switch {
      background: url(https://p6-addone.byteimg.com/tos-cn-i-hhc0kcolqq/93848f9….png~tplv-hhc0kcolqq-image-v5:610:q100.image);
      background-repeat: no-repeat;
      background-size: 100%;
    }

    .wrapper {
      opacity: 1;
    }

    .image {
      bottom: 0;
      opacity: 1;
    }

    .banching {
      opacity: 0;
    }
  }
}

.card-background {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(
    90.13deg,
    rgba(38, 102, 219, 0.5) 0.13%,
    rgba(38, 102, 219, 0.9) 99.91%
  );
  z-index: 1;
}

.title {
  font-weight: 600;
  font-size: 28px;
  color: #fff;
  z-index: 10;
  position: relative;
}

.subtitle {
  font-weight: 400;
  font-size: 18px;
  opacity: 0.6;
  margin-top: 4px;
  color: #fff;
  z-index: 10;
  position: relative;
}

.fade-switch {
  width: 272px;
  height: 242px;
  padding-top: 100px;
  position: relative;
  left: 0;
  opacity: 1;
  transition-property: all;
}

.fade-switch-item {
  position: relative;
  transition-property: all;
  left: 0px;
  transition-duration: 500ms;
  transition-delay: 0ms;
  opacity: 1;
  height: 50px;

  .wrapper {
    width: 272px;
    opacity: 0;
  }
  .item-card {
    margin-bottom: 24px;
  }

  .serape {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .spot {
    width: 10px;
    height: 10px;
    background: @bg-blue;
    border-radius: 50%;
    margin-right: 12px;
  }

  .desc {
    color: rgb(0, 0, 0);
    opacity: 0.75;
    font-weight: 400;
    font-size: 18px;
  }
}

.image {
  width: 237px;
  height: 366px;
  position: absolute;
  right: 0;
  bottom: -106px;
  opacity: 0.5;
  transition: all 0.6s;
}

.banching {
  position: absolute;
  left: 20px;
  top: 0;
  width: 100%;
  opacity: 1;
  z-index: 1;
  -webkit-user-drag: none;
}
</style>
