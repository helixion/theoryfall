<template>
    <div class="power">
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
            <span class="name">{{record.source.name}}</span>
            <span class="type">{{sourceType}}</span>
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
