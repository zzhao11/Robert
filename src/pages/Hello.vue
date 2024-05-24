<template>
  <main>
    <Header></Header>
  </main>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Hello",
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
