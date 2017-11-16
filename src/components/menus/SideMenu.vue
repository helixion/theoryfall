<template>
  <div id="ctrl-menu">
    <div class="ctrl create-group" role="button" @click="toggle('groupWindow')">
      <i class="fa fa-plus" aria-hidden="true"></i>
      <span class="tooltip">Create Group</span>
    </div>
    <div class="ctrl add-contributor" role="button" @click="toggle('userWindow')">
      <i class="fa fa-user-plus" aria-hidden="true"></i>
      <span class="tooltip">Add/Manage Contributor(s)</span>
    </div>
    <div class="ctrl manage-privilages" role="button" @click="toggle('optionsWindow')">
      <i class="fa fa-cog" aria-hidden="true"></i>
      <span class="tooltip">Manage Room Privilages</span>
    </div>
    <div class="ctrl enable-strict" role="button">
      <i class="fa fa-exclamation" aria-hidden="true"></i>
      <span class="tooltip">Enable Strict</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggle(modal) {
      this.$emit('toggle', modal);
    }
  }
}
</script>


<style lang="scss">
#ctrl-menu {
  position: relative;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  background-color: #1d1d1d;
  .ctrl {
    margin-top: 5px;
    border: 2px solid;
    padding: 5px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    color: #f1f1f1;
    position: relative;
    text-align: center;
    font-size: 24px;
    &:first-child {
      margin-top: 30px;
    }
    &:hover {
      color: #ff6961;
      .tooltip {
        display: block;
        color: #f1f1f1;
      }
    }
    .tooltip {
      display: none;
      background-color: rgba(22, 22, 22, 0.5);
      padding: 2px;
      position: absolute;
      top: 5px;
      width: 150px;
      left: 48px;
      font-size: 12px;
      border-radius: 4px;
      z-index: 1003;
    }
  }
}
</style>
