<template>
  <div class="switcher-container">
    <img :src="getFlag" @click="show = true"/>
    <div :class="{show, 'popup': true}" ref="popup">
      <img src="../../assets/img/Flag_of_the_United_States.png" @click="locale = 'en'"/>
      <img src="../../assets/img/Flag_of_the_People's_Republic_of_China.png" @click="locale = 'ja'"/>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      locale: localStorage.getItem('current-locale') || 'en',
      show: false
    }),
    watch: {
      locale(val) {
        this.$i18n.locale = val;
        localStorage.setItem('current-locale', val);
        this.show = false;
      },
      show(val) {
        if (val) {
          document.addEventListener('click', this.listener, false);
        } else {
          document.removeEventListener('click', this.listener, false);
        }
      }
    },
    methods: {
      listener(e) {
        if (!e.path.includes(this.$refs.popup))
          this.show = false;
      }
    },
    computed: {
      getFlag() {
        switch (this.locale) {
          case 'ja':
            return require('../../assets/img/Flag_of_the_People\'s_Republic_of_China.png');
          case 'en':
          default:
            return require('../../assets/img/Flag_of_the_United_States.png');
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  $switcher-width: 50px;
  $popup-width: 60px;

  .switcher-container {
    width: $switcher-width;
    height: 25px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .popup {
      position: absolute;
      top: 40px;
      left: ($switcher-width - $popup-width) / 2;
      width: $popup-width;
      height: 120px;
      background-color: #2b3132;
      border-radius: 10px;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &.show {
        display: flex !important;
      }
      img {
        margin: 10px 0;
        width: 50px;
        height: 25px;
      }
    }
  }
</style>