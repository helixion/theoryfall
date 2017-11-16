<template>
    <div class="abilities">
        <div class="outer-box">
            <div class="inner-box" @drop="_onDrop" @dragover.prevent>
                <span class="header">{{selectedTray[0].toUpperCase() + selectedTray.slice(1)}}</span>
                <div class="ability" v-for="(ability, index) in tray" :key="index" :data-id="index">
                    <div v-if="ability" class="icon" draggable="true" @dragstart="_onDragStart($event, index)" @dragend="_onDragEnd($event,index)">
                        <img :src="'http://localhost:3000' + ability.icon" :alt="ability.name">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tray: {
            type: Array,
            required: true
        },

        selectedTray: String
       
    },

    computed: {
        records() {
            return this.$store.getters.records;
        },
        dragObject() {
            return this.$store.getters.dragData;
        }
    },

    data() {
        return {
            isSibling: false,
            hasLMB: false,
            hasRMB: false,
            hasRelatiate: false,
            hasUltimate: false,
            previousIndex: null
        }
    },

    methods: {
        _onDragStart(evt, index, key) {
            this.isSibling = true;
            this.previousIndex = index;
        },

        _onDragEnd() {
            this.previousIndex = null;
            this.$store.dispatch('setDragData', null);
            this.isSibling = false;
        },

        _onDrop(event) {
            const target = event.target;
            const index = (target && target.className === 'ability'
            ? target.dataset.id : target.parentNode.parentNode.dataset.id);

            this.tray.splice(index, 1, this.dragObject);

            console.log(index);
        },

        _remove(evt, index, key) {
           console.log(evt);
           if (evt.relatedTarget.className !== 'inner-box') {
               this.trays[key].splice(index, 1, null);
           }
        },
    }


}
</script>

<style lang="scss">
.abilities {
    display: -webkit-flex;
    display: flex;
    margin-top: 25px;
    .basics {
        width: calc(3*65px) !important;
        .inner-box {
            width: 97.5%;
            .header {
                width: 42px;
                padding: 0 1px;
            }
        }
    }
    .passives {
        width: calc(4*65px) !important;
        .inner-box {
            width: 98%;
            .header {
                padding: 0 1px;
                width: 56px;
            }
        }
    }
    .locked {
        background-color: #555;
        font-size: 24px;
        color: #fff;
        text-shadow: 1px 0 0 rgba(55,55,55,0.7);
    }
    .outer-box {
       margin-left: 10px;
       height: 70px;
       border-top-left-radius: 4px;
       border-top-right-radius: 4px;
       background: -webkit-linear-gradient(rgba(55,55,55,0.7), rgba(0,0,0,0));
       background: linear-gradient(rgba(55,55,55,0.7), rgba(0,0,0,0));
       display: flex;
       flex-direction: column;
       justify-content: flex-end;
       align-items: center;
       box-sizing: border-box;
       font-family: 'roboto', sans-serif;
       padding: 1px 2px 0 1px;
    }
    .inner-box {
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        position: relative;
        width: 99%;
        height: 96%;
        .header {
            position: absolute;
            background-color: #fff;
            font-size: 14px;
            width: 46px;
            height: 14px;
            color: #fff;
            top: -10px;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            text-shadow: 0 1px 1px rgba(0,0,0,0.5);
        }
    }
    .ability {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #000;
        border-radius: 40px;
        width: 60px;
        height: 60px;
        .icon {
            display: flex;
            display: -webkit-flex;
            justify-content: center;
        }
        .ghost {
            opacity: 0.5;
        }
    }
}
</style>
