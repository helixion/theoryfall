<template>
    <div class="container is-fluid">
        <div class="columns">
            <div class="column is-narrow">
                <div id="side-menu"></div>
            </div>
            <main class="column">
                <div class="columns">
                    <div class="column">
                        <filter-bar></filter-bar>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <pagination :meta="meta"></pagination>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <list-item :record="record" :index="index" :key="index" v-for="(record, index) in records"></list-item>
                    </div>
                </div>

            </main>
        </div>

    </div>
</template>


<script>
import ListItem from '@/components/ListItem3.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import FilterBar from '@/components/FilterBar.vue';

export default {
    props: ['type'],
    components: { ListItem, Pagination, FilterBar },

    computed: {
        records() {
            return this.$store.getters.records;
        },

        meta() {
            return this.$store.getters.meta;
        },

        page() {
            return this.$store.route.params.page;
        }
    }
}
</script>


<style lang="scss">
main {
    .columns {
        margin-right: 0;
    }
}
</style>
