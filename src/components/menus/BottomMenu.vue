<template>
  <div id="bottom-menu" ref="bottom" :style="{ height: height + 'px'}">
      <div id="resizer" @mousedown="init"></div>
      <div class="powers">
            <app-item
                v-for="(record, index) in records"
                :key="record.id"
                :index="index"
                :record="record"
                @onDragStart="$emit('start', $event, index)"
                @onDragEnd="$emit('end', $event)">
            </app-item>
       </div>  
  </div>
</template>

<script>
import Item from '@/components/list/Item.vue';
import {mapGetters} from 'vuex';

export default {

  beforeDestroy() {
    if (this.parentContainer) {
        this.parentContainer.removeEventListener('mousemove', this.onMove, false);
        this.parentContainer.removeEventListener('mouseup', this.onEnd, false);
        this.parentContainer = null;
    }
  },

  data() {
    return {
        startingHeight: 0,
        height: 300,
        startPointY: 0,
        parentContainer: null,
        canResize: false
    }
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
    init(evt) {
        if (!this.parentContainer) {
            this.parentContainer = document.getElementById('main');
        }
        this.startingHeight = parseFloat(this.$refs.bottom.style.height);
        this.parentContainer.addEventListener('mousemove', this.onMove, false);
        this.parentContainer.addEventListener('mouseup', this.onEnd, false);
        this.startPointY = evt.clientY;
        this.canResize = true;
    },

    onMove(evt) {
        if (!this.canResize) return;
        this.height = this.startingHeight - (evt.clientY - this.startPointY);
    },

    onEnd(evt) {
        this.canResize = false;
        this.parentContainer.removeEventListener('mousemove', this.onMove, false);
        this.parentContainer.removeEventListener('mouseup', this.onEnd, false);
        this.parentContainer.removeEventListener('touchmove', this.onMove, false);
        this.parentContainer.removeEventListener('touchend', this.onEnd, false);
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
    background-color: #232323;
    position: absolute;
    bottom: 0;
    color: #f1f1f1;
    z-index: 1001;
    #resizer {
        height: 17px;
        background-color: #1d1d1d;
        cursor: ns-resize;
    }
    .powers {
        overflow-y: scroll;
        height: 100%;
        background-color: #232323;
        font-family: 'roboto', sans-serif;
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
            flex-basis: 100%;
            min-height: 70px;
            align-items: center;
            text-align: left;
            border-bottom: 1px solid #000;
            box-shadow: 0 1px 1px rgba(55,55,55,0.7), inset 0 1px 1px rgba(55,55,55,0.7);
            .details {
                flex: 1 0 calc(100% - 210px);
                .name {
                    -webkit-margin-before: unset;
                    -webkit-margin-after: unset;
                    color: #cdaf7c;
                }
                .desc {
                    -webkit-margin-before: 0.5em;
                    -webkit-margin-after: unset;
                    color: #f1f1f1;
                    width: 80%;
                    font-size: 12px;
                }
            }
            .source {
                display: flex;
                display: -webkit-flex;
                justify-content: flex-end;
                // margin-right: 10px;
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

