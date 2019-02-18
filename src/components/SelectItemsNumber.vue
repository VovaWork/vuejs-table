<template lang="pug">
  .col.s6.pull-s6
    select.choose-items(ref='itemsNumberSelect', v-model='itemsNumber')
      option(value="", disabled="", selected="") Choose items number
      option(value="5") 5
      option(value="10") 10
      option(value="20") 20
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import serverConfig from '../config/config.json';

export default {
  data() {
    return {
      itemsNumber: ''
    };
  },
  computed: {
    ...mapState([
      'sendData'
    ]),
  },
  watch: {
    itemsNumber: function() {
      this.$store.commit('SET_LOADING_STATE', true);
      this.$store.commit('CHANGE_ITEMS_PER_PAGE', this.itemsNumber);
      const self = this;

      setTimeout(function() {
        axios.post(serverConfig.host, self.sendData)
          .then( res => {
            self.$store.commit('SET_TEST_DATA', res.data)
            self.$store.commit('SET_LOADING_STATE', false);
          })
          .catch(err => console.log(err));
      }, 800, self);
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.itemsNumberSelect);
  }
}
</script>