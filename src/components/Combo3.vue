<script>
import ComboItem from '@/components/ComboItem.vue';

export default (function() {
    'use strict';

    function generateHtml(h, arr) {
        if (arr.length) {
            return h('div', { class: 'combos' }, arr.map(el => {
                const component = h(ComboItem, {
                    props: {
                        combo: el,
                    }
                });
               
                return h('div', [component, generateHtml(h, el.combos)])
                
            }))
        }

    }

    return {
        props: {
            combos: {
                type: Array,
                required: true
            },
        },

        components: {
            ComboItem
        },

        render(h) {
            return generateHtml(h, this.combos);
        }
    }
})();
</script>
