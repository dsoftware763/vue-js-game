<template>
  <div>
    <h2>PLEASE LOG INTO YOUR TRONLINK CHROME EXTENSION WALLET</h2>
    <span>
      If you have not downloaded the wallet, please visit Chrome Web store
      and download the Chrome extensions, then login through this.
    </span>
    <custom-button :title="'close'" class="button-style" :onClick="action"></custom-button>
  </div>
</template>

<script>
  import CustomButton from '../common/custom-button';
  export default {
    props: ['action'],
    components: {
      CustomButton
    }
  };
</script>

<style lang="scss" scoped>
  .button-style {
    width: 90px;
    height: 36px;
  }
</style>