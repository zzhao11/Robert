<template>
  <div id="manage">
    <div class="title">管理您的智能桌宠机器人，享受科技生活</div>
    <div class="btn-container">
      <div class="btn" @click="btnClickHandler">
        <div class="text">开启智慧生活</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Manage",
  methods:{
    btnClickHandler(){
      this.$router.push('login')
    }
  }
};
</script>

<style lang="less" scoped>
#manage {
  background: @bg-light;
  height: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin-bottom: 1.5rem;
  padding-top: 5rem;
  font-size: 40px;
  font-weight: 600;
}

.btn-container {
  max-width: 28rem;
  margin: 0 auto;
}

.btn {
  display: inline-block;
  text-align: center;
  border-radius: 4px;
  width: 280px;
  padding: 13px 0;
  line-height: 22px;
  box-sizing: border-box;
  background: @bg-blue;
  background: var(--button_bg, @bg-blue);
  outline: none;
  position: relative;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s;
}

.text {
  position: relative;
  color: #fff;
  font-size: 16px;
}
</style>
