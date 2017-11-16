<template>
  <div class="list-container">
      <div class="filter"></div>
      <div class="pagination">INSERT PAGINATION HERE</div>
      <div class="list">
          <list-item v-for="(record, index) in records" :record="record" :key="index"></list-item>
      </div>
  </div>
  
</template>


<script>
import ListItem from '@/components/ListItem.vue';

export default {
  props: ['type'],
  components: { ListItem },

  computed: {
      records() {
          return this.$store.getters.records.map(r => {
              return {
                  ...r,
                  control: {
                      show: false
                  }
              }
          });
      },

      meta() {
          return this.$store.getters.meta;
      }
  },

  methods: {
      clearOptions() {
          let record = this.records.find(el => el.control.show);
          if (record.control.show) record.control.show = false;
          this.records[i].control.show = !this.records[i].control.show;
      }
  }
}
</script>


<style lang="scss">
.list-container {
    min-width: 968px;
    max-width: 80%;
    min-height: 100%;
    margin: 0 auto;
}

.item {
    background-color: #36404a;
}

.filter {
    display: -webkit-flex;
    display: flex;
    width: 300px;
    height: 300px;
}

.pagination {
    width: 300px;
    height: 50px;
}
</style>
