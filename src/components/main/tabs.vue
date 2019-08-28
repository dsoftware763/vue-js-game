<template>
  <div>
    <div class="tabs-container">
      <div v-for="(tab, index) of tabs" :key="index" :class="{active: index === selectedTab, 'tab': true}"
           @click="selectTab(index)" :ref="'tab'+index">
        {{tab}}
      </div>
      <span class="slider" ref="slider"></span>
    </div>
    <div v-for="(val, index) of tabs" :key="index" class="tab-content">
      <slot :name="'tab-'+index" v-if="index === selectedTab"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tabs'],
    data: () => ({
      selectedTab: 0
    }),
    methods: {
      selectTab(index) {
        this.selectedTab = index;
        this.$refs.slider.style.width = this.$refs['tab'+index][0].offsetWidth + 'px';
        this.$refs.slider.style.left = this.$refs['tab'+index][0].offsetLeft + 'px';
      },
      handleResize () {
        this.$refs.slider.style.width = this.$refs['tab'+this.selectedTab][0].offsetWidth + 'px';
        this.$refs.slider.style.left = this.$refs['tab'+this.selectedTab][0].offsetLeft + 'px';
      }
    },
    mounted() {
      this.$refs.slider.style.width = this.$refs.tab0[0].offsetWidth + 'px';
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handleResize);
    },
  };
</script>

<style lang="scss" scoped>
  .tabs-container {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;

    .tab {
      text-transform: uppercase;
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 500;
      font-size: 16px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      opacity: 0.7;

      &.active {
        opacity: 1;
      }

      &:hover {
        cursor: pointer;
      }
    }

    .slider {
      height: 2px;
      background-color: #f50057;
      bottom: 0;
      position: absolute;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
  }

  .tab-content {
    color: white;
  }
</style>