<template>
  <div class="status-bar">
    <div class="battery">
      <h3>电池电量</h3>
      <Panel :quantity="electric" :num="num"></Panel>
    </div>
    <div class="toggle-switch">
      <h3>蓝牙连接</h3>
      <Witch v-model="bluetoothStatus" :defaultChecked="true" :disabled="false" />
    </div>
    <div class="toggle-switch">
      <h3>智能家居链接</h3>
      <Witch v-model="homeConnection" :defaultChecked="true" :disabled="false" />
    </div>
    <div class="bulb">
      <h3>Led灯</h3>
      <Witch v-model="oledstatus" :defaultChecked="true" :disabled="false" />
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
import axios from 'axios'

export default {
  name: "Right",
  props:{
    num:{
      type: Number,
      default:0,
    }
  },
  components: {
    Panel,
    Witch,
    Angle,
  },
  data() {
    return {
      electric: 89, //电量
      bluetoothStatus: true,//蓝牙开关 false
      homeConnection: true,// 智能家居链接
      oledstatus: true,//Led灯
      servos: {
        头1: 0,       //头1
        头2: 20,      //头2
        左臂1: 40,    //左臂1
        左臂2: 60,    //左臂2
        右臂1: 80,    //右臂1
        右臂2: 100,   //右臂2
      },
    };
  },
  mounted() {
    this.dataUpdating()
  },
  watch:{
    num(newVal,oldVal) {
      console.log('newVal :',newVal,'oldVal :',oldVal)
      this.dataUpdating()
    }
  },
  methods:{
    // 更新舵机的数据
    updateServo(key, value) {
      // 使用Vue.set来确保响应式更新  
      this.$set(this.servos, key, value);
    },
    updateBoolean(key,value) {
      if (value == 0) {
            this[key] = false
           }
           else {
            this[key] = true
           }
    },
    dataUpdating() {
      axios({
          url:'/api/outstanding-kid/kid/getAllUsers',
          method:'GET',
        }).then((data) => {
          // console.log(data.data.data);
          const dataStr = data.data.data[data.data.data.length-1]
          // 蓝牙开关、智能家居链接、Led灯
          this.updateBoolean('bluetoothStatus',dataStr.bluetoothStatus)
          this.updateBoolean('homeConnection',dataStr.homeConnection)
          this.updateBoolean('oledstatus',dataStr.oledstatus)
          const steeringAngles = [];
          // 遍历对象的所有属性  
          for (var key in dataStr) {  
              // 如果属性名以'steeringAngle'开头  
              if (key.startsWith('steeringAngle')) {  
                  // 将属性值添加到steeringAngles数组中  
                  steeringAngles.push(dataStr[key]);  
              }
          }
          // 现在steeringAngles数组包含了所有steeringAngle的值  
          const Key = ['头1','头2','左臂1','左臂2','右臂1','右臂2']
          for(let i = 0; i < Key.length ; i++){
            // console.log(steeringAngles[i]);
          this.updateServo(Key[i],steeringAngles[i])
          }
        }).catch((error)=>{
          console.log(error)
        })
    }
  }

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
