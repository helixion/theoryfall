<template>
    <div class="info">
        <div class="icon">
            <img :src="'http://localhost:3000' + combo.icon_svg" :alt="combo.name">
        </div>
        <div class="details">
            <h5 class="name">{{combo.name}}</h5>
            <p class="desc">
                {{combo.description}}
            </p>
        </div>
        <div class="tools" @click.stop>
            <span class="toggle" @click.stop="$store.commit('SET_ID', combo.id)"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
            <div class="tools-panel" v-show="id === combo.id">
                <ol>
                    <li>Edit</li>
                    <li>Remove</li>
                    <li>Move</li>
                </ol>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
  props: {
      combo: {
          type: Object,
          required: true
      }
  },
  computed: {
      id() {
          return this.$store.getters.id;
      }
  }
}
</script>

<style lang="scss">

.combos {
    margin-left: 40px;
    .info {
        position: relative;
        &:before {
            content: url(http://localhost:3000/assets/images/arrow.png);
            position: absolute;
            left: -35px;
            top: 0;
            bottom: 0;
            width: 30px;
            height: 30px;
        }
    }
}

</style>
