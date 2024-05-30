<template>
  <div class="status-bar">
    <div class="battery">
      <h3>电池电量</h3>
      <Panel :quantity="quantity"></Panel>
    </div>
    <div class="toggle-switch">
      <h3>蓝牙连接</h3>
      <Witch v-model="checked1" :defaultChecked="true" :disabled="false" />
    </div>
    <div class="toggle-switch">
      <h3>智能家居链接</h3>
      <Witch v-model="checked2" :defaultChecked="true" :disabled="false" />
    </div>
    <div class="bulb">
      <h3>Led灯</h3>
      <Witch v-model="checked3" :defaultChecked="true" :disabled="false" />
    </div>

    <div class="servos-container">
      <h3>舵机角度</h3>
      <div class="servos">
        <div v-for="(angle, servo) in servos" :key="servo" class="servo">
          <h5>{{ servo }}</h5>
          <Angle :angle="angle"></Angle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "@/pages/robot/components/Panel.vue";
import Witch from "@/pages/robot/components/Switch.vue";
import Angle from "@/pages/robot/components/Angle.vue";

export default {
  name: "Right",
  components: {
    Panel,
    Witch,
    Angle,
  },
  data() {
    return {
      quantity: 100, //电量
      checked1: false,//开关
      checked2: false,//
      checked3: false,//
      servos: {
        头1: 0,
        头2: 20,
        左臂1: 40,
        左臂2: 60,
        右臂1: 80,
        右臂2: 100,
      },
    };
  },
};
</script>

<style lang="less" scoped>
.status-bar {
  margin-top: 64px;
  width: 230px;
  height: calc(@bg-height -64px);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;

  &>div {
    height: 50px;
  }
}

.battery {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.servos-container {
  width: 100%;
  height: 400px !important;
  display: block;
}

.servos {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}

.servo {
  width: 100px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
