<template lang="pug">
  .container
    .row
      .col.s8.offset-s2
        AppDataTable
</template>


<script>
import AppDataTable from './components/AppDataTable.vue';

export default {
  name: 'App',
  components: {
    AppDataTable
  }
}
</script>

<style>

</style>
