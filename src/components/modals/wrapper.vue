<template>
  <div class="modal-wrapper">
    <transition name="fade">
      <component class="modal" :is="modal" v-if="modal" :action="close"></component>
    </transition>
    <div class="backdrop" @click="close"></div>
  </div>
</template>

<script>
  import HowToPlayModal from './how-to-play';
  import FairnessModal from './fairness';
  import ContactModal from './contact';
  import AcesModal from './aces';
  import LoginModal from './login';

  export default {
    props: ['modalKey'],
    components: {
      HowToPlayModal,
      FairnessModal,
      ContactModal,
      AcesModal,
      LoginModal

    },
    data: () => ({
      modal: false
    }),
    methods: {
      close() {
        this.modal = '';
        setTimeout(() => this.$emit('close'), 200);
      }
    },
    watch: {
      modalKey: {
        immediate: true,
        handler: function(val) {
          this.modal = val;
        }
      },
    }
  };
</script>

<style lang="scss">
  .fade-enter-active.modal {
    animation: slideIn 300ms;
  }
  .fade-leave-active.modal {
    animation: slideOut 300ms;
  }
  @keyframes slideIn {
    0% {
      transform: translateY(100vh);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }

  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation-fill-mode: backwards;

    .modal {
      z-index: 101;
      padding: 20px;
      text-align: center;
      border-radius: 10px;
      border: 1.5px solid #ff804a;
      width: 500px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background-image: linear-gradient(#2b2b2b, #181818);
      top: 100%;
      left: calc(50% - 250px);
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      color: #fff;
      overflow: auto;
      max-height: 500px;
      &.opened {
        top: 50%;
      }
      h2 {
        font-weight: 500;
        margin-top: 0;
        text-transform: uppercase;
      }
    }

    .backdrop {
      position: absolute;
      background-color: black;
      opacity: 0.4;
      width: 100%;
      height: 100%;
      z-index: 100;
    }
  }

  @-webkit-keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInUp {
    -webkit-animation-name: slideInUp;
    animation-name: slideInUp;
  }
</style>