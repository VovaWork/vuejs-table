<template lang="pug">

  section.row-details 
    h2 Row Details
    hr
    p Id: {{ rowDetails.id }}
    p Name: {{ rowDetails.name }}
    p Location: {{ rowDetails.location }}
    p Currency: {{ rowDetails.currency }}

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

</style>
