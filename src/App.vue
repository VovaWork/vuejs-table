<template lang="pug">
  main
    .container
      .row
        .col.s8.offset-s2
          router-link(to='/' class='to-table-btn waves-effect waves-light btn') Data Table
          router-view
</template>

<style lang="sass">

.to-table-btn
  margin: 50px 0 20px

</style>
