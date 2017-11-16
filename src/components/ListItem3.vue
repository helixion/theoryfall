<template>
    <div class="item" @click="close">
        <div class="info">
            <div class="icon">
                <img :src="'http://localhost:3000' + record.icon_svg" :alt="record.name">
            </div>
            <div class="details">
                <h5 class="name">{{record.name}}</h5>
                <p class="desc">
                    {{record.description}}
                </p>
            </div>
            <div class="source" v-if="record.source.name">
                <h5 class="source-name">{{record.source.name}}</h5>
                <p class="type">{{sourceType}}</p>
            </div>
            <div class="tools" @click.stop>
                <span class="toggle" @click="$store.commit('SET_ID', record.id)">
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </span>
                <div class="tools-panel"  v-show="id === record.id">
                    <ol>
                        <li v-if="record.combos.length" @click="open = !open">{{ open ? 'Hide Combos' : 'Show Combos'}}</li>
                        <li>Edit</li>
                        <li>Remove</li>
                        <li>Move</li>
                    </ol>
                </div>
            </div>
        </div>
        <combo :combos="record.combos" v-show="open"></combo>
    </div>
</template>

<script>
import Combo from '@/components/Combo3.vue';

export default {

    name: 'list-item',

    props: {
        record: {
            type: Object,
            required: true
        },

        index: {
            type: Number
        }
    },

    components: {Combo},

    data() {
        return {
            open: false,
        }
    },

    computed: {
        sourceType() {
            //returns the discipline type, other wise it returns 'Class'.
            return (this.record.source.data_type === 'discipline' ? this.record.source.discipline_type + ' Discipline'
                : this.record.source.data_type[0].toUpperCase() + this.record.source.data_type.slice(1));
        },

        id() {
            return this.$store.getters.id;
        }
    },

    methods: {
        close() {
            if (this.id) {
                this.$store.commit('SET_ID', 0);
            }
        }
    }
}
</script>

<style lang="scss">
.icon {
    width: 70px;
    height: 70px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    img {
        width: 60px;
        height: 60px;
    }
}

.info {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #1d1d1d;
    min-height: 70px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: left;
    border-bottom: 1px solid #000;
    -webkit-box-shadow: 0 1px 1px rgba(55, 55, 55, 0.7),
    inset 0 1px 1px rgba(55, 55, 55, 0.7);
    box-shadow: 0 1px 1px rgba(55, 55, 55, 0.7),
    inset 0 1px 1px rgba(55, 55, 55, 0.7);
    h4,
    h5,
    .desc,
    p {
        margin-top: 0;
        margin-bottom: 0;
    }
    .details {
        -webkit-box-flex: 1;
        -ms-flex: 1 0 0px;
        flex: 1 0 0;
        .name {
            color: #cdaf7c;
        }
        .desc {
            color: #f1f1f1;
            font-size: 12px;
        }
    }
    .source {
        text-align: right;
        margin-right: 10px;
        .source-name {
            color: #cdaf7c;
        }
        .type {
            color: #f1f1f1;
            font-size: 12px;
        }
    }
    .tools {
        width: 20px;
        position: relative;
        color: #f1f1f1;
        .toggle {
            width: 50px;
        }
    }
    .tools-panel {
        background-color: #232323;
        box-shadow: 1px 0 0 rgba(55, 55, 55, 0.2);
        border-radius: 4px;
        padding: 5px;
        width: 120px;
        font-size: 11px;
        position: absolute;
        // bottom: -23px;
        // left: 20px;
        right: 0;
        z-index: 1000;
        ol {
            list-style-type: none;
            margin-top: 0;
            margin-bottom: 0;
            padding: 0;
        }
    }
}
</style>
