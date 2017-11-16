<template>
  <div id="bottom-menu">
      <div class="list">
          <list-item v-for="(record, index) in records" :key="index" :index="index" :record="record"></list-item>
      </div>
  </div>
</template>

<script>
import ListItem from '@/components/list/Item3.vue';

export default {
  
  components: { ListItem },

  computed: {
      records() {
          return this.$store.getters.records;
      }
  }
}
</script>


<style lang="scss">
#bottom-menu {
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex: 1 1 0;
    background-color: #232323;
    position: relative;
    .list {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
    }
}
</style>
