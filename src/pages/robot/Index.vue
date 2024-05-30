<template>
  <div>
    <Header></Header>
    <main>
      <Robot></Robot>
      <Test></Test>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Robot from "./components/Robot.vue";
import Test from "./components/Test.vue";

export default {
  name: "Index",
  components: {
    Robot,
    Header,
    Test,
  },
};
</script>

<style lang="less" scoped>
  main {
    display: flex;
    justify-content: space-between;
    background: #f3f3f3;
  }
</style>
