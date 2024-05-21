<template>
  <div>
    <RobotModel :action="action"></RobotModel>
    <button @click="stateChangeHandler">WalkJump</button>
    <button @click="actionChangeHandler">Jump</button>
  </div>
</template>

<script>
import RobotModel from './components/Robot'

export default {
  components: {
    RobotModel
  },
  data() {
    return {
      // ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing', 'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']
      action: 'Idle'
    }
  },
  methods: {
    stateChangeHandler() {
      this.action = 'WalkJump'
    },
    actionChangeHandler() {
      this.action = 'Jump'
    },
  }

}
</script>

<style scoped></style>