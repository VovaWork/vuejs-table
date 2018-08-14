<template lang="pug">

  section.live-search

    .input-field.col.s6
      input#search.validate(type="text")
      label(for="search") Type Name ...

    h3 Итого: {{ currencySum }}

    table.data-table
      thead
        tr
          th ID
          th(ref='th') Name
          th(ref='th') Location
          th(ref='th') Currency
      tbody
        tr(v-for='testItem in test')
          td(ref='td' 
             class='data-table__td') {{ testItem.id }}
          td(ref='td' 
             class='data-table__td') {{ testItem.name }}
          td(ref='td' 
             class='data-table__td') {{ testItem.location }}
          td(ref='td' 
             class='data-table__td') 
            span(ref='span') {{ testItem.currency }}
            input(ref='editSpan'
                  class='data-table__td-edit' 
                  type='text' 
                  v-model='testItem.currency')
            button(type='button'
                   @click='editTable($event)' 
                   class='data-table__edit-btn waves-effect waves-light btn') Edit Currency
            router-link(to='/rowdetails')
              button(type='button'
                     class='data-table__row-details waves-effect waves-light btn'
                     @click='rowDetails(testItem)') Row details

</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      currencySum: '',
      editTableMode: false
    };
  },
  computed: {
    ...mapState([
      'test'
    ])
  },
  watch: {
    test: {
      handler() {
        let currencyArr = [];
        for(let i = 0; i < this.test.length; i++) {
          currencyArr.push(Number(this.test[i].currency));
        };
        console.log(currencyArr);
        currencyArr.reduce((a, b) => {
          return this.currencySum = a + b;
        }, 0);
      },
      deep: true 
    } 
  },
  methods: {
    calculateSum() {
      this.currencySum;
    },
    editTable(event) {
      this.editTableMode = !this.editTableMode;
      let targetSpan = event.target.parentNode.children[0];
      let targetInput = event.target.parentNode.children[1];

      if(this.editTableMode) { 
        $(targetSpan).css('display', 'none')
        $(targetInput).css('display', 'block') 
      } else { 
        $(targetSpan).css('display', 'block')
        $(targetInput).css('display', 'none')
      };

    },
    rowDetails(payload) {
      console.log(payload);
      this.$store.commit('UPDATE_ROW_DETAILS', payload);
    }
  }, 
  mounted() {

    let currencyArr = [];
    for(let i = 0; i < this.test.length; i++) {
      currencyArr.push(this.test[i].currency);
    };
    currencyArr.reduce((a, b) => {
      return this.currencySum = a + b;
    }, 0);

  }
}
</script>


<style lang="sass">

  .live-search
    display: flex
    flex-direction: column

  .input-field
    margin-top: 30px !important
    margin-bottom: 15px !important
    margin-left: initial !important

  .data-table
    margin-top: 50px

  th
    cursor: pointer
    transition: background .2s ease
    &:hover
      background: #e0e0e0
      transition: background .2s ease

  .data-table__td
    position: relative

  tr
    height: 77px
    td
      &:first-child
        width: 220px
      &:last-child
        width: 124px
        word-break: break-all

  .data-table__td-edit
    display: none
    font-size: 15px !important
    margin-bottom: 0 !important

  .data-table__edit-btn
    position: absolute
    right: -170px
    top: 50%
    transform: translateY(-50%)
  
  .data-table__row-details
    position: absolute
    right: -310px
    top: 50%
    transform: translateY(-50%)

</style>
