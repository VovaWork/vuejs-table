<template lang="pug">

  section.row-details 

    h2 Row Details
    hr
    p Id: {{ rowDetails.id }}
    p Name: {{ rowDetails.name }}
    p Location: {{ rowDetails.location }}
    p Currency: {{ rowDetails.currency }}
    
    router-link(to='/' class='to-table-btn waves-effect waves-light btn') Data Table

</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'rowDetails'
    ])
  }
}
</script>

<style lang="sass">

.row-details
  margin-top: 70px

.to-table-btn
  margin: 20px 0

</style>
