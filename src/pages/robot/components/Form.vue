<template>
  <div class="box">
    <!-- 电量显示 -->
    <div id="main" style="width: 500px; height: 400px;" class="echarts"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'RobotForm',
  props:{
    //更新信号
    num:{
      type: Number,
      default:0,
    },
  },
  data() {
    return {
    };
  },

  mounted() {
    this.getInfo()
  },
  watch:{
    num(newVal,oldVal) {
      console.log('newValpf :',newVal,'oldValpf :',oldVal)
      this.getInfo();
    },
  },
  methods: {
    getInfo() {
       axios({
          url:'/api/outstanding-kid/kid/getAllUsers',
          method:'get'
        }).then((data)=>{
          // console.log(data.data.data);
          const electric = data.data.data.map(item => item.electric)
          const id = data.data.data.map(item => item.id)
          this.ChartView(electric,id)
        }).catch((error)=>{
          console.dir(error);
        })
    },
    ChartView(electric,id) {
       // 获取图表容器 
       const chartContainer = document.getElementById('main');
       // 如果存在之前的实例，则先销毁它
       const existingChart = echarts.getInstanceByDom(chartContainer);
        if (existingChart) {
            existingChart.dispose();
        }
        
      const myChart = echarts.init(document.getElementById('main'))
      const option = {
        title: {
          text:'卓越小子电量显示',
          left:'center',
          textStyle: {
            fontSize:20,
          }
        },
        tooltip: {
          show : true,
          axisPointer: {
          type: 'cross'
        },
        },
    xAxis: {
        data: id,
        show:false   // 不显示x轴
    },
    yAxis: {},
    dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 50,           //x轴的滑块显示  0 - 100%
      end: 100
    },
    {
      type: 'slider',
      show: true,
      yAxisIndex: [0],
      left: '93%',
      start: 0,        // y轴的滑块显示 0 - 100%
      end: 100
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'inside',
      yAxisIndex: [0],
      start: 29,
      end: 36
    }
  ],
    series: [{
        name: '电量',
        type: 'line',
        smooth:true,
        data: electric
    }]
  }
  myChart.setOption(option)
    }
  },
//   // 异步加载数据
// $.get('data.json').done(function (data) {
//     // 填入数据
//     myChart.setOption({
//         xAxis: {
//             data: data.categories
//         },
//         series: [{
//             // 根据名字对应到相应的系列
//             name: '电量',
//             data: data.data
//         }]
//     });
// });

};
</script>
<style lang="less" scoped>

.echarts {
  // background-color: blue;
  position: absolute;
  top:250px;
  left:50%;
}
</style> 