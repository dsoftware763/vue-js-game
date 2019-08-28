<template>
  <div>
    <!-- <h2>ACES TO BE DEPOSITED ON SUNDAY</h2>
    <custom-input :fieldType="'text'" :defaultValue="''" class="input-style"></custom-input> -->
    <span>
      <b>WHAT ARE ACES?</b>
      <br><br>
      ACES are the PlayTron’s native token. Holding ACES tokens in your Tron wallet gives you a 100% lifetime dividend payout from all profits that the PlayTron ecosystem makes. The more ACES you hold the more you get in dividend payouts.
      <br><br><br>
      <b>HOW TO ACCUMULATE ACES</b>
      <br><br>
      There are two very easy ways to earn ACES. The first is to play. Every time you play a game you will earn ACES.
      <br>
      The more you play the more you earn.
      <br>
      The second way is to participate in our ICO. It is very easy. Click <a href="https://tronscan.org/#/token/1001171">here</a> to do that.
      <br><br><br>
      <b>WHEN WILL I GET MY DISTRIBUTION?</b>
      <br><br>
      Every Sunday at 11:59PM PST we will send out your distribution. This will be FOR LIFE. The distribution is based on the percentage of ACES that you own and you will receive that exact percentage of the net profits in TRX.
    </span>
    <custom-button :title="'close'" class="button-style" :onClick="action"></custom-button>
  </div>
</template>

<script>
  import CustomButton from '../common/custom-button';
  import CustomInput from '../common/custom-input';

  export default {
    props: ['action'],
    components: {
      CustomButton,
      CustomInput
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
  span {
    padding-top: 20px
  }
</style>