<template>
  <!-- 电池电量Icon组件 -->
  <div class="electric-panel" :class="bgClass">
    <div class="panel" :style="{ transform: `rotate(${rotate}deg)` }">
      <div class="remainder" :style="{ width: batteryNum + '%' }" />
    </div>
    <div
      v-show="showText"
      :style="{ marginLeft: (parseFloat(rotate) ? 0 : '10') + 'px' }"
      class="text">
      <!-- 充电中不显示电量百分比 -->
      <template v-if="!proIsCharge">{{ batteryNum }}%</template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "ElectricQuantity",
  myInterval: null,
  props: {
    //更新信号
    num:{
      type: Number,
      default:0,
    },
    // 电池显示的数值
    quantity: {
      type: Number,
      default:0,
    },
    // 是否显示电量百分比
    showText: {
      type: Boolean,
      default: true,
    },
    // 是否展示充电状态
    proIsCharge: {
      type: Boolean,
      default: false,
    },
    // 旋转百分比
    rotate: {
      type: String,
      default: "0",
    }
  },
  data() {
    return {
      batteryNum: this.quantity,
    };
  },
  computed: {
    bgClass() {
      if (this.batteryNum >= 30) {
        return "success";
      } else if (this.batteryNum >= 15) {
        return "warning";
      } else if (this.batteryNum >= 5) {
        return "danger";
      } else {
        return "danger";
      }
    },
  },
  watch:{
    num(newVal,oldVal) {
      console.log('newValp :',newVal,'oldValp :',oldVal)
      this.dataUpdating ();
    }
  },
  mounted() {
    if (this.proIsCharge) {
      this.handeRecharge();
    }
    this.dataUpdating ();
  },
  methods: {
    handeRecharge() {
      const _this = this;
      clearInterval(_this.myInterval);
      this.batteryNum = 0;
      if (_this.proIsCharge) {
        _this.myInterval = setInterval(function () {
          _this.drawCharge();
        }, 600);
      }
    },
    dataUpdating( ) {
      axios({
          url:'/api/outstanding-kid/kid/getAllUsers',
          method:'GET',
        }).then((data) => {
          // console.log(data.data.data);
          const dataStr = data.data.data[data.data.data.length-1]
          this.batteryNum = dataStr.electric
          // console.log(this.batteryNum);
        }).catch((error)=>{
          console.log(error)
        })
      },
    drawCharge() {
      this.batteryNum = this.batteryNum + 5;
      if (this.batteryNum > 100) {
        this.batteryNum = 0;
      }
    },
  },
};
</script>

<style lang="less" scoped>
// custom theme color
@color-primary: #447ced;
@color-success: #13ce66;
@color-warning: #ffba00;
@color-danger: #ff4949;
@color-info: #909399;
@color-white: #fff;

.panel-style(@color) {
  .panel {
    border-color: @color;
    &::before {
      background: @color;
    }
    .remainder {
      background: @color;
    }
  }
  .text {
    color: @color;
  }
}

.electric-panel {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.panel {
  box-sizing: border-box;
  width: 28px;
  height: 15px;
  position: relative;
  border: 1px solid #ccc;
  padding: 1px;
  border-radius: 2px;
  &::before {
    content: "";
    border-radius: 0 1px 1px 0;
    height: 4px;
    background: #ccc;
    width: 2px;
    position: absolute;
    top: 50%;
    right: -4px;
    transform: translateY(-50%);
  }
  .remainder {
    border-radius: 1px;
    position: relative;
    height: 100%;
    width: 0%;
    left: 0;
    top: 0;
    background: #fff;
  }
}

.text {
  text-align: left;
  width: auto;
  font-size: 13px;
}

&.success {
  .panel-style(@color-success);
}

&.warning {
  .panel-style(@color-warning);
}

&.danger {
  .panel-style(@color-danger);
}
</style>
