<template>
  <div class="tf-flex-wrapper">
    <side-menu @toggle="toggleModal"></side-menu>
    <section id="main" ref="main">
      <div id="group-wrapper" :style="{height: height + 'px'}">
        <div class="groups">
          <group-block v-for="(group, index) in groups" :key="index"
            :groupId="index"
            :group="group"
            @removeGroup="removeGroup">
          </group-block>
        </div>
        <div id="resizer"></div>
      </div>
      <bottom-menu @move="groupsHeight += $event"></bottom-menu>
      <div class="dragging" v-if="dragData" :style="{ top: `${startY}px`, left: `${startX}px`, transform: `translate(${x}px,${y}px)`}">
        <div class="icon">
          <img :src="'http://localhost:3000' + dragData.icon" :alt="dragData.name">
        </div>
      </div>
    </section>
    <group-modal 
      :open="modals.groupWindow"
      :nOfGroups="groups.length" 
      @createGroup="createGroup" 
      @close="close"></group-modal>
  </div>
</template>

<script>
import BottomMenu from '@/components/menus/Bottom2.vue';
import SideMenu from '@/components/menus/SideMenu.vue';
import GroupModal from '@/components/modals/GroupModal.vue';
import GroupBlock from '@/components/GroupBlock.vue';

import { mapActions, mapGetters } from 'vuex';
import { eventBus } from '@/main';

export default (function() {

  function findId(node) {
    let groupId;
    let buildId;
    while (node.parentElement) {
      node = node.parentElement;
      if (node.hasAttribute('data-p-id')) {
        buildId = node.dataset.pId;
      }
      if (node.hasAttribute('data-group-id')) {
        groupId = node.dataset.groupId;
        break;
        // return parseInt(node.dataset.groupId);
      }
    }
    return { groupId: groupId || null, buildId: buildId || null };
  };

  function getCoordinates(element) {
    const el = element.getBoundingClientRect();
    const elTop = el.top + window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
    const elLeft = el.left + window.pageXOffset || document.documentElement.scrollLeft || window.scrollX;
    return {
      top: elTop,
      left: elLeft
    };
  };

  return {
    name: 'hello',
    data() {
      return {
        numOfGroups: 0,
        groups: [],

        startY: 0,
        startX: 0,
        x: 0,
        y: 0,

        height: 500,

        groupId: null,

        oldIndex: null,
        sourceContainerClassName: null,

        dragData: null,

        modals: {
          groupWindow: false,
          userWindow: false,
          optionsWindow: false,
        }
      }
    },

    created() {
      this.initRecords();
      this.fetchClassList();
      
      this.$interact('.icon')
        .draggable({
          onstart: (evt) => this.dragStart(evt),
          onmove: (evt) => this.drag(evt),
          onend: (evt) => this.dragEnd(evt)
        });

      this.$interact('.ability')
        .dropzone({
          ondrop: (evt) => this.drop(evt),
          // ondragenter: (evt) => this.dragEnter(evt),
          // ondragleave: (evt) => this.dragLeave(evt),
          // ondropactivate: (evt) => this.dropActivate(evt)
        })

        this.$interact('#group-wrapper')
          .draggable({
            onmove: (evt) => this.move(evt)
          })

    },

    components: {
      bottomMenu: BottomMenu,
      sideMenu: SideMenu,
      groupModal: GroupModal,
      groupBlock: GroupBlock
    },

    computed: {
      ...mapGetters([
        'records',
      ])
    },

    methods: {
      ...mapActions([
        'initRecords',
        'fetchClassList',
      ]),

      getCollection(node) {
        const ids = findId(node);
        const group = this.groups[ids.groupId];
        const characterBuild = group.members[ids.buildId];
        const activeTray = characterBuild.activeTray;
        return characterBuild.trays[activeTray];
      },

      drop(e) {
        const target = e.target;
        const currentGroupId = findId(target).buildId;
        const collection = this.getCollection(target);
        const dropIndex = parseInt(target.dataset.id);

        if (this.sourceContainerClassName === 'ability' && currentGroupId === this.groupId) {
          collection.splice(dropIndex, 1, collection.splice(this.oldIndex, 1, collection[dropIndex])[0]);
        } else {
          collection.splice(dropIndex, 1, this.dragData);
        }

      },

      dragEnter(e) { },
      dragLeave(e) { },
      dragActivate(e) { },

      dragStart(e) {
        //close any dialogs when the drag starts
        eventBus.$emit('close');

        for (let key in this.modals) {
          this.close(key);
        }

        const target = e.target;
        const parent = target.parentElement
        const rect = getCoordinates(target);

        this.sourceContainerClassName = parent.className;
        this.groupId = findId(target).buildId;

        if (parent.className.includes('ability')) {

          const collection = this.getCollection(target);

          this.oldIndex = parseInt(parent.dataset.id);
          this.dragData = collection[this.oldIndex];

        } else {

          const dragIndex = parseInt(target.dataset.id);
          this.dragData = this.records[dragIndex];

        }

        // this.startY = window.scrollY ? rect.top : rect.top - 60;
        // this.startX = rect.left - 50;

        this.startX = rect.left - 50;
        this.startY = rect.top;

      },

      dragEnd(e) {
        this.startY = 0;
        this.startX = 0;
        this.x = 0;
        this.y = 0;
        this.dragData = null;
        this.groupId = null;
        this.oldIndex = null;
        this.sourceContainerClassName = '';
      },

      drag(e) {
        this.x = this.x + e.dx;
        this.y = this.y + e.dy;
      },

      toggleModal(modal) {
        this.modals[modal] = !this.modals[modal];
      },

      close(modal) {
        this.modals[modal] = false;
      },

      createGroup(name) {
        // const input = document.querySelector('.group-modal > .modal > .modal-input');
        // const name = input.value || input.placeholder;
        const group = {
          expand: false,
          name,
          numOfGroupMembers: 0,
          members: []
        }

        this.groups.push(group);
        this.numOfGroups = this.groups.length;

        // this.close('groupWindow');
      },

      removeGroup(i) {
        this.groups.splice(i, 1);
      },

      move(evt) {
        this.height += evt.dy;
      }

    }
  };
})();



</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  position: relative;
}

.tf-flex-wrapper {
  width: 100%;
  display: flex;
}

#main {
  height: 100%;
  width: calc(100% - 50px);
  position: relative;
  display: flex;
  flex-direction: column;
}

.dragging {
  position: absolute;
  z-index: 10000;
  opacity: 0.5;
}

#group-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .groups {
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  #resizer {
        height: 17px;
        cursor: ns-resize;
        background-color: #1d1d1d;
    }
}
</style>
