<template>
  <div class="main-container">
    <div class="game-wrapper">
      <game-component></game-component>
    </div>
    <tabs-component :tabs="['all games', 'My Tickets']" class="tabs-wrapper">
      <template slot="tab-0">
        <table-component :headers="table.all.headers" :tableData="table.all.data"></table-component>
      </template>
      <template slot="tab-1">
        <table-component :headers="table.my.headers" :tableData="table.my.data"></table-component>
      </template>
    </tabs-component>
  </div>
</template>

<script>
  import TabsComponent from './tabs';
  import GameComponent from '../game';
  import TableComponent from './table';
  import { mapGetters, mapState } from 'vuex';
  import { API_SERVER_ADDRESS } from '../../../config/config';
  import Vue from 'vue';

  export default {
    computed: {
      ...mapGetters([
        'walletAddress',
        // 'myBets',
        // 'allBets'
      ]),
      ...mapState([
        'bets', 'myBets'
      ])
    },
    methods: {
      sortArr(arr) {
        return arr.sort(function (a, b) {
          if (new Date(a.createdAt) < new Date(b.createdAt)) {
            return 1;
          }
          if (new Date(a.createdAt) > new Date(b.createdAt)) {
            return -1;
          }
          return 0;
        });
      },
      getAllUsersTableData(){
        console.log("bets", this.bets)
         console.log("myBets", this.myBets)
        Vue.set(this.table.all, 'data', this.bets);
        Vue.set(this.table.my, 'data', this.myBets);
      },
      // subscribeToNewData() {
      //   const source = new EventSource(`${API_SERVER_ADDRESS}/lottery/subscribe`);

      //   source.addEventListener(
      //     'game_posted',
      //     (e) => {
      //       if (e.data) {
      //         this.getAllUsersTableData(e.data);
      //       }
      //     },
      //     false
      //   );
      // }
    },
    data: () => ({
      table: {
        all: {
          headers: [
            {text: '#block', key: 'block'},
            {text: 'draw numbers', key: 'drawNumbers'},
            {text: '#bets', key: 'bets'},
            {text: 'bets value', key: 'betsValue'},
            {text: 'payouts', key: 'payouts'}
          ],
          data: []
        },
        my: {
          headers: [
            {text: '#block', key: 'block'},
            {text: 'bet value', key: 'betsValue'},
            {text: 'My Lucky Numbers', key: 'myLuckyNumbers'},
            {text: 'Drawn Numbers', key: 'drawNumbers'},
            {text: 'hits', key: 'hits'},
            {text: 'payout', key: 'payouts'}
          ],
          data: []
        },
      }
    }),
    components: {
      TabsComponent,
      GameComponent,
      TableComponent
    },
    watch: {
      walletAddress(val) {
        if (val) {
          this.getAllUsersTableData(val);
        }
      }
    },
    created() {
      this.getAllUsersTableData();
      // this.subscribeToNewData();
    }
  };
</script>

<style lang="scss" scoped>
  .main-container {
    width: 100%;
    height: 100%;
    padding-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .game-wrapper {
      width: 80%;
      display: flex;
      margin-top: 70px;
    }

    .tabs-wrapper {
      margin-top: 20px;
      width: 70%;
      height: auto;
      min-height: 300px;

      .test-tab {
        width: 100%;
        height: 300px;
        font-size: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>