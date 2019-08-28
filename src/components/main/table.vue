<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th v-for="(header, index) of headers" :key="index">
          {{header.text}}
        </th>
      </tr>
      </thead>
      <tbody ref="tableBody">
        <tr v-for="(item, index) of tableData" :key="index">
          <td v-for="(h, index) of headers" :key="index" :class="(item.myLuckyNumbers === undefined) ? null : winLooseClass(h.key, item.myLuckyNumbers.length)">
            {{parseNumbers(item[h.key], h.key)}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  function catchAnimationEnd() {
    let elem = this.$refs.tableBody.children[0];
    elem.classList.remove('animate-first');
    elem.removeEventListener('animationend', this.animationEndHandler);
  }

  export default {
    
    props: ['headers', 'tableData'],
    watch: {
      tableData(val, oldVal) {
        if ((JSON.stringify(val) !== JSON.stringify(oldVal)) && (oldVal.length > 0)) {
          let child = this.$refs.tableBody.children[0];
          if (child && oldVal.length > 0) {
            child.addEventListener('animationend', this.animationEndHandler, false);
            child.classList.add('animate-first');
          }
        }
      }
    },
    mounted(){
      this.animationEndHandler = catchAnimationEnd.bind(this);
      console.log("Table data", this.tableData)
    },
    methods: {
      winLooseClass(field, luckyNumbersLength) {
        console.log('luckyNumbersLength',luckyNumbersLength);
        return {
          'payout-loose': (field === 'payouts') && (luckyNumbersLength < 2),
          'payout-win': (field === 'payouts') && (luckyNumbersLength > 1)
        };
      },
      animationEndHandler: catchAnimationEnd.bind(this),
      parseNumbers(value, field) {
        switch (field) {
          case 'payouts':
          case 'betsValue':
            return value+' trx';
          case 'hits':
            return value+' / 5';
          case 'drawNumbers':
          case 'myLuckyNumbers':
            return value.reduce((acc, number, index) => {
              acc += +number;
              if (index !== value.length -1) acc += ' , ';
              return acc;
            }, '');
          default:
            return value;
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .payout-loose {
    color: #FF0000;
  }
  .payout-win {
    color: #65EB30;
  }
  @keyframes firstRowAnim {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  .animate-first {
    animation: firstRowAnim 2s ease-out;
  }
  .table-container {
    table {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      border-collapse: collapse;

      thead {
        font-size: 18px;
        font-weight: 600;

        border-top: 3px solid #bfbfbf;
        border-bottom: solid 3px rgba(186, 197, 190, 0.2);
        tr {
          th {
            color: #fff;
            padding: 10px;
            text-transform: uppercase;
          }
        }
      }

      tbody {
        tr {
          td {
            text-transform: uppercase;
            padding: 10px;
            text-align: center;
          }
        }
      }
    }
  }
</style>