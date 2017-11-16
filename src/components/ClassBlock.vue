<template>
  <div class="class-wrapper">
    <div class="tray-select">
        <span v-for="(tray, key) in record.trays"
            v-if="tray" 
            :class="['tray-selector', { 'active': selectedTray === key}]"  
            :key="key" 
            @click="setTray(key)"></span>
    </div>
    <div>
        <class-race-selector></class-race-selector>
        <ability-bar :tray="tray" :selectedTray="selectedTray"></ability-bar>
    </div>  
    
   </div>
</template>

<script>
import AbilityBar from '@/components/AbilityBar4.vue';
import ClassRaceSelector from '@/components/ClassRaceSelector2.vue';

export default {
  props: {
      record: {
          type: Object,
          required: true
      },
  },

  components: {
      abilityBar: AbilityBar,
      ClassRaceSelector: ClassRaceSelector
  },

  data() {
      return {
          selectedTray: 'combat'
      }
  },

  computed: {
      tray() {
          return this.record.trays[this.selectedTray];
      }
  },

  methods: {
      setTray(tray) {
          this.selectedTray = tray;
      }
  }
}
</script>

<style lang="scss">
.tray-select {
    display: flex;
    top: 5px;
    left: 100px;
    height: 20px;
    position: absolute;
    .tray-selector {
      background-color: #e1e1e1;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      margin: 0 5px;
      &.active {
        animation: pulse 2s infinite;
      }
    }
  }

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(119, 221, 119, 0.4);
  }
  70% {
      -webkit-box-shadow: 0 0 0 10px rgba(119, 221, 119, 0);
  }
  100% {
      -webkit-box-shadow: 0 0 0 0 rgba(119, 221, 119, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(119, 221, 119, 0.4);
    box-shadow: 0 0 0 0 rgba(119, 221, 119, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 10px rgba(119, 221, 119, 0);
      box-shadow: 0 0 0 10px rgba(119, 221, 119, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(119, 221, 119, 0);
      box-shadow: 0 0 0 0 rgba(119, 221, 119, 0);
  }
}  
</style>

