<template lang="pug">

  section.pagination
    ul.pagination
      li(
          v-for='(button, index) in buttons'
          :key='index'
          @click='pageChange(button.page, offset)'
          class='waves-effect'
          :class='{ active: button.active, disabled: button.disabled }') 
        a(
          href="#!" 
          v-html='button.html')

</template>

<script>
import { mapState } from 'vuex';
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
  computed: {
    ...mapState([
      'sendData', 'currentPage'
    ]),
    offset() {
      let start = this.currentPage * Number(this.sendData.perPage);
      let end = start + Number(this.sendData.perPage);

      return {
        start, 
        end
      };
    },

    totalPages() {
      return Math.ceil(this.sendData.count / this.sendData.perPage);
    },

    buttons() {
      let buttons = this.visibleButtonValues.map(value => {  
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


      return buttons;
    },

    visibleButtonValues() { 
      let maxVisiblePagesWithoutActiveOne = this.maxVisiblePages - 1;
      let diffWithThreeDot = (maxVisiblePagesWithoutActiveOne / 2) + 1;
      let totalButtonsWithoutFirstLastNextAndPrevious = this.maxVisiblePages + 2;

      let startVisibleButton = this.currentPage - Math.floor(diffWithThreeDot);
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
      
      return visibleButtonValues; 
    }
  },
  watch: {
    offset: function() {
      this.$store.commit('CHANGE_PAGINATION_OFFSET', this.offset);
    }
  },
  created() {
    this.$store.commit('CHANGE_PAGINATION_OFFSET', this.offset);
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

    pageChange(page, offset) {
      this.$store.commit('SET_LOADING_STATE', true);
      this.$store.commit('SET_CURRENT_PAGE', page);
      this.$store.commit('CHANGE_PAGINATION_OFFSET', offset);

      const self = this;

      setTimeout(function() {
        axios.post(serverConfig.host, self.sendData)
          .then(res => {
            self.$store.commit('SET_TEST_DATA', res.data);
            self.$store.commit('SET_LOADING_STATE', false);
          })
          .catch(err => console.log(err));
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