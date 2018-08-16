<template lang="pug">

  section.live-search

    .input-field.col.s6
      input#search.validate(type="text" v-model='search')
      label(for="search") Type Name ...

    h3 Итого: {{ currencySum }}

    table.data-table
      thead
        tr
          th ID
          th Name
          th Location
          th Currency
      tbody
        tr(v-for='testItem in filteredList')
          td(ref='td' class='data-table__td' @click='editCell') {{ testItem.id }}
          td(ref='td' class='data-table__td' @click='editCell') {{ testItem.name }}
          td(ref='td' class='data-table__td' @click='editCell') {{ testItem.location }}
          td(ref='td' class='data-table__td' @click='editCell') {{ testItem.currency }}

</template>

<script>

import test from '../data/test.json'

export default {
  data() {
    return {
      test,
      search: '',
      currencySum: '',
    };
  },
  methods: {
    editCell() {
      $('td').attr('contenteditable', 'true');
    }
  },
  computed: {
    filteredList() {
      return this.test.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  mounted() {
    let currencyArr = [];
    for(let i = 0; i < test.length; i++) {
      currencyArr.push(test[i].currency);
    };

    currencyArr.reduce((a, b) => {
      return this.currencySum = a + b;
    }, 0);

    var sortOrder;
    var col;
    $('th').each(function(col) {
      $(this).click(function() {
        console.log(col);
        if ($(this).is('.asc')) {
          $(this).removeClass('asc');
          $(this).addClass('desc selected');
          sortOrder = -1;
        } else {
          $(this).addClass('asc selected');
          $(this).removeClass('desc');
          sortOrder = 1;
        };
        
        $(this).siblings().removeClass('asc selected');
        $(this).siblings().removeClass('desc selected');
        // arrData - arr of all tr
        var arrData = $('table').find('tbody >tr:has(td)').get();
        
        arrData.sort(function(a, b) {
          // a, b - tr
          
          // eq(col) - find td in current clicked column
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
    outline: none

</style>
