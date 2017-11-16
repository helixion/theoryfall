<template>
  <div class="tray-select">
    <span v-for="(tray, key) in trays"
        v-if="tray" 
        :class="['tray-selector', key, { 'active': selectedTray === key}]"  
        :key="key" 
        @click="setTray(key)"></span>
    </div>
</template>

<script>
export default {
  props: {
      trays: {
          type: Object,
          required: true
      },

      selectedTray: String
  },

  methods: {
      setTray(key) {
          this.$emit('setTray', key);
      }
  }  
}
</script>

<style lang="scss">
.tray-select {
    display: -webkit-flex;
    display: flex;
    height: 20px;
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