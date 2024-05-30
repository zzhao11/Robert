<template>
  <div id="login">
    <div class="shell">
      <div class="top">
        <span class="off" @click="toggle">登 入</span>
        <div class="button" @click="toggle">
          <div class="ball" :style="{ left: ballPosition }"></div>
        </div>
        <span class="on" @click="toggle">注 册</span>
      </div>

      <div class="bottom" :style="{ transform: cardTransform }">
        <div class="signIn">
          <h2>Sign in</h2>
          <input type="text" placeholder="Username" v-model="username" />
          <input type="text" placeholder="Password" v-model="password" />
          <button @click="signIn">GO</button>
        </div>
        <div class="signUp">
          <h2>Sign up</h2>
          <input type="text" placeholder="Username" v-model="username" />
          <input type="text" placeholder="Password" v-model="password" />
          <input
            type="text"
            placeholder="Confirm password"
            v-model="confirmPassword"
          />
          <button @click="signUp">GO</button>
        </div>
      </div>
    </div>

    <div class="modal-content" v-if="errorMessage || successMessage" @click="clearErrorMessage">
      <p class="error">{{ errorMessage }}</p>
      <p>{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      index: 0,
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      successMessage:""
    };
  },
  computed: {
    ballPosition() {
      return this.index === 0 ? "0%" : "61%";
    },
    cardTransform() {
      return `rotateY(${this.index * 180}deg)`;
    },
    ...mapState(['isLogin'])
  },
  methods: {
    toggle() {
      this.index = this.index === 0 ? 1 : 0;
      this.clearForm();
    },
    clearForm() {
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
      this.errorMessage = "";
    },
    ...mapMutations({
        login: 'SET_LOGIN' // 将 `this.login()` 映射为 `this.$store.commit('SET_LOGIN')`
    }),
    signIn() {
      if (!this.username || !this.password) {
        this.errorMessage = "用户名或密码不能为空.";
      } else {
        this.errorMessage = "";
        this.successMessage = "登陆成功，1s后跳转至管理页";
        this.login(true)
        setTimeout(() => {
            this.$router.push('/robot');
        },1000)  
      }
    },
    signUp() {
      if (!this.username || !this.password || !this.confirmPassword) {
        this.errorMessage = "用户名，密码或重复密码不能为空.";
      } else if (this.password !== this.confirmPassword) {
        this.errorMessage = "重复输入的密码不正确.";
      } else {
        this.errorMessage = "";
        this.successMessage = "注册成功，1s后跳转至管理页";
        this.login(true)
        setTimeout(() => {
            this.$router.push('/robot');
        },1000)  
      }
    },
    clearErrorMessage() {
      this.errorMessage = "";
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  height: @bg-height;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(31, 32, 41);
}

.shell {
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  perspective: 1000px;
  /* 给最外层加上一个透视，否则接下去的翻转会没有3d的效果 */
}

.top {
  width: 300px;
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
  margin-bottom: 50px;
}

.off,
.on {
  color: #fff;
  transition: 0.5s;
  font: 300 20px "";
}
.on {
  opacity: 0.5;
}
.button {
  width: 60px;
  height: 25px;
  background-color: rgb(255, 235, 167);
  border-radius: 20px;
  position: relative;
}

.ball {
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: rgb(46, 45, 56);
  border-radius: 50%;
  transition: 0.5s;
  box-shadow: 0 0 10px #000;
  left: 0;
  transform: translate(-1px);
}

.bottom {
  width: 400px;
  height: 350px;
  background-image: url(@/assets/img/background.png);
  transform-style: preserve-3d;
  /* 使元素呈现出3D效果 */
  position: relative;
  transition: 0.7s;
  border-radius: 5px;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    & h2 {
      color: white;
    }

    & input {
      width: 200px;
      height: 25px;
      padding: 0 10px;
      background-color: rgb(31, 32, 41);
      color: #fff;
    }

    & button {
      width: 80px;
      height: 30px;
      color: #333;
      font-size: 15px;
      background-color: rgb(255, 235, 167);
      border-radius: 4px;
      transition: 0.3s;
      margin-bottom: 10px;
      cursor: pointer;
      box-shadow: 0 0 10px rgb(255, 235, 167);
    }
  }
}

.signIn {
  transform: translateZ(70px);
  /* 卡片里面内容和卡片有一个距离，这样子会更有立体感 */
}

.signUp {
  position: absolute;
  top: 0;
  transform: translateZ(-70px) rotateY(180deg);
  /* 我们给反面加上距离的时候，前往不要忘记给反面的内容也翻转一下 */
}

.modal-content {
  position: fixed;
  left: 20px;
  top: 20px;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.error {
    color: red;
}
</style>
