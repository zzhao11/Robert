<template>
  <div id="scene">
    <div class="shell">
      <div class="img-container" v-for="item in sceneList" :key="item.id">
        <img :src="require(`@/assets/img/${item.id}.png`)" />
        <span>{{ item.title }}</span>
        <div class="img-description">{{ item.des }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scene",
  data() {
    return {
      sceneList: [
        {
          id: "family",
          title: "家庭娱乐",
          des: "作为桌面娱乐机器人，卓越小子可以为家庭成员提供互动娱乐，如播放音乐、玩游戏、讲故事，甚至跳舞，增加家庭乐趣。",
        },
        {
          id: "control",
          title: "生活助手",
          des: "卓越小子可以通过手势识别和语音控制，帮助用户控制家中的智能设备，如开关灯、调节空调等，提高生活便利性",
        },
        {
          id: "safe",
          title: "安全防护",
          des: "卓越小子的人脸识别功能可以用于家庭安全防护，识别家庭成员和访客，防止未授权的入侵",
        },
        {
          id: "study",
          title: "教育辅助",
          des: "卓越小子可以作为教育辅助工具，通过语音识别和智能对话，帮助儿童学习语言、数学等基础知识",
        },
        {
          id: "view",
          title: "远程监控",
          des: "用户可以通过网页端远程查看卓越小子的状态，包括电量、外设工作状态等，实现对家中环境的远程监控和管理",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
#scene {
  display: flex;
  justify-content: center;
  align-items: center;
  height: @bg-height;
  background: @bg-light;
}

.shell {
  width: 90%;
  height: 700px;
  display: flex;
}

.img-container {
  flex: 1;
  overflow: hidden;
  transition: 0.5s;
  margin: 0 20px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  border: 10px solid #fff;
  background-color: #fff;
  position: relative;

  & > img {
    width: 200%;
    height: 85%;
    object-fit: cover;
    transition: 0.5s;
  }

  & > span {
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    flex-basis: 40%;
  }
  &:hover > img {
    width: 100%;
    height: 100%;
  }

  &:hover .img-description {
    visibility: visible;
    opacity: 1;
  }
}

.img-description {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 16px;
  padding: 15px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s, opacity 0.5s ease-in-out;
}
</style>
