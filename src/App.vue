<template>
  <div id="app">
    <header-component @show="showModal"></header-component>
    <main-component></main-component>
    <modal-wrapper v-show="currentModal" :modal-key="currentModal" @close="closeModal"></modal-wrapper>
  </div>
</template>

<script>
import HeaderComponent from './components/header';
import MainComponent from './components/main';
import ModalWrapper from './components/modals/wrapper';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  data: () => ({
    currentModal: false,
  }),
  methods: {
    ...mapActions([
      'isLogged'
    ]),
    showModal(key) {
      switch (key) {
        case 'howto':
          this.currentModal = 'how-to-play-modal';
          break;
        case 'aces':
          this.currentModal = 'aces-modal';
          break;
        case 'contact':
          this.currentModal = 'contact-modal';
          break;
        case 'fairness':
          this.currentModal = 'fairness-modal';
          break;
        case 'login':
          this.currentModal = 'login-modal';
          break;
        default:
          this.currentModal = 'how-to-play-modal';
      }
    },
    closeModal() {
      this.currentModal = '';
    }
  },
  components: {
    HeaderComponent,
    MainComponent,
    ModalWrapper,
  },
  mounted() {
    this.isLogged();
  }
};
</script>

<style lang="scss" src="./global.scss"></style>
