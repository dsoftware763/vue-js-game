<template>
  <div class="button-wrapper" @click="onClick" :class="disabledStatus" :style="style">
    <button :disabled="disabled">{{title}}</button>
  </div>
</template>

<script>
  export default {
    props: ['title', 'onClick', 'disabled', 'width'],
    computed: {
      disabledStatus() {
        return  this.disabled === true ? 'disabled-button' : 'enabled-button';
      },
      style() {
        return 'max-width: ' + this.width
      }
    }
  };
</script>

<style lang="scss" scoped>
  .button-wrapper {
    width: 100%;
    height: 46px;
    padding: 20px 0;
    margin: auto;
    button {
      width: 100%;
      height: 100%;
      font-size: 18px;
      border-radius: 8px;
      text-transform: uppercase;
    }
    &.disabled-button{
      button {
        cursor: default;
        border: 2px solid #7d3b12;
        color: rgba(113, 113, 113, 0.65);
      }
    }
    &.enabled-button {
      button {
        cursor: pointer;
        border: 2px solid #e66517;
        color: #fff;
      }
    }
  }
</style>