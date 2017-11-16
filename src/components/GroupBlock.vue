<template>
    <div class="group" :data-group-id="groupId">
        <group-header :groupName="group.name" @removeGroup="$emit('removeGroup', groupId)"></group-header>
        <class-block v-for="(m, member_index) in group.members" v-if="m" :key="member_index" :groupIndex="member_index" :record="m"></class-block>
        <div class="add-member" v-if="group.numOfGroupMembers < 5" @click="createPartyMember()">
            <span>Add A Character</span>
        </div>
    </div>
</template>

<script>
import GroupHeader from '@/components/GroupHeader.vue';
import ClassBlock from '@/components/ClassBlock2.vue';

export default {
  props: {
      group: {
          type: Object,
          required: true
      },
      
      groupId: {
          type: Number,
          required: true
      }
  },

  components: { 
      GroupHeader,
      ClassBlock 
  },

  methods: {
     createPartyMember() {
        const character = {
             type: '',
             activeTray: 'combat',
             trays: {
                 combat: Array(12),
                 harvest: Array(12),
                 range: null,
                 stealth: null
             }
        };
        this.group.members.push(character);
        this.group.numOfGroupMembers++;
     }
  }
}
</script>

<style lang="scss">


.group {
    margin: 70px 10px;
    padding: 10px;
    width: 1000px;
    position: relative;
    &:first-child {
        margin-top: 30px;
    }
    .add-member {
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
        width: 1000px; // margin-left: 10px
        font-size: 24px;
        font-weight: bold;
        color: #f1f1f1;
        text-shadow: 1px 0 rgba(55, 55, 55, 0.5);
        background-color: #e1e1e1;
        border: 1px dashed #000;
        cursor: pointer;
    }
}

</style>
