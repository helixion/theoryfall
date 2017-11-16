<template>
    <div class="item">
        <div class="icon" :data-id="index">
            <img :src="'http://localhost:3000' + record.icon_svg" :alt="record.name">
        </div>
        <div class="details">
            <h5 class="name">{{record.name}}</h5>
            <p class="desc">
                {{record.description}}
            </p>
        </div>
        <div class="source">
            <h5 class="source-name">{{record.source.name}}</h5>
            <p class="type">{{sourceType}}</p>
        </div> 
    </div>
</template>

<script>
export default {
    props: {
        record: {
            type: Object,
            required: true
        },

        index: {
            type: Number,
            required: true
        },
    },
    computed: {
        sourceType() {
            //returns the discipline type, other wise it returns 'Class'.
            return (this.record.source.data_type === 'discipline' ? this.record.source.discipline_type + ' Discipline'
                : this.record.source.data_type[0].toUpperCase() + this.record.source.data_type.slice(1));
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

.item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-height: 70px;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    text-align: left;
    border-bottom: 1px solid #000;
    -webkit-box-shadow: 0 1px 1px rgba(55,55,55,0.7), 
    inset 0 1px 1px rgba(55,55,55,0.7);
            box-shadow: 0 1px 1px rgba(55,55,55,0.7), 
    inset 0 1px 1px rgba(55,55,55,0.7);
    h4, h5, .desc, p {
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
}
</style>
