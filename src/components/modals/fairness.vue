<template>
  <div>
    <h2>FAIRNESS</h2>
    <!-- <custom-input :fieldType="'text'" :defaultValue="''" class="input-style"></custom-input> -->
    <span>
      Why can we claim that our game is fair? Every single game played on the PlayTron Ecosystem runs through a Smart Contract.
      <br><br>
      Once a Smart Contract deploys on the Tron network it is immutable — meaning that it cannot be changed — and cannot ever be influenced by us.
      <br><br>
      Every blochhash that comes from the Tron network can never be guessed. That is why we have a few second delay. This prevents any of the Super Representatives from having an unfair advantage. There is simply no way to guess what the numbers might be.
      <br><br>
      <b>What does PROVABLY FAIR mean?</b>
      <br><br>
      <b>PROVABLY FAIR</b> means that you have complete insight how the resulting number was calculated. In non-provably fair based casino’s you have to take the result on good faith alone and hope that no one is manipulating the numbers in their favor. All of the numbers and math that is used to calculate your result is open to you. We are not able to change any data as everything runs through the Smart Contract and the TRON blockchain! If you want to check your transaction all you have to do is go to <a href="http://tronscan.org">TronScan.org</a> and find your wallet where you can view your transaction.
    </span>
    <!-- <custom-button :title="'submit'" class="button-style" :onClick="submitHandler"></custom-button> -->
  </div>
</template>

<script>
  import CustomButton from '../common/custom-button';
  import CustomInput from '../common/custom-input';

  export default {
    components: {
      CustomButton,
      CustomInput
    },
    methods: {
      submitHandler() {

      }
    }
  };
</script>

<style lang="scss" scoped>
  .button-style {
    width: 90px;
    height: 36px;
  }
  .input-style {
    margin-bottom: 17px;
    display: flex;
    width: 400px;
    height: 30px;
    border-radius: 10px;
  }
</style>