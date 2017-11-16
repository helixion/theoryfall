<template>
    <div class="abilities">
        <div class="actives">
            <div class="ability" 
                v-for="(ability, index) in tray" 
                :key="index" 
                :data-id="index"
                v-if="index <= 9">
                <img :src="ability.icon" :alt="ability.name">
            </div>
        </div>
        <div class="basics">
            <div class="ability" 
                v-for="(ability, index) in tray" 
                :key="index" 
                :data-id="index"
                v-if="index > 9 && index <= 12">
                <img :src="ability.icon" :alt="ability.name">
            </div>
        </div>
        <div class="passives">
            <div class="ability" 
                v-for="(ability, index) in tray" 
                :key="index" 
                :data-id="index"
                v-if="index > 12">
                <img :src="ability.icon" :alt="ability.name">
                <power-tooltip :power="ability"></power-tooltip>
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

        selectedTray:{
            type: String,
            required: true
        },
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

        _remove(evt, index) {
        //    console.log(evt.relatedTarget);
        //    if (evt.relatedTarget.id === 'main') {
        //        this.tray.splice(index, 1, null);
        //    }
            this.tray.splice(index, 1, null);
        },
    }


}
</script>

<style lang="scss">
.tray {
    display: -webkit-flex;
    display: flex;
    width: calc(80px * 17);
    height: 120px;
    background: rgba(181, 101, 29,0.2);
    .tray-buttons {
        display:-webkit-flex;
        display: flex;
        border-left: 3px solid #b5651d;
        width: 100%;
        color: #fff;
        height: 40px;
        background: rgba(181, 101, 29,0.4);
        align-items: center;
    }
    .abilities {
        display: flex;
        flex: 1 0 0;
        justify-content: space-around;
        align-items: center;
        .ability {
            width: 70px;
            height: 70px;
            background: rgba(255,255,255,0.2);
            border: 1px solid #f1f1f1;
            position: relative;
        }
        .actives, .basics, .passives {
            display: flex;
        }
        .actives {
            order: 1;
        }
        .basics {
            order: 2;
        }
        .passives {
            order: 3;
        }
    }
}
</style>
