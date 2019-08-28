<template>
  <div class="game-container">
    <div v-show="showModal" class="modal-wrapper">
      <transition name="fade">
        <div class="popup-continer">
          <div v-if="showIntents === 'loading'" class="modal">
            <h2>MAKING BET</h2>
            <i class="fas fa-sync fa-spin fa-2x"></i>
          </div>
          <div v-else-if="showIntents === 'success'" class="modal">
            <h2>Bet Made Successfully</h2>
            <span class="fa-stack fa-2x">
              <i class="far fa-circle fa-stack-2x"></i>
              <i class="fas fa-check fa-stack-1x"></i>
            </span>
            <h2>fetching result</h2>
            <i class="fas fa-sync fa-spin fa-2x"></i>
          </div>
          <div v-else-if="showIntents === 'error'" class="modal">
            <h2>Error While Betting</h2>
            <span class="fa-stack fa-2x">
              <i class="far fa-circle fa-stack-2x"></i>
              <i class="fas fa-exclamation fa-stack-1x"></i>
            </span>
            <div class="button-wrapper">
              <button v-on:click="resetModal">Close</button>
            </div>
          </div>
          <div v-else-if="showIntents === 'won'" class="modal">
            <h2>Congratulations! You've Won</h2>
            <span class="fa-stack fa-2x">
              <i class="far fa-square fa-stack-2x"></i>
              <i class="fas fa-trophy fa-stack-1x"></i>
            </span>
            <div class="button-wrapper">
              <button v-on:click="resetModal">Close</button>
            </div>
          </div>
          <div v-else-if="showIntents === 'lost'" class="modal">
            <h2>Sorry! You did not win</h2>
            <i class="far fa-frown-open fa-2x"></i>
            <div class="button-wrapper">
              <button v-on:click="resetModal">Close</button>
            </div>
          </div>
          <div v-else-if="showDepositStatus === 'open'" class="modal">
            <h2>Confirm Deposit</h2>
            <h4>Confirm your deposit for {{balance}} TRX</h4>
            <div class="button-wrapper">
              <button v-on:click="depositToBalance" class="">Confirm</button>
              <button v-on:click="resetModal">Cancel</button>
            </div>
          </div>
          <div v-else-if="showDepositStatus === 'depositing'" class="modal">
            <h2>Depositing {{balance}} TRX</h2>
            <i class="fas fa-sync fa-spin fa-2x"></i>
          </div>
          <div v-else-if="showDepositStatus === 'deposited'" class="modal">
            <h2>Successfully Deposited {{balance}} TRX</h2>
            <span class="fa-stack fa-2x">
              <i class="far fa-circle fa-stack-2x"></i>
              <i class="fas fa-check fa-stack-1x"></i>
            </span>
            <div class="button-wrapper">
              <button v-on:click="resetModal">Close</button>
            </div>
          </div>
          <div v-else-if="showDepositStatus === 'depositFailure'" class="modal">
            <h2>Error! Deposit of {{balance}} TRX failed</h2>
            <span class="fa-stack fa-2x">
              <i class="far fa-circle fa-stack-2x"></i>
              <i class="fas fa-exclamation fa-stack-1x"></i>
            </span>
            <div class="button-wrapper">
              <button v-on:click="resetModal">Close</button>
            </div>
          </div>
        </div>
      </transition>
      <div class="backdrop"></div>
    </div>
    <div class="left-content">
      <div class="money-input-wrapper">
        <label>trx ticket value</label>
        <div style="display:flex; align-items:center; justify-content: start;">
          <div style="width:20vw">
          <custom-input :trx="true" :fieldType="'number'" :with-shadow="true" v-model="TRXValue" v-on:check-min="checkMinimalValue"></custom-input>
          </div>
          <div class="deposit-button-wrapper">
            <custom-button :title="'Deposit'" :onClick="showDepositModal"></custom-button>
          </div>
        </div>
      </div>
      
      <div class="lucky-inputs-wrapper">
        <label>choose your lucky numbers from 0 to 25</label>
        <div class="lucky-inputs-container" ref="userNumbers">
          <div class="small-field" v-for="(i, index) of 5" :key="index">
            <span class="index">{{i}}</span>
            <input
              type="number" placeholder="_"
              maxlength="1"
              class="number-input"
              v-model="numbers[index]"
              @keyup.up="incrementValue(index, numbers[index])"
              @keyup.down="decrementValue(index, numbers[index])"
            />
            <div class="arrow-wrapper">
              <div class="arrow-up" @click="incrementValue(index, numbers[index])"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
              <div class="arrow-down" @click="decrementValue(index, numbers[index])"><i class="fa fa-angle-down" aria-hidden="true"></i></div>
            </div>
          </div>
          <div class="dice" @click="fillRandomNumbers">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content" ref="winContent">
      <label>your estimated win:</label>
      <div class="win-block" v-for="wins, index in estimatedWins" :key="wins">
        <span>hit # {{5-index}}</span>
        <span>{{wins}} trx</span>
      </div>
    </div>
    <custom-button :title="'Buy Your Ticket Now and Best of Luck!'" :onClick="onRoll" :disabled="buttonStatus" :width="'450px'"></custom-button>
    <div class="bottom-content">
      <div class="balance">
        <label>balance</label>
        <custom-input :trx="true" :fieldType="'number'" :with-shadow="true" v-model="scbalance" :disabled="true"></custom-input>
        <custom-button :title="'Withdraw Balance to Wallet'" :onClick="withdrawSCBalance" :disabled="SCWithdrawButtonStatus"></custom-button>
      </div>
      <div class="aces">
        <!-- <label>Smart Contract Balance</label>
        <custom-input :fieldType="'number'" :with-shadow="true" v-model="scbalance" :disabled="true"></custom-input>
        <custom-button :title="'Withdraw Balance to Wallet'" :onClick="withdrawSCBalance" :disabled="SCWithdrawButtonStatus"></custom-button>  -->
      </div>
      <div class="aces">
        <label>aces</label>
        <custom-input :fieldType="'number'" :with-shadow="true" v-model="aces" :disabled="true"></custom-input>
      </div>
    </div>
  </div>
