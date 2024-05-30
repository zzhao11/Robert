<template>
  <div>
    <Header></Header>
    <FirstScreen></FirstScreen>
    <About></About>
    <Scene></Scene>
    <Terminal></Terminal>
    <Manage></Manage>
  </div>
</template>

<script>
import FirstScreen from "./components/FirstScreen.vue";
import About from "./components/About.vue";
import Scene from "./components/Scene.vue";
import Terminal from "./components/Terminal.vue";
import Manage from "./components/Manage.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Index",
  components: {
    FirstScreen,
    About,
    Scene,
    Terminal,
    Manage,
    Header
  },
};
</script>

<style lang="scss" scoped></style>
