<template>
    <div class="group-header">
        <h4 class="name">{{groupName[0].toUpperCase() + groupName.slice(1)}}
            <i class="fa fa-edit"></i>
        </h4>
        <div class="ctrls">
            <span @click="$emit('removeGroup')">&times; Remove</span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['groupName']
}
</script>


<style lang="scss">
.group-header {
  height: 50px;
  width: 980px;
  border-top: 2px solid #ee6969;
  border-left: 1px solid #ee6969;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  padding: 0 5px;
  color: #f1f1f1;
  text-shadow: 1px 1px 0 rgba(55,55,55,0.3);
  background: linear-gradient(135deg, rgba(238,105,105,1), transparent);
  margin-bottom: 10px;
  .name {
      flex: 1 0 0;
      text-align: left;
  }
  .ctrls {
      display: flex;
      justify-content: flex-end;
      span {
          padding: 5px;
          background-color: #ee6969;
      }
  }
}
</style>

