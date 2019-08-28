<template>
  <div>
    <h2>HOW TO PLAY</h2>
    <span>
      First you need to install the TronLink Chrome Extension.  For a tutorial please click <a href="https://support.kiwidex.io/hc/en-us/articles/360021943132-How-to-use-TronLink-TronPay-Chrome-Extension-"> here </a>.Once you are logged into your wallet enter you will be able to start winning!
      <br><br>
      Select the numbers (5) you want to guess from 0 to 25. You can repeat the number as many times as you would like. Click on the Buy Your Ticket Now and then approve the TronLink transaction.
      <br><br><br>
      <b>So how do I win?</b>
      <br><br>
      If any of your numbers match the last 5 numbers of the block hash you win based on the number you got correct. If you have 2 numbers matching then you win 2x! And if you get all 5 numbers matching then you win the progressive jackpot!! YAY!!
      <br><br><br>
      <b>Why is my TRX not deposited directly into my wallet after winning?</b>
      <br><br>
      This is a security measure to prevent hacking and different kinds of attacks. We do this to make sure that your TRX is safe and that our TRX is safe. We do not want someone with malicious intent to be able to access your funds and hijack them.
      <br><br><br>
      <b>So how does this keep it safe?</b>
      <br><br>
      After you are done playing all you have to do is click on the ” Withdraw balance to Wallet”  and your TRX will be transferred immediately to your wallet. No one but you is able to access your funds from the Smart Contract.
      <br><br>
      By doing it this way we are also able to minimize transaction fees so that we can increase our jackpot.
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