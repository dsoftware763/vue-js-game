<template>
  <div class="header-container">
    <playtron-logo></playtron-logo>
    <div class="btns-wrapper">
      <button class="login-btn" @click="cropWalletAddress ? null : showModal('login')">
        <span>{{ cropWalletAddress || $t('header.login')}}</span>
      </button>
      <div class="dropdown">
        <button class="dropbtn">menu</button>
        <div class="dropdown-content">
          <a href="#">Game 1</a>
          <a href="#">Game 2</a>
          <a href="#">Game 3</a>
        </div>
      </div>
      <div @click="showModal('fairness')" class="modal-btn">fairness</div>
      <div @click="showModal('howto')" class="modal-btn">how to play</div>
      <div @click="showModal('aces')" class="modal-btn">aces</div>
      <div @click="showModal('contact')" class="modal-btn">contact</div>
      <!-- <locale-switcher></locale-switcher> -->
    </div>
  </div>
</template>

<script>
import PlaytronLogo from './playtron-logo';
import LocaleSwitcher from './switch-locale';
import { mapGetters, mapActions } from 'vuex';

let loadWallet = 0;
export default {
  computed: {
    ...mapGetters([
      'walletAddress'
    ]),
    cropWalletAddress() {
      console.log('walletAddress', this.walletAddress)
      if (this.walletAddress) {
        const length = this.walletAddress.length;
        return this.walletAddress.substring(0, 4) + '...' + this.walletAddress.substring(length - 4, length);
      }
      return false;
    }
  },
  watch: {
    async walletAddress(val) {
      if (loadWallet > 0) location.reload();
      if (val) {
        loadWallet++;
        await this.getJackpotContract();
        await this.getBalance();
      }
    }
  },
  components: {
    PlaytronLogo,
    LocaleSwitcher,
  },
  methods: {
    ...mapActions([
      'getBalance',
      'getJackpotContract',
    ]),
    showModal(val) {
      this.$emit('show', val);
    }
  }
};
</script>

<style lang="scss" scoped>

  $header-height: 70px;
  $border-size: 2px;
  $border-color: #5a5c5d;
  $login-btn-color: #ff2c2e;
  $btn-width: 160px;
  $btn-height: 48px;

  .header-container {
    height: $header-height - $border-size;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    background-color: black;
    border-bottom: $border-size solid $border-color;
    opacity: 0.8;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);

    .btns-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 60%;

      .dropdown {
        position: relative;
        display: inline-block;
        min-height: 25px;
        &:hover {
          .dropdown-content {
            display: block;
          }
        }
      }

      .dropbtn {
        color: white;
        opacity: 0.7;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 22px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        border: none;
        &:hover {
          cursor: pointer;
          color: #ff1e44;
        }
      }

      .dropdown-content {
        display: none;
        position: absolute;
        padding: 0px 20px;
        text-align: center;
        border-radius: 10px;
        border: 1.5px solid #ff804a;
        background-image: linear-gradient(#2b2b2b, #181818);
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        min-width: 120px;
        a {
          color: white;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 22px;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          &:hover {
            cursor: pointer;
            color: #ff1e44;
          }
        }
      }

      .login-btn {
        width: $btn-width;
        height: $btn-height;
        border: 2px solid $login-btn-color;

        span {
          text-transform: uppercase;
          color: $login-btn-color;
          font-weight: 600;
          font-size: 17px;
          transition: 0.6s;
        }

        &:hover {
          cursor: pointer;
          background-color: $login-btn-color;

          span {
            color: white;
          }
        }
      }

      .modal-btn {
        color: white;
        opacity: 0.7;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 22px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        &:hover {
          cursor: pointer;
          color: #ff1e44;
        }
      }
    }
  }
</style>
