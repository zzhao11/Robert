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
import Header from "@/components/Header.vue";
import FirstScreen from "./components/FirstScreen.vue";
import About from "./components/About.vue";
import Scene from './components/Scene.vue'
import Terminal from './components/Terminal.vue'
import Manage from './components/Manage.vue'
 
export default {
  name: "Index",
  components: {
    FirstScreen,
    Header,
    About,
    Scene,
    Terminal,
    Manage
  },
};
</script>

<style lang="scss" scoped></style>
