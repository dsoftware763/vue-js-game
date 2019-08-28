import Vue from 'vue';
import Vuex from 'vuex';
import { tronWeb, windowObj, sleep, stripHexPrefix } from '../services/tronService';
import createLogger from 'vuex/dist/logger';
import { SC_CONTRACT_ADDRESS } from '../config/config';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    balance: 0,
    aces: 0,
    scbalance: 0,
    accountBalance: 0,
    tronExtObj: false,
    JackpotContractNew: null,
    TRXValue: 0,
    user: null,
    owner: null,
    TokenID: null,
    bets: [],
    myBets: [],
    payouts: {},
    blocksToPull: [],
    winningNumbers: [],
    estimatedWins : [],
    showModal: false,
    betStatus: null,
    depositStatus: null
  },
  getters: {
    walletAddress(state) {
      if (state.tronExtObj) {
        return state.tronExtObj.defaultAddress.base58;
      }
      return false;
    },
    allBets(state) {
      if (state.bets) {
        return state.bets;
      }
      return "false";
    },
    myBets(state) {
      if(state.myBets) {
        return state.myBets;
      }
      return "false";
    },
    getShowModal(state) {
      return state.showModal;
    },
    getbetStatus(state) {
      return state.betStatus;
    },
    getDepositStatus(state) {
      return state.depositStatus;
    }
  },
  mutations: {
    setTronExtObj(state, payload) {
      state.tronExtObj = payload;
    },
    setBalance(state, payload) {
      state.balance = payload;
    },
    setACESBalance(state, payload) {
      state.aces = payload;
    },
    setSCBalance(state, payload){
      state.scbalance = payload;
    },
    setUserBalance(state, payload) {
      state.accountBalance = payload
    },
    setJackpotContract(state, payload){
      state.JackpotContractNew = payload;
    },
    setTokenId(state, payload) {
      state.TokenID = payload;
    },
    setTRXValue(state, payload) {
      state.TRXValue = payload;
    },
    setEstimatedWins(state, payload) {
      state.estimatedWins = payload;
    },
    setMyBets(state, payload) {
      state.myBets = payload;
    },
    setAllBets(state, payload) {
      state.bets = payload;
    },
    setBlocksToPull(state, payload) {
      state.blocksToPull.unshift(payload);
    },
    setShowModal(state){
      state.showModal = !state.showModal;
    },
    setbetStatus(state, payload) {
      state.betStatus = payload
    },
    setDepositStatus(state, payload) {
      state.depositStatus = payload
    },
    setWinningNumbers(state, payload) {
      state.winningNumbers = payload
    }
  },
  actions: {
    showModalAction({commit}) {
      commit('setShowModal')
    },
    betStatusAction({commit}, payload) {
      commit('setbetStatus', payload)
    },
    depositStatusAction({commit}, payload) {
      commit('setDepositStatus', payload)
    },
    isLogged({commit}) {
      const interval = setInterval(() => {
        let tronExt = windowObj.tronWeb;
        if (tronExt && tronExt.ready) {
          commit('setTronExtObj', tronExt);
          clearInterval(interval);
        } else {
          commit('setTronExtObj', false);
        }
      }, 1000);
    },
    async getBalance({commit}) {
      if (this.state.tronExtObj) {
        let balance = await this.state.JackpotContractNew.getCurrentBalance(this.state.tronExtObj.defaultAddress.hex).call();
        commit('setSCBalance', this.state.tronExtObj.fromSun(balance.toString()));
      }
    },
    async getJackpotContract({commit, dispatch}) {
        let JackpotContractNew = await this.state.tronExtObj.contract().at(SC_CONTRACT_ADDRESS);
        console.log('Jackpot Contract: ', JackpotContractNew);
        console.log('TRON Object', this.state.tronExtObj);
        if(JackpotContractNew != null){
          commit('setJackpotContract', JackpotContractNew);
          dispatch('getTRXValue');
          dispatch('getTokenId');
          dispatch('getEstimatedWins');
          dispatch('getACESBalance');
          dispatch('getLastHundredBetsAndBlocks');
          dispatch('listenForNewBets');
          dispatch('listenForNewBlockHashes');
          dispatch('listenForDeposits');
          dispatch('listenForWithdraw');
        }
        else {
          commit('setJackpotContract', null);
        }
    },
    async getTokenId({commit}) {
      let tokenId = (await this.state.JackpotContractNew.acesTokenId().call()).toNumber();
      console.log('setTokenId', tokenId);
      commit('setTokenId', tokenId);
    },
    async getTRXValue({commit}) {
      let TRXValue = this.state.tronExtObj.fromSun((await this.state.JackpotContractNew.betPrice().call()).toString());
      TRXValue = parseInt(TRXValue, 10);
      if(TRXValue != null){
        commit('setTRXValue', TRXValue);
        commit('setBalance', TRXValue);
      }
      else
        commit('setTRXValue', 0);
    },
    async getACESBalance({commit, dispatch}) {
      if (this.state.tronExtObj && this.state.TokenID) {
        let acc = await this.state.tronExtObj.trx.getAccount(this.state.tronExtObj.defaultAddress.base58);
        for (var i = 0; i < acc.assetV2.length; i++) {
          if (parseInt(acc.assetV2[i].key) == this.state.TokenID) {
            commit('setACESBalance', this.state.tronExtObj.fromSun(acc.assetV2[i].value));
            break;
          }
        }
      } else {
        await sleep(1000)
        dispatch('getACESBalance');
      }
    },
    //depositing the balance
    async depositBalance({commit, dispatch}) {
      //We add balance to state.balance that to be added to the state.scbalance, state.scbalance is shown in the 'Balance' tab
      let depositAmount = 0;
      depositAmount = this.state.tronExtObj.toSun(this.state.balance);
      this.state.JackpotContractNew.deposit().send({
        callValue: depositAmount
      }).then(() => {
          dispatch('depositStatusAction', 'deposited');
      }).catch(() => {
        dispatch('depositStatusAction', 'depositFailure');
      })
    },
    //Loading the current wins amount from SC
    async getEstimatedWins({commit}) {
      let estimatedWins = [];
      for (var i = 1; i <= 5; i++) {
        let estimatedWin = await this.state.JackpotContractNew._calculatePrize(i, true).call();
        estimatedWins.push(this.state.tronExtObj.fromSun(estimatedWin.toString()));
      }
      commit('setEstimatedWins', estimatedWins.reverse());
    },
    //making a bet
    async makeNewBet({commit, dispatch}, payload) {
      try {
        let numbersHex = '';
        for (var i = 0; i < payload.length; i++) {
          let n = stripHexPrefix(this.state.tronExtObj.toHex(payload[i]));
          if (n.length == 1) n = "0" + n;
          numbersHex += n;
        }
        numbersHex = "0x" + numbersHex;
        console.log(numbersHex);
        this.state.JackpotContractNew.newBet(numbersHex).send().then((txHash)=>{
          dispatch('getBalance');
          dispatch('betStatusAction', "success");
          commit('setBlocksToPull', txHash);
        }).catch(()=>{
          dispatch('betStatusAction', "error");
        });
      }
      catch {
        dispatch('betStatusAction', "error");
      }
    },
    async withdrawFunds({commit}) {
      let balance = this.state.scbalance;
      let txHash = await this.state.JackpotContractNew.withdraw().send();
      console.log(txHash);
    },
    async getLastHundredBetsAndBlocks({commit, dispatch}) {
      let size = 100;
      let pastBets = await tronWeb.getEventResult(this.state.tronExtObj.address.fromHex(this.state.JackpotContractNew.address), {
        eventName:'NewBet',
        size: size,
      })
      pastBets.reverse()
      console.log("pastBets", pastBets);
      for (var i = 0; i < pastBets.length; i++) {
        dispatch('processNewBetEvent', pastBets[i]);
      }

      let pastBlocks = await tronWeb.getEventResult(this.state.tronExtObj.address.fromHex(this.state.JackpotContractNew.address), {
        eventName:'BlockHashAdded',
        size: size
      })
      pastBlocks.reverse()
      console.log("pastBlocks", pastBlocks);
      for (var i = 0; i < pastBlocks.length; i++) {
        dispatch('processNewBlockHashes', pastBlocks[i]);
      }

      // let prizes = await tronWeb.getEventResult(this.state.tronExtObj.address.fromHex(this.state.JackpotContractNew.address), {
      //   eventName:'PrizePaid',
      //   size: size,
      // })
      // console.log("##### prizes", prizes)
      // for (var i = 0; i < prizes.length; i++) {
      //   let betsIndexForPrize = bets.findIndex((bet)=>bet.block === prizes[i].result.blockNumber)
      //   if (betsIndexForPrize !== -1) {
      //     let payout = this.state.tronExtObj.fromSun(prizes[i].result.prize);
      //     bets[betsIndexForPrize].payouts += parseInt(payout);
      //   }
      // }
    },
    //Listen for new bets
    async processNewBlockHashes({commit, dispatch}, event) {
      let {bets, myBets} = this.state
      console.log("bets", bets, "myBets", myBets)
      console.log("ListenForNewBlockHashes: ", event)
      let luckyNumbers = [];
      let winningNumbers = await this.state.JackpotContractNew.getWinningNumbers("0x" + event.result.blockHash).call();
      winningNumbers = winningNumbers.slice(2);

      for (var i = 0; i < winningNumbers.length; i = i + 2) {
        let num = "0x" + winningNumbers.slice(i, i + 2);
        luckyNumbers.push(this.state.tronExtObj.toDecimal(num));
      }
      let betsIndex = bets.findIndex((bet)=>bet.block === event.result.blockNumber)
      if (betsIndex !== -1) {
        bets[betsIndex].drawNumbers = luckyNumbers;
      }
      
      let hits = await this.state.JackpotContractNew.betResult(this.state.tronExtObj.defaultAddress.hex, event.result.blockNumber).call()


      let payout = this.state.tronExtObj.fromSun((await this.state.JackpotContractNew._calculatePrize(hits, true).call()).toString());
      bets[betsIndex].payouts += parseInt(payout);

      let myBetsIndex = myBets.findIndex((bet)=>bet.block === event.result.blockNumber)
      if (myBetsIndex !== -1) {
        myBets[myBetsIndex].drawNumbers = luckyNumbers
        myBets[myBetsIndex].hits = hits;
        myBets[myBetsIndex].payouts = payout;
      }

      commit('setAllBets', bets);
      commit('setMyBets', myBets);
      commit('setWinningNumbers', luckyNumbers);
      console.log("HITS: ", hits)
      if(payout>0)
        dispatch('betStatusAction', 'won')
      else
        dispatch('betStatusAction', 'lost')
      dispatch('getBalance');
      // dispatch('betStatusAction', null)
    },
    async listenForNewBlockHashes({commit, dispatch}) {
      let watcher = await this.state.JackpotContractNew.BlockHashAdded().watch(async (err, event) => {
        if(event) {
          dispatch('processNewBlockHashes', event)
        } else {
          console.log(err);
        }
      });
    },
    async processNewBetEvent({commit, dispatch}, event) {
      let { bets, myBets, blocksToPull } = this.state;
      console.log("ListenForNewBets: ", event)
      let betPrice = parseInt(this.state.tronExtObj.fromSun(event.result.betPrice));
      let myLuckyNumbers = [];
      for (var i = 0; i < 10; i = i + 2) {
        let num = "0x" + event.result.numbers.slice(i, i + 2)
        myLuckyNumbers.push(this.state.tronExtObj.toDecimal(num));
      }
      console.log("myLuckyNumbers", myLuckyNumbers)

      let winNumbers = [];
      let hits = 'pending'
      let payout = 0;
      
      let betsIndex = bets.findIndex((bet)=>bet.block === event.result.blockNumber)

      if(betsIndex === -1){
        bets.unshift({
          block: event.result.blockNumber,
          drawNumbers: winNumbers,
          bets: 1,
          betsValue: betPrice,
          payouts: payout
        })
      } else {
        bets[betsIndex].bets += 1;
        bets[betsIndex].betsValue += betPrice;
        bets[betsIndex].payouts = payout;
        bets[betsIndex].drawNumbers = winNumbers;
      }

      console.log("bets", bets)
      if (this.state.tronExtObj.address.fromHex(event.result.sender) == this.state.tronExtObj.defaultAddress.base58) {
        let myBetsIndex = myBets.findIndex((bet)=>bet.block === event.result.blockNumber)
      
        if(myBetsIndex === -1){
          myBets.unshift({
            block: event.result.blockNumber,
            drawNumbers: winNumbers,
            hits: hits,
            betsValue: betPrice,
            payouts: payout,
            myLuckyNumbers: myLuckyNumbers
          })
        } else {
          myBets[myBetsIndex].hits = hits;
          myBets[myBetsIndex].betsValue = betPrice;
          myBets[myBetsIndex].payouts = payout;
          myBets[myBetsIndex].drawNumbers = winNumbers;
          myBets[myBetsIndex].myLuckyNumbers = myLuckyNumbers;
        }
      }
      
      
      commit('setMyBets', myBets);
      commit('setAllBets', bets);
      
      commit('setBlocksToPull', blocksToPull);
      if (event.result.sender == this.state.tronExtObj.defaultAddress.hex) {
        dispatch('getBalance');
        // wait a block
        await sleep(3500)
        dispatch('getACESBalance');
      }
      console.log(bets)
    },
    async listenForNewBets({commit, dispatch}) {
      let newBets = [], newMyBets = [];
      let watcher = await this.state.JackpotContractNew.NewBet().watch(async (err, event) => {
        if(event) {
          dispatch('processNewBetEvent', event);
        } else {
          console.log(err);
        }
      })
    },
    async listenForDeposits({commit, dispatch}) {
      let watcher = await this.state.JackpotContractNew.Deposit().watch((err, event) => {
        if(event) {
          if (this.state.tronExtObj.defaultAddress.hex == event.result.sender) {
            dispatch('getBalance');
          }
        } else {
          console.log(err);
        }
      })
    },
    async listenForWithdraw({commit, dispatch}) {
      let watcher = await this.state.JackpotContractNew.Withdraw().watch((err, event) => {
        if(event) {
          console.log(event)
          if (this.state.tronExtObj.defaultAddress.hex == event.result.sender) {
            dispatch('getBalance');
          }
        } else {
          console.log(err);
        }
      })
    },
  }
});
