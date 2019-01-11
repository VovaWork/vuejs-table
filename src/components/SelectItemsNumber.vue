<template lang="pug">
  .col.s6.pull-s6
    select.choose-items(ref='itemsNumberSelect', v-model='itemsNumber')
      option(value="", disabled="", selected="") Choose items number
      option(value="5") 5
      option(value="10") 10
      option(value="20") 20
</template>

<script>
import axios from 'axios';
import serverConfig from '../config/config.json';

export default {
  data() {
    return {
      itemsNumber: ''
    };
  },
  watch: {
    itemsNumber: function() {
      this.$store.commit('CHANGE_TABLE_ITEMS_NUMBER', this.itemsNumber);

      const data = JSON.stringify({
        perPage: this.itemsNumber
      });

      axios.post(serverConfig.host, data)
        .then((req, res) => {
          this.$store.commit('SET_TEST_DATA', res.data.payload)
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.itemsNumberSelect);
  }
}
</script>