</template>

<script>
  import CustomButton from '../common/custom-button';
  import CustomInput from '../common/custom-input';
  import { mapState, mapGetters, mapActions } from 'vuex';
  import Vue from 'vue';
import { setTimeout } from 'timers';

  export default {
    components: {
      CustomButton,
      CustomInput
    },
    data: () => ({
      numbers: ['', '', '', '', ''],
      userNumbers: ['', '', '', '', ''],
      randomNumbers: ['', '', '', '', ''],
      rollingStatus: false
    }),
    computed: {
      ...mapState([
        'balance', 'aces', 'scbalance', 'TRXValue', 'estimatedWins', 'accountBalance', 'betStatus', 'depositStatus', 'winningNumbers'
      ]),
      ...mapGetters([
        'walletAddress',
        'getShowModal',
        'getbetStatus',
        'getDepositStatus'
      ]),
      buttonStatus(){
        // console.log("Rolling status: ", this.rollingStatus === false)
        // console.log("Numbers status: ", !this.numbers.includes(''))
        // console.log("Balance status: ", this.scbalance >= this.TRXValue)
        return !(!this.numbers.includes('') && (this.scbalance >= this.TRXValue));

        // return false
      },
      SCWithdrawButtonStatus() {
        return !this.aces > 0;
      },
      ACESWithdrwaButtonStatus() {
        return !this.scbalance > 0;
      },
      despositButtonStatus() {
        return !(this.balance >= this.TRXValue)
      },
      showModal() {
        return this.getShowModal;
      },
      showIntents() {
          return this.betStatus;
      },
      showDepositStatus() {
        return this.depositStatus
      }
    },
    methods: {
      ...mapActions([
        'makeNewBet',
        'depositBalance',
        'withdrawFunds',
        'showModalAction',
        'betStatusAction',
        'depositStatusAction'
      ]),
      withdrawSCBalance() {
        this.withdrawFunds()
      },
      withdrawAcesBalance() {
        alert('button ACES Balance Clicked');
      },
      showDepositModal() {
        this.betStatusAction(null);
        this.showModalAction();
        this.depositStatusAction('open')
      },
      resetModal() {
        this.showModalAction()
        this.betStatusAction(null)
        this.depositStatusAction(null)
        let myLuckyNumbers = [];
        if (this.winningNumbers.length) {
          myLuckyNumbers = this.numbers.filter((item, index)=>{
            return item === this.winningNumbers[index] && item;
          })
        }
        if (myLuckyNumbers.length > 1) {
          let child = this.$refs.winContent.children;
          let childId = child.length - myLuckyNumbers.length;
          child[childId].classList.add('animate-win');
        }
        if (myLuckyNumbers.length > 0) {
          let userNumbers =  this.$refs.userNumbers.children;
          this.randomNumbers.forEach((el, index) => {
            if (el === this.userNumbers[index]) {
              userNumbers[index].children[1].classList.add('animate-win-num');
            }
          });
        }
      },
      depositToBalance() {
        this.depositStatusAction('depositing')
        this.depositBalance()
      },
      onRoll() {
        this.rollingStatus = true;
        this.showModalAction();
        this.betStatusAction('loading')
        this.clearAnimationOnUserNum();
        // let getNumber = setInterval(() => {
        //   this.randomNumbers = this.numbers.map(() => Math.floor(Math.random() * 25));
        //   contract++;
        //   if (contract >= 10) {
        //     this.rollingStatus = false;
        //     clearInterval(getNumber);
        //     let myLuckyNumbers = this.userNumbers.filter((item, index) => {
        //       return item === this.randomNumbers[index] && item;
        //     });
            // Vue.client.post('/lottery/', {
            //   walletAddress: this.walletAddress,
            //   block: 123456,
            //   drawNumbers: this.numbers,
            //   bets: 5,
            //   betsValue: this.value,
            //   payouts: 66,
            //   myLuckyNumbers: myLuckyNumbers,
            //   hits: myLuckyNumbers.length
            // });
            this.makeNewBet(this.numbers);
        //   }
        // }, 80);
      },
      clearAnimationOnUserNum() {
        let elems = document.querySelectorAll('.animate-win-num');
        [].forEach.call(elems, (el) => el.classList.remove('animate-win-num'));
        let elem = document.querySelector('.animate-win');
        elem && elem.classList.remove('animate-win');
      },
      checkMinimalValue () {
        this.value = this.value < 10 ? 10 : this.value;
      },
      fillRandomNumbers () {
        this.clearAnimationOnUserNum();
        let x = 0;
        let getNumber = setInterval(() => {
          this.numbers = this.numbers.map(() => Math.floor(Math.random() * 25));
          x++;
          x >= 10 && clearInterval(getNumber);
        }, 80);
      },
      incrementValue(i, val) {
        this.clearAnimationOnUserNum();
        (val < 25) && (val !== '') ? Vue.set(this.numbers, i, +this.numbers[i] + 1) : Vue.set(this.numbers, i, 0);
      },
      decrementValue(i, val) {
        this.clearAnimationOnUserNum();
        (val > 0) && (val !== '') ? Vue.set(this.numbers, i, +this.numbers[i] - 1) : Vue.set(this.numbers, i, 25);
      },
      calcWin(hit) {
        switch (hit) {
          case 5:
            return this.TRXValue * 500;
          case 4:
            return this.TRXValue * 100;
          case 3:
            return this.TRXValue * 20;
          case 2:
            return this.TRXValue * 2;
          default:
            return this.TRXValue * 0;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @media only screen and (max-width: 1100px) {
    .left-content, .right-content {
      height: auto !important;
      width: 100% !important;
      .money-input-wrapper {
        width: 100% !important;
      }
    }
    .bottom-content {
      .balance {
        width: 30vw !important;
      }
      .aces {
        width: 30vw !important;
      }
    }
  }
  @keyframes highlightWin {
    0%{
      transform: scale(1);
    }
    50%{
      transform: scale(1.3);
      opacity: 1;
      box-shadow: 0 0 20px rgba(255, 1, 11, 0.57);
    }
    100%{
      opacity: 1;
      transform: scale(1);
      background: linear-gradient(to right, rgba(98, 186, 61, 0.99), rgba(72, 139, 54, 0.93));
    }
  }

  @keyframes highlightWinNum {
    to {
      border-color: greenyellow;
      box-shadow: 0 0 20px rgba(173, 255, 47, 0.57);
    }
  }

  .animate-win {
    animation: highlightWin 1.2s ease-out;
    animation-fill-mode: forwards;
  }
  .animate-win-num {
    animation: highlightWinNum 0.8s;
    animation-fill-mode: forwards;
  }
  .game-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    padding: 0 40px 40px;
    box-shadow: 0 0 20px 3px #636363;
    background-color: rgba(26, 26, 26, 0.95);
    border-radius: 10px;
    
    .popup-continer{
      z-index: 101;
      .modal{
        z-index:102;
        .button-wrapper {
          width: 50%;
          height: 46px;
          padding: 20px 0;
          margin: auto;
          display: inline-flex;
          button {
            width: 100%;
            height: 100%;
            font-size: 18px;
            border-radius: 8px;
            text-transform: uppercase;
            margin: 0px 15px;
            border: 2px solid #e66517;
            color: #fff;
            cursor: pointer;
            &:hover{
              &:nth-child(1) {
                background-color: #094909
              }
              &:nth-child(2) {
                background-color: #641308
              }
            }
          }
          
          &.enabled-button {
            button {
              
              border: 2px solid #e66517;
              color: #fff;
            }
          }
        }
      }
    }
    label {
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      margin: 30px 0 16px;
      color: white;
      display: inline-block;
    }


    .left-content {
      width: 65%;
      height: 85%;
      display: flex;
      flex-direction: column;

      .money-input-wrapper {
        display: flex;
        flex-direction: column;
        height: 50%;
        width: 20vw;

        .deposit-button-wrapper {
          margin-left: 1.5vw;

          .button-wrapper {
            padding: 12px 0;
          }
        }
      }

      .lucky-inputs-wrapper {
        display: flex;
        flex-direction: column;
        height: 50%;
        width: 100%;

        .lucky-inputs-container {
          display: flex;
          position: relative;

          .small-field:first-child {
            input {
              border-bottom-left-radius: 10px;
              border-top-left-radius: 10px;
            }
          }
          .small-field:nth-child(5) {
            input {
              border-bottom-right-radius: 10px;
              border-top-right-radius: 10px;
            }
          }

          .dice {
            margin-left: 10px;
            position: relative;
            background-color: white;
            min-width: 24px;
            height: 24px;
            border-radius: 4px;
            background-color: rgba(230, 101, 23, 0.4);
            box-shadow: inset 0 12px 6px rgba(255, 255, 255, 0.1), inset 0 25px 30px rgba(0, 0, 0, 0.74), 6px 8px 9px #000;
            border: 1px solid #ff804a;
            cursor: pointer;

            .dot {
              width: 5px;
              height: 5px;
              position: absolute;
              border-radius: 100px;
              background-color: #ff804a;

              &:nth-child(1) {
                left: 8%;
                bottom: 8%;
              }
              &:nth-child(2) {
                left: calc(50% - 2.5px);
                bottom: calc(50% - 2.5px);
              }
              &:nth-child(3) {
                right: 8%;
                top: 8%;
              }
            }
          }
        }
      }
    }

    .right-content {
      margin-left: 16px;
      width: 33%;
      height: 85%;
      display: flex;
      flex-direction: column;

      .win-block {
        &:nth-child(2) {
          background-color: red;
        }
        &:nth-child(3) {
          opacity: .8;
        }
        &:nth-child(4) {
          opacity: .6;
        }
        &:nth-child(5) {
          opacity: .4;
        }
        &:last-child {
          opacity: .2;
        }
        margin-top: 9px;
        display: flex;
        justify-content: space-between;
        padding: 7px 15px;
        border: 1px solid white;
        border-radius: 5px;

        span {
          color: white;
          text-transform: uppercase;
        }
      }
    }

    .bottom-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      label {
        width: 100%;
        text-align: center;
        margin-top: 0;
      }
      .balance {
        width: 20vw;
      }
      .aces {
        width: 20vw;
      }
    }
  }

  .number-input {
    max-width: -moz-available;
    -moz-appearance: textfield;
    height: 63px;
    text-align: center;
    background-color: rgba(230,101,23, .4);
    color: #fff;
    font-size: 2.2em;
    padding: 5px 17px 5px 5px;
    box-shadow: inset 0 12px 6px rgba(255, 255, 255, 0.1), inset 0 25px 30px rgba(0, 0, 0, 0.74), 6px 8px 9px #000;
    border: 1.5px solid #ff804a;
    border-radius: 2px;
    width: 100%;
    &:focus {
      outline: none;
    }
    &::-webkit-inner-spin-button {
      display: none;
    }
  }
  .small-field {
    align-items: center;
    justify-content: center;
    display: flex;
    width: 120px;
    position: relative;

    input {
      padding-left: 20px;
    }
  }
  .index {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 128, 74, 0.43);
    border-radius: 50%;
    font-weight: bold;
    font-size: 18px;
    position: absolute;
    left: 7px;
    top: calc(50% - 10px);
    width: 20px;
    height: 20px;
    text-align: center;
  }
  .arrow-wrapper {
    .arrow-up {
      position: absolute;
      right: 0;
      top: 20%;
      width: 30%;
      color: #fff;
      font-size: 1.4em;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      text-align: center;
      &:hover {
        background-color: rgba(255, 128, 74, 0.22);
      }
    }
    .arrow-down {
      position: absolute;
      right: 0;
      top: 50%;
      width: 30%;
      color: #fff;
      font-size: 1.4em;
      cursor: pointer;
      user-select: none;
      text-align: center;
      &:hover {
        background-color: rgba(255, 128, 74, 0.22);
      }
    }
  }
</style>