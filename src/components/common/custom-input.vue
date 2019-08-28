<template>
  <div class="input-wrapper">
    <input :type="fieldType" :value="value" @input="updateValue" v-on:change="$emit('check-min')" ref="input"
           :class="{ 'number-input': true, 'input-shadow': withShadow, 'has-trx': trx }" :disabled="disabled"/>
    <img src="../../../src/assets/img/tronlogoWhite.png" v-if="trx" class="trx">
  </div>
</template>

<script>
  export default {
    props: ['trx', 'fieldType', 'withShadow', 'value', 'disabled'],
    methods: {
      updateValue() {
        this.$store.commit('setBalance', this.$refs.input.value);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .input-wrapper {
    position: relative;
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
    .number-input {
      height: calc(100% - 10px);
      text-align: center;
      background-color: rgba(230,101,23, .4);
      color: #fff;
      font-size: 32px;
      padding: 5px;
      border: 1.5px solid #ff804a;
      border-radius: 2px;
      width: 100%;
      width: -moz-available;          /* WebKit-based browsers will ignore this. */
      width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
      box-shadow: inset 0 12px 6px rgba(255, 255, 255, 0.1), inset 0 25px 30px rgba(0, 0, 0, 0.74);
      &.has-trx {
        padding: 5px 50px 5px 10px;
      }
      &.input-shadow {
        box-shadow: inset 0 12px 6px rgba(255, 255, 255, 0.1), inset 0 25px 30px rgba(0, 0, 0, 0.74), 6px 8px 9px #000;
      }
      &:focus {
        outline: none;
      }
    }
    .trx {
      height: 80%;
      position: absolute;
      top: 50%;
      right: 4%;
      transform: translateY(-50%);
    }
  }
</style>