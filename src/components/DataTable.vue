<template lang="pug">

  section
    section.live-search

      .input-field.col.s6
        input#search.validate(type="text" v-model='search')
        label(for="search") Type Name ...

      h3 Total: {{ currencySum }}


      SelectItemsNumber

      table.data-table
        thead
          tr
            th(class='data-table__th' ref='theadItem') ID
            th(class='data-table__th' @click='sortItem("name")') Name
            th(class='data-table__th' @click='sortItem("location")') Location
            th(class='data-table__th' @click='sortItem("currency")') Currency
        tbody
          tr(v-for='testItem in sortedItems.slice(range.start, range.end)' class='data-table__tr')
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

    TablePagination(
                    :itemsPerPage='itemsNumber'
                    :totalItems='150')

</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '../main';
import SelectItemsNumber from './SelectItemsNumber.vue';
import TablePagination from './TablePagination.vue';

export default {
  components: {
    SelectItemsNumber,
    TablePagination
  },
  data() {
    return {
      currencySum: '',
      editTableMode: false,
      search: '',
      currentSort: '',
      currentSortDir: 'asc',
    };
  },
  computed: {
    ...mapState([
      'test', 'tableItemsNumber', 'paginationRange'
    ]),

    range() {
      return this.paginationRange;
    },

    itemsNumber() {
      return this.tableItemsNumber;
    },

    sortedItems() {
      return this.test.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter(item => {
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
  mounted() {

    let currencyArr = [];
    for(let i = 0; i < this.test.length; i++) {
      currencyArr.push(this.test[i].currency);
    };
    currencyArr.reduce((a, b) => {
      return this.currencySum = a + b;
    }, 0);

    M.FormSelect.init(this.$refs.itemsNumberSelect);

  },
  methods: {
    sortItem(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    calculateSum() {
      this.currencySum;
    },
    editTable(event) {
      this.editTableMode = !this.editTableMode;
      let targetSpan = event.target.parentNode.children[0];
      let targetInput = event.target.parentNode.children[1];

      if(this.editTableMode) { 
        targetSpan.style.cssText = 'display: none';
        targetInput.style.cssText = 'display: block'; 
      } else { 
        targetSpan.style.cssText = 'display: block';
        targetInput.style.cssText = 'display: none';
      };

    },
    rowDetails(payload) {
      this.$store.commit('UPDATE_ROW_DETAILS', payload);
    }
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

  .data-table__th
    &:not(:first-child)
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
