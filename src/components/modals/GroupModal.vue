<template>
  <div class="group-modal" v-if="open">
        <div class="modal" role="document">
          <span class="close" @click.stop="$emit('close', 'groupWindow')">&times;</span>
          <h4 class="modal-header">Create A Group</h4>
          <input type="text" ref="groupModalInput" class="modal-input" :placeholder="'Group ' + nOfGroups" v-model="name">
          <button class="modal-button block" @click="_createGroup">Add Group</button>
        </div>
    </div>
</template>

<script>
export default {
  props: {
      open: {
          type: Boolean,
          default: false
      },

      nOfGroups: {
        type: Number
      }
  },

  data() {
      return {
        name: ''
      }
  },

  methods: {
      _createGroup() {
          console.log(this.name);
          this.$emit('createGroup', this.name || this.$refs.groupModalInput.placeholder );
          this.$emit('close', 'groupWindow');
          this.name = '';
          
      }
  }
}
</script>


<style lang="scss">
.group-modal {
  position: absolute;
  z-index: 1200;
  width: 350px;
  height: 120px;
  box-shadow: 1px 0 rgba(55,55,55,0.5);
  background-color: rgba(00,00,00,0.7);
  top: 30px;
  left: 100px;
  text-align: center;
  padding: 10px;
  .modal-input {
    background: transparent;
    color: #f1f1f1;
    font-size: 24px;
    border: 0;
    border-bottom: 3px solid #e1e1e1;
    margin-bottom: 5px;
    text-align: center;
    width: 100%;
    &::placeholder {
      color: #f1f1f1;
    }
  }
  .modal-header {
    margin-top: 0;
    margin-bottom: 5px;
    color: #f1f1f1;
  }
  .modal-button {
    border-radius: 4px;
    background-color: #ff6961;
    width: 100%;
    height: 40px;
    border: 0;
    font-size: 14px;
    color: #f1f1f1;
    font-weight: bold;
    vertical-align: middle;
    &.block {
      display: block;
    }
  }
  .close {
    position: absolute;
    top: 0;
    right: 5px;
    color: #f1f1f1;
    font-size: 16px;
    font-weight: bold;
    &:hover {
      color: #ff6961;
    }
  }
}
</style>
