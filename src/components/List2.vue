<template>
 <div class="container is-fluid">
     <filter-bar></filter-bar>
     <pagination :meta="meta"></pagination>
     <list-item :record="record" :index="index" :key="index" v-for="(record, index) in records"></list-item>
 </div>    
</template>


<script>
import ListItem from '@/components/ListItem3.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import FilterBar from '@/components/FilterBar.vue';

export default {
  props: ['type'],
  components: { ListItem, Pagination, FilterBar },

  computed: {
      records() {
          return this.$store.getters.records;
      },

      meta() {
          return this.$store.getters.meta;
      }
  }
}
</script>


<style lang="scss">
.inner-container {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    flex-direction: column;
}
</style>
