<template>
  <div id="bottom-menu" :style="{ height: height + 'px'}">
      <div id="resizer"></div>
      <div class="list">
          <list-item v-for="(record, index) in records" :key="index" :index="index" :record="record"></list-item>
      </div>
  </div>
</template>

<script>
import ListItem from '@/components/list/Item3.vue';

export default {
  created() {
        this.$interact('#bottom-menu', {
            allowFrom: '#resizer'
        }).draggable({
            onmove: (evt) => this.move(evt)
        })
  },
  
  data() {
      return {
          height: 500
      }
  },
  
  components: { ListItem },

  computed: {
      records() {
          return this.$store.getters.records;
      }
  },

  methods: {
      move(evt) {
          this.height -= evt.dy;
          this.$emit('move', evt.dy);
      }
  }
}
</script>


<style lang="scss">
#bottom-menu {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #232323;
    position: relative;
    #resizer {
        height: 17px;
        cursor: ns-resize;
        background-color: #1d1d1d;
    }
    .list {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
    }
}
</style>
