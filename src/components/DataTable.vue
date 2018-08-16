<template lang="pug">

  section
    section.live-search

      .input-field.col.s6
        input#search.validate(type="text" v-model='search')
        label(for="search") Type Name ...

      h3 Итого: {{ currencySum }}

      .col.s6.pull-s6
        select.choose-items(v-model='itemsNumber')
          option(value="", disabled="", selected="") Choose items number
          option(value="5") 5
          option(value="10") 10
          option(value="20") 20

      table.data-table
        thead
          tr
            th ID
            th Name
            th Location
            th Currency
        tbody
          tr(v-for='testItem in filteredList.slice(range.start, range.end)' class='data-table__tr')
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

              i(@click='editTable($event)' 
                class='data-table__action-btn data-table__edit-btn material-icons') edit 

              router-link(to='/rowdetails'
                          tag='a'
                          class='data-table__action-btn data-table__row-details'
                          @click.native='rowDetails(testItem)') 
                          i.material-icons details

    Pagination(
                :itemsPerPage='itemsNumber'
                :totalItems='150'
              )

</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '../main';
import Pagination from './Pagination.vue';

export default {
  components: {
    Pagination
  },
  data() {
    return {
      currencySum: '',
      editTableMode: false,
      search: '',
      itemsNumber: 10,
      range: ''
    };
  },
  computed: {
    ...mapState([
      'test'
    ]),
    filteredList() {
      return this.test.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  watch: {
    test: {
      handler() {
        let currencyArr = [];
        for(let i = 0; i < this.test.length; i++) {
          currencyArr.push(Number(this.test[i].currency));
        };
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
      this.$store.commit('UPDATE_ROW_DETAILS', payload);
    }
  }, 
  created() {
    eventBus.$on('rangeChanged', (range) => {
      this.range = range;
    });
  },
  mounted() {

    let currencyArr = [];
    for(let i = 0; i < this.test.length; i++) {
      currencyArr.push(this.test[i].currency);
    };
    currencyArr.reduce((a, b) => {
      return this.currencySum = a + b;
    }, 0);

    $('select').formSelect();

    var sortOrder;
    var col;
    $('th').each(function(col) {
      $(this).click(function() {

        var arrData = $('table').find('tbody >tr:has(td)').get();
        arrData.sort(function(a, b) {
          
          var val1 = $(a).children('td').eq(col).text().toUpperCase();
          var val2 = $(b).children('td').eq(col).text().toUpperCase();
          
          if ($.isNumeric(val1) && $.isNumeric(val2)) {
            return sortOrder == 1 ? val1 - val2 : val2 - val1;
          } else {
            return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
          }
          
        });
        
        $.each(arrData, function(index, row) {
          $('tbody').append(row);
        });

      });
    });
    

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
    height: 77px
    &:first-child
      width: 220px
    &:last-child
      width: 124px
      word-break: break-all
      display: flex
      align-items: center
      justify-content: space-between

  .data-table__action-btn
    cursor: pointer
    color: #ef6c00
    position: absolute
    right: -26px

  .data-table__td-edit
    display: none
    font-size: 15px !important
    margin-bottom: 0 !important

  .data-table__edit-btn
    top: 10px
  
  .data-table__row-details
    top: 45px
    display: inline-flex

</style>
