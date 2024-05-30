<template>
  <div class="top-menu">
    <div class="menu-container" :class="{ 'bg-black': isSticky }">
      <div class="menu">
        <nav>
          <a class="logo" href="/">
            <img src="../assets/svg/robot.svg" alt="" />
          </a>
          <ul class="menu-list" v-if="showMenu">
            <li
              class="menu-item"
              v-for="item in menusList"
              :key="item.id"
              :class="{ active: activeSection === item.id }"
              @click="scrollTo(item.id)"
            >
              {{ item.title }}
            </li>
          </ul>
        </nav>
        <div class="right-container">
          <div class="hover-show">
            <div class="hover-text">APP下载</div>
            <div class="qrcode-container">
              <div class="qrcode">
                <img width="100" height="100" src="../assets/img/walle.png" />
                <div class="qrcode-tip">浏览器下载</div>
              </div>
            </div>
          </div>
          <div v-show="!isLogin" class="sign-in">
            <div class="sign-text" @click="btnClickHandler">立即登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isSticky: false,
      activeSection: "index",
      menusList: [
        { id: "index", title: "首页" },
        { id: "about", title: "产品功能" },
        { id: "scene", title: "产品价值" },
        { id: "terminal", title: "产品终端" },
      ]
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isSticky = window.scrollY > 0;
      this.setActiveSection();
    },
    setActiveSection() {
      // 页面部分的ID列表
      const sections = this.menusList.map((item) => item.id);
      let currentSection = "";

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const scrollPosition = window.scrollY;

          const offsetTop = el.offsetTop - 68;

          if (scrollPosition >= offsetTop) {
            currentSection = section;
          }
        }
      });

      // 更新激活的部分
      this.activeSection = currentSection;
    },
    scrollTo(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const top = element.offsetTop;
        window.scrollTo({
          top: top - 60,
          behavior: "smooth",
        });
      }
    },
    btnClickHandler(){
      this.$router.push('/login')
    }
  },
  computed: {
    showMenu() {
      return this.$route.path.indexOf("/robot") === -1;
    },
    ...mapState(['isLogin'])
  },
  watch: {
    $route(to, from) {},
  },
};
</script>

<style lang="less" scoped>
.top-menu {
  min-width: 1380px;
  width: 100%;
  z-index: 1000;
  position: fixed;
  top: 0;
}

.menu-container {
  background: linear-gradient(to right, #cfdef3, #e0eafc);
  width: 100%;
  height: 64px;
  transition: background 0.5s ease-in-out;

  &:hover {
    background: #222;
  }

  &:hover .menu-item::after {
    background: #007aff;
    transition: background 0.5s ease-in-out;
  }
}

.menu {
  width: 100%;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  color: rgb(255 255 255);
}

nav {
  display: flex;
  align-items: center;
}

.logo img {
  width: 35px;
  margin-top: 5px;
}

.menu-list {
  display: flex;
  margin-left: 144px;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.menu-item {
  line-height: 22px;
  cursor: pointer;
  margin-right: 40px;
  position: relative;

  &.active {
    font-weight: 600;

    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 16px;
    height: 4px;
    background: #ffffff;
    border-radius: 2px;
    transform: translateX(-50%);
    z-index: 100;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
    opacity: 0;
  }
}

.bg-black {
  background: #000;

  .menu-item::after {
    background: #007aff;
    transition: background 0.5s ease-in-out;
  }
}

.right-container {
  display: flex;
  align-items: center;
}

.hover-show {
  position: relative;
  cursor: pointer;

  &:hover .qrcode-container {
    visibility: visible;
  }
}

.hover-text {
  padding-right: 12px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-right: 1rem;
  margin-left: 8px;
  padding-left: 26px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEBSURBVHgB7ZgBDoIwDEWr8SDzKN6Em8gN0BvgydgN8Aa1IBjSsLVxjLCkL1lK2Gibbb8DAIzSQcQ7tR7DdNScwo+bxoYYYjSSkwZ11IqE6mRfGJ+ZmQ63maGZfvnciTnBXwcBGQnFOsPBsIQkLppB0yauII2WtoqXBqk29aAWMg7S8OTyKsXiS+aZzYlndoQv2Q2+S9MG7qfQKmMZUVTVeE+VqVCeSeIZqIlVZmGEPCoz/oIfHQ6mYrVURA6VhWIBS6hbUwRmUFkoFleZYzYnjtmRw6nM3qklLCEJntB7vojJFzf4UFyLuZbQE2Qc6BRXga58vKK9lPwD9/vZUINROh9VsW1GKcSRxwAAAABJRU5ErkJggg==);
  background-size: 18px;
  background-position: 0;
  background-repeat: no-repeat;
}

.qrcode-container {
  position: absolute;
  left: 50%;
  top: 42px;
  transform: translateX(-50%);
  z-index: -1;
  visibility: hidden;
  line-height: 20px;
  transition: all 0.2s, opacity 0.1s;
  text-align: center;
  font-size: 12px;
  padding: 24px 32px;
  background: #fff;
  border-radius: 0 0 4px 4px;
  color: #999;
}

.qrcode-tip {
  color: #333;
  width: 84px;
  margin: 12px auto 0;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
}

.sign-in {
  width: 120px;
  padding: 9px 0;
  display: inline-block;
  text-align: center;
  border-radius: 4px;
  line-height: 22px;
  background: @bg-blue;
  outline: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}
</style>
