<template lang="pug">
  .col.s6.pull-s6
    select.choose-items(ref='itemsNumberSelect', v-model='itemsNumber')
      option(value="", disabled="", selected="") Choose items number
      option(value="5") 5
      option(value="10") 10
      option(value="20") 20
</template>

<script>
export default {
  data() {
    return {
      itemsNumber: ''
    };
  },
  watch: {
    itemsNumber: function() {
      this.$store.commit('CHANGE_TABLE_ITEMS_NUMBER', this.itemsNumber);
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.itemsNumberSelect);
  }
}
</script>
