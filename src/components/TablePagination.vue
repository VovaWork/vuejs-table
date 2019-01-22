<template lang="pug">

  section.pagination
    ul.pagination
      li(
          v-for='(button, index) in buttons'
          :key='index'
          @click='pageChange(button.page, range)'
          class='waves-effect'
          :class='{ active: button.active, disabled: button.disabled }') 
        a(
          href="#!" 
          v-html='button.html')

</template>

<script>
import { eventBus } from '../main';
import axios from 'axios';
import serverConfig from '../config/config.json';

export default {
  props: {
    totalItems: {
      type: Number,
      default: 100
    },

    itemsPerPage: {
      default: 10
    },

    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      currentPage: 0
    };
  },
  computed: {
    range() {
      let start = this.currentPage * Number(this.itemsPerPage); // currentPage|itemsPerPage
      let end = start + Number(this.itemsPerPage); // start|itemsPerPage

      return {
        start, 
        end
      };
    },

    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage); // totalItems|itemsPerPage - default values
    },

    buttons() {
      let buttons = this.visibleButtonValues.map(value => {  // visibleButtonValues - массив с 7 элементами который хранит числа, числа это номера страниц который отображаются
        return value === '...'
          ? this.getButton(undefined, '...', true, false)
          : this.getButton(value)
      });

      buttons.unshift(this.getButton(0));
      buttons.unshift(this.getButton(
        this.currentPage - 1,
        '<i class="material-icons">chevron_left</i>',
        this.currentPage === 0,
        true
      ));

      buttons.push(this.getButton(this.totalPages - 1));
      buttons.push(this.getButton(
        this.currentPage + 1,
        '<i class="material-icons">chevron_right</i>',
        this.currentPage === this.totalPages - 1,
        true
      ));

      return buttons; // array of button objects
    },

    visibleButtonValues() { // возвращает массив с 7 элементами - это числа(видимые страницы без первой,последней,следующей, предидущей)
      let maxVisiblePagesWithoutActiveOne = this.maxVisiblePages - 1; // 4
      let diffWithThreeDot = (maxVisiblePagesWithoutActiveOne / 2) + 1; // 2 + 1
      let totalButtonsWithoutFirstLastNextAndPrevious = this.maxVisiblePages + 2; // 7

      let startVisibleButton = this.currentPage - Math.floor(diffWithThreeDot); // 0 - 3
      if (startVisibleButton < 1) {
        startVisibleButton = 1;
      };

      let endVisibleButton = startVisibleButton + totalButtonsWithoutFirstLastNextAndPrevious; // 8
      if (endVisibleButton > this.totalPages - 1) {
        endVisibleButton = this.totalPages - 1;
      };

      if (endVisibleButton - startVisibleButton < totalButtonsWithoutFirstLastNextAndPrevious) {
        startVisibleButton = endVisibleButton - totalButtonsWithoutFirstLastNextAndPrevious;
        startVisibleButton = startVisibleButton < 1 ? 1: startVisibleButton;
      };

      let visibleButtonValues = Array
        .from(
          new Array(endVisibleButton - startVisibleButton),
          (value, index) => startVisibleButton + index
        );

      if (visibleButtonValues[0] > 1) {
        visibleButtonValues[0] = '...';
      };

      if (visibleButtonValues[visibleButtonValues.length - 1] < this.totalPages - 2) {
        visibleButtonValues[visibleButtonValues.length - 1] = '...';
      };

      return visibleButtonValues; // array with 7 elements
    }
  },
  watch: {
    range: function() {
      this.$store.commit('CHANGE_PAGINATION_RANGE', this.range);
    }
  },
  created() {
    this.$store.commit('CHANGE_PAGINATION_RANGE', this.range);
  },
  methods: {
    getButton(
      page, 
      html, 
      disabled = false,
      showDisabled = true
      ) {
      let active = page === this.currentPage;

      return {
        page, 
        html: html || page + 1,
        active,
        disabled,
        showDisabled
      }
    },

    pageChange(page, range) {
      // Имеется ввиду что с помощью обьекта range на сервере обрежется массив обьектов с записями
      // в диапазоне range.start, range.end. То есть для каждой страницы свой диапазон обьектов.
      this.$store.commit('SET_LOADING_STATE', true);
      this.currentPage = page;
      console.log(`${range.start} ${range.end} `);

      const self = this;
      const data = {
        range: {
          start: range.start,
          end: range.end
        }
      };

      setTimeout(function() {
        axios.post(`${serverConfig.host}/pageChange`, data)
          .then(res => {
            self.$store.commit('SET_TEST_DATA', res.data.payload);
            self.$store.commit('SET_LOADING_STATE', false);
          })
          .catch(err => console.log(err));
        console.log(page);
      }, 800, self);
    },
  }
}
</script>


<style lang="sass">

.pagination
  display: flex
  justify-content: center
  margin-top: 30px

.disabled
  pointer-events: none

</style>