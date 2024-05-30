<template>
  <div ref="setup_angle" class="setup_angle">
    <div
      class="container"
      :style="{
        transform: 'rotate(' + angle_data + 'deg)',
      }"
    >
      <div class="point"></div>
    </div>
    <div class="content">
      {{ angle_data + "°" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "setup_angle",
  props: {
    angle: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    angle_data() {
      return this.angle;
    },
  },
};
</script>

<style scoped lang="less">
.setup_angle{
    width: 100px;
    height: 100px;
    border: 5px solid #e8454571;
    box-sizing: border-box;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    & .container{
        pointer-events: none;
        height: 100%;
        width: fit-content;
        padding: 5px 0;
        box-sizing: border-box;
        & .point{
            width: 15px;
            height: 15px;
            background-color: #e84545;
            border-radius: 50px;
        }
    }
    & .content{
        position:absolute;
        font-size: 16px;
        color: #5b748e;
        font-weight: bold;
        pointer-events: none;
    }
}
</style>
