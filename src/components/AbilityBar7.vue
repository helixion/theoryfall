<template>
    <div class="trays">
        <span class="header">{{selectedTray[0].toUpperCase() + selectedTray.slice(1)}}</span>
        <div class="ability" v-for="(ability, index) in tray" :key="index" :data-id="index">
            <div v-if="ability" class="icon" @mousedown.right.prevent="_remove($event, index)">
                <img :src="'http://localhost:3000' + ability.icon" :alt="ability.name">
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
.trays {
    display: flex;
    align-items: center;
    margin: 10px 10px;
    width: calc(12*70px);
    height: 70px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid #b89d6f;
    border-bottom: 0;
    position: relative;
    background: linear-gradient(to bottom, #cdaf7c, transparent);
    &:after {
        content: ' ';
        height: 3px;
        width: 90%;
        position: absolute;
        background-color: #b89d6f;
        top: 50%;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 10;
    }
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
    .ability {
        margin: 5px 5px 0px 5px;
        border-radius: 40px;
        width: 60px;
        height: 60px;
        // background-color: rgb(211,211,211);
        background: #b89d6f;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        .empty {
            width: 45px;
            height: 45px;
            background: radial-gradient(#333 20%, #2d2d2d 40%, #232323 80%);
            border-radius: 40px;
        }
    }
}
</style>
