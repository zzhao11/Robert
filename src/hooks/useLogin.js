import Vue from "vue";

function useLogin() {
  let isLogin = Vue.observable({ value: false });
  const changeLoginHandler = () => {
    isLogin.value = true
  }

  return () => {
    return [isLogin, changeLoginHandler];
  }
}

export default { useLogin: useLogin() };
