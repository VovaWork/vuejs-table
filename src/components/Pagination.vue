<template lang="pug">

  section.pagination

    ul.pagination
      li(
          v-for='(button, index) in buttons'
          :key='index'
          @click='pageChange(button.page, range)'
          class='waves-effect'
          :class='{ active: button.active, disabled: button.disabled }'
        ) 
        a(  class=''
            href="#!" 
            v-html='button.html'
          )

</template>

<script>
import { eventBus } from '../main';

export default {
  data() {
    return {
      currentPage: 0
    };
  },
  props: {
    totalItems: {
      type: Number,
      default: 100
    },

    itemsPerPage: {
      type: Number,
      default: 10
    },

    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  computed: {
    range() {
      let start = this.currentPage * this.itemsPerPage;
      let end = start + this.itemsPerPage;

      return {
        start, 
        end
      };
    },

    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
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

      let endVisibleButton = startVisibleButton + totalButtonsWithoutFirstLastNextAndPrevious;
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
  methods: {
    removeClass() {
      alert('')
    },
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
      this.currentPage = page;
      eventBus.changeRange(range);
    }
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
