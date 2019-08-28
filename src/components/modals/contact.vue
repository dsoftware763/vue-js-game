<template>
  <div>
    <h2>JOIN THE PLAYTRON COMMUNITY</h2>
    <div class="email-wrapper">
      <label>Enter your email</label>
      <custom-input :fieldType="'email'" class="input-style" v-model="email"></custom-input>
    </div>
    <custom-button :title="'subscribe'" class="button-style" :onClick="subscribeHandler"></custom-button>
    <div class="social-buttons">
      <a href="#">
        <i class="fab fa-telegram"></i>
      </a>
      <a href="#">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="#">
        <i class="fab fa-reddit"></i>
      </a>
      <a href="#">
        <i class="fas fa-envelope"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import CustomButton from '../common/custom-button';
  import CustomInput from '../common/custom-input';

  export default {
    data: () => ({
      email: ''
    }),
    components: {
      CustomButton,
      CustomInput
    },
    methods: {
      subscribeHandler() {

      }
    }
  };
</script>

<style lang="scss" scoped>
  label {
    font-size: 16px;
    display: inline-block;
    margin-bottom: 6px;
  }
  .button-style {
    width: 120px;
    height: 36px;
  }
  .input-style {
    margin-bottom: 17px;
    display: flex;
    width: 400px;
    height: 30px;
    border-radius: 10px;
  }
  .social-buttons {
    width: 100%;
    letter-spacing: 15px;
    transform: translateX(2%);
    font-size: 2em;
    a {
      color: #fff;
    }
    a:hover {
      color: #ff804a;
    }
  }
</style>