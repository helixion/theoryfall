import List from '@/components/List3.vue';

export default function genreateList(id) {
    return {
        created() {
            this.$store.dispatch('init', {type: id});
        },
        render: function(h) {
            return h(List, { props: { type: id } });
        }
    }
}