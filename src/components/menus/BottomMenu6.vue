<template>
  <div id="bottom-menu">
      <div id="resizer"></div>
      <div class="powers">
            <app-item
                v-for="(record, index) in records"
                :key="record.id"
                :index="index"
                :record="record">
            </app-item>
       </div>  
  </div>
</template>

<script>
import Item from '@/components/list/Item2.vue';
import {mapGetters} from 'vuex';

export default {

  data() {
    return {
        height: 500,
    }
  },

  created() {
    //  this.$interact('#group-wrapper', {
    //      allowFrom: '#resizer'
    //  })
    // .draggable({
    //     onmove: (evt) => this.onMove(evt)
    // }) 
  },

  components: { 
      appItem: Item
   },

  computed: {
      ...mapGetters([
          'records'
      ])
  },

  methods: {

    onMove(evt) {
        // this.height -= evt.dy
        this.$emit('updateGroupHeight', evt.dy);
    }

  }
}
</script>

<style lang="scss">
.icon {
  width: 70px;
  height: 70px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
  }
}

#bottom-menu {
    width: 100%;
    // height: 100%;
    min-height: 500px;
    max-height: 909px;
    background-color: #232323;
    color: #f1f1f1;
    overflow-y: auto;
    touch-action: none;
    #resizer {
        height: 17px;
        background-color: #1d1d1d;
        cursor: ns-resize;
    }
    .powers {
        overflow-y: scroll;
        height: 100%;
        background-color: #232323;
        
        &::-webkit-scrollbar {
            width: 8px;
            background-color: #1d1d1d;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #cdaf7c;
        }
        .power {
            display: flex;
            display: -webkit-flex;
            flex: 1 0 0;
            min-height: 70px;
            align-items: center;
            text-align: left;
            border-bottom: 1px solid #000;
            box-shadow: 0 1px 1px rgba(55,55,55,0.7), inset 0 1px 1px rgba(55,55,55,0.7);
            .details {
                flex: 1 0 calc(100% - 210px);
                .name {
                    margin-top: 0;
                    margin-bottom: 0;
                    color: #cdaf7c;
                }
                .desc {
                    margin-top: 0;
                    margin-bottom: 0;
                    color: #f1f1f1;
                    width: 80%;
                    font-size: 12px;
                }
            }
            .source {
                display: flex;
                display: -webkit-flex;
                justify-content: flex-end;
                flex-direction: column;
                flex-basis: 140px;
                text-align: right;
                margin-right: 10px;
                
                .name {
                    font-size: 14px;
                    color: #cdaf7c
                }
                .type {
                    color: #f1f1f1;
                    font-size: 12px;
                }
            }
        }
    }
}


</style>

