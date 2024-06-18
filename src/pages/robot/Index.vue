<template>
  <div>
    <Header></Header>
    <main>
      <Robot></Robot>
      <Test :num ="num"></Test>
    </main>
    <Form class="form"  :num ="num"></Form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Robot from "./components/Robot.vue";
import Test from "./components/Test.vue";
import Form from './components/Form.vue'
export default {
  name: "Index",
  components: {
    Robot,
    Header,
    Test,
    Form
  },
  data() {
    return {
      num:0
    }
  },
  mounted(){
        // websocket 更新
    this.setupWebSocket();
  },
  methods: {
    setupWebSocket() {
      this.ws = new WebSocket(`ws://150.158.48.194:8088/outstanding-kid/ws/${999}`);
      console.log(this.ws);
      this.ws.addEventListener('open', this.openHandle);
      this.ws.addEventListener('message', this.messageHandle);
      this.ws.addEventListener('close', this.closeHandle);
      this.ws.addEventListener('error', this.errorHandle);
    },
    openHandle() {
      console.log('WebSocket连接成功！！！！');
    },
    closeHandle() {
      console.log('WebSocket关闭！！！！');
      if (!this.isHandle) {
        this.restart();
      }
      this.isHandle = false;
    },
    // 收到消息更新数据
    messageHandle(data) {
      console.log('前端接收到消息！！！！',data);
      // 使组件重新加载
      // this.$forceUpdate()
      this.num =this.num + 1
    },
    errorHandle() {
      console.log('WebSocket出错了！！！！');
      console.log('error');
    },
    sendMessage() {
      console.log('我发送了消息');
      // this.ws.send('请传数据给我！'+input);
    },
    closeWs() {
      this.ws.close();
    },
    restart() {
      console.log('客户端与服务器连接失败，准备重连');
      this.timer = setInterval(() => {
        console.log('重连中...');
        this.ws = new WebSocket(`ws://150.158.48.194:8088/outstanding-kid/ws/${999}`);
        if (this.ws.readyState === 1) {
          clearInterval(this.timer);
          this.timer = null;
          this.ws.addEventListener('open', this.openHandle);
          this.ws.addEventListener('close', this.closeHandle);
          this.ws.addEventListener('message', this.messageHandle);
          this.ws.addEventListener('error', this.errorHandle);
          console.log('重连成功');
        }
      }, 1000);
    },
  }
};
</script>

<style lang="less" scoped>
  main {
    display: flex;
    justify-content: space-between;
    // background: #f3f3f3;
    background: #ffffff;

  }
</style>
