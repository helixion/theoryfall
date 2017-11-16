<template>
  <div class="class-wrapper" :data-p-id="groupIndex">
    <class-race-selector></class-race-selector>
    <div class="abilities">
        <tray-selector :selectedTray="selectedTray" :trays="record.trays" @setTray="setTray"></tray-selector>
        <ability-bar :tray="tray" :selectedTray="selectedTray"></ability-bar>
    </div>  
    
   </div>
</template>

<script>
import AbilityBar from '@/components/AbilityBar7.vue';
import ClassRaceSelector from '@/components/ClassRaceSelector2.vue';
import TraySelector from '@/components/TraySelector.vue';

export default {
  props: {
      record: {
          type: Object,
          required: true
      },

      groupIndex: {
          type: Number,
          required: true
      }
  },

  components: {
      abilityBar: AbilityBar,
      traySelector: TraySelector,
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
          this.record.activeTray = tray;
      }
  }
}
</script>

<style lang="scss">
.class-wrapper {
  display: -webkit-flex;
  display: flex;
  margin-top: 70px;
  margin-left: 20px;
  position: relative;
  &:first-child {
    margin-top: 0;
    .container {
      padding-top: 0;
    }
  }
}
</style>

