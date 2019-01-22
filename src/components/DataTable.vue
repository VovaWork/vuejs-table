<template lang="pug">

  section

    .preloader(v-if='loading')
      .preloader-wrapper.big.active
        .spinner-layer.spinner-blue-only
          .circle-clipper.left
            .circle
          .gap-patch
            .circle
          .circle-clipper.right
            .circle

    section.live-search

      form(@submit.prevent='searchString')
        .input-field.col.s6
          input#search.validate(type="text" v-model='search')
          label(for="search") Type Name ...

      h3 Total: {{ currencySum }}

      SelectItemsNumber

      table.data-table
        thead
          tr
            th(class='data-table__th' ref='theadItem') ID
            th(class='data-table__th' ref='theadName' @click='sortBy("name")') Name
            th(class='data-table__th' ref='theadName' @click='sortBy("location")') Location
            th(class='data-table__th' ref='theadName' @click='sortBy("currency")') Currency
        tbody
          tr(v-for='testItem in test' class='data-table__tr')
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

              i(@click='editTable($event, testItem)' 
                class='data-table__action-btn data-table__edit-btn material-icons') edit 

              router-link(to='/rowdetails'
                          tag='a'
                          class='data-table__action-btn data-table__row-details'
                          @click.native='rowDetails(testItem)') 
                          i.material-icons details

    TablePagination(
                    v-if='totalItems'
                    :itemsPerPage='itemsNumber'
                    :totalItems='totalItems')

</template>

<script>
import { mapState } from 'vuex'
import { eventBus } from '../main'
import SelectItemsNumber from './SelectItemsNumber.vue'
import TablePagination from './TablePagination.vue'
import axios from 'axios'
import serverConfig from '../config/config.json'

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
      totalItems: 0,
      prevValue: ''
    }
  },
  computed: {
    ...mapState([
      'loading', 'test', 'tableItemsNumber', 'paginationRange'
    ]),

    range() {
      return this.paginationRange
    },

    itemsNumber() {
      return this.tableItemsNumber
    },

    sortedItems() {
      return this.test.sort((a,b) => {
        let modifier = 1
        if(this.currentSortDir === 'desc') modifier = -1
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      }).filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  beforeMount() {
    const self = this;
    setTimeout(function() {
      axios.get(serverConfig.host)
        .then((res) => {
          self.currencySum = res.data.total;
          self.$store.commit('SET_TEST_DATA', res.data.payload);
          self.totalItems = res.data.count;
          self.$store.commit('SET_LOADING_STATE', false);
        })
        .catch(err => console.log(err));
    }, 800, self);
  },
  mounted() {
    M.FormSelect.init(this.$refs.itemsNumberSelect)
  },
  methods: {
    searchString() {
      this.$store.commit('SET_LOADING_STATE', true);
      const self = this;
      const data = {
        searchString: this.search
      };

      setTimeout(function() {
        axios.post(`${serverConfig.host}/searchString`, data)
          .then(res => {
            self.currencySum = res.data.total;
            self.$store.commit('SET_TEST_DATA', res.data.payload);
            self.totalItems = res.data.count;
            self.$store.commit('SET_LOADING_STATE', false);
          })
          .catch(err => console.log(err));
      }, 800, self);
    },

    sortBy(type) {
      this.$store.commit('SET_LOADING_STATE', true);

      this.$store.state.test.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
      
      if(type === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc'
      };
      this.currentSort = type;

      const self = this;
      const data = {
        // Обьект range - диапазон(offset) записей для каждой страницы
        range: {
          start: this.paginationRange.start,
          end: this.paginationRange.end
        },
        sortBy: type,
        order: this.currentSortDir,
      };

      setTimeout(function() {
        axios.post(`${serverConfig.host}/sortBy`, data)
          .then(res => {
            console.log(res.data)
            self.$store.commit('SET_TEST_DATA', res.data.payload);
            self.$store.commit('SET_LOADING_STATE', false);
          })
          .catch(err => console.log(err));
      }, 800, self);
    },

    editTable(event, testItem) {
      this.editTableMode = !this.editTableMode;
      let targetSpan = event.target.parentNode.children[0];
      let targetInput = event.target.parentNode.children[1];
      let targetSpanContent = targetSpan.textContent;
      var prevValue;

      if(this.editTableMode) { 
        targetSpan.style.cssText = 'display: none';
        targetInput.style.cssText = 'display: block';
        this.prevValue = targetSpan.textContent; 
      } else { 
        targetSpan.style.cssText = 'display: block';
        targetInput.style.cssText = 'display: none';
        if(this.prevValue !== targetSpan.textContent) {
          this.$store.commit('SET_LOADING_STATE', true);
          const self = this;
          const parametr = {
            self, testItem
          };

          setTimeout(function() {
            const data = {
              newCurerncy: testItem
            };

            axios.post(`${serverConfig.host}/recalculateTotal`, data)
              .then(res => {
                self.currencySum = res.data.total;
                self.$store.commit('SET_LOADING_STATE', false);
              })
              .catch(err => console.log(err));
          }, 800, self, testItem);
        }
      }

    },
    rowDetails(payload) {
      this.$store.commit('UPDATE_ROW_DETAILS', payload)
    }
  }
}
</script>


<style lang="sass">

  .preloader
    display: flex
    align-items: center
    justify-content: center
    position: fixed
    width: 100%
    height: 100%
    left: 0
    top: 0
    background: rgba(0, 0, 0, 0.4)
    z-index: 2

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