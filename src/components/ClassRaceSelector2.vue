<template>
    <div :class="classIconClasses" @click.stop="toggleClassSelector">
        <div :class="classSelectorClasses">
            <span class="close" @click.stop="classSelectorOpen = false"></span>
            <img v-for="(c, index) in classList"
                :key="index" 
                :src="'http://localhost:3000' + c.icon" :alt="c.name"
                @click.prevent.stop="setClass(index)">
        </div>
        <img :src="'http://localhost:3000' + selectedClass.icon" :alt="selectedClass.name" v-if="selectedClass">
        <div :class="raceClasses" @click.stop="toggleRaceSelector">
            <div :class="raceSelectorClasses" v-if="selectedClass">
                <span class="close" @click.stop="raceSelectorOpen = false"></span>
                <img v-for="(race, i) in selectedClass.races" 
                :src="'http://localhost:3000' + race.icon" :alt="race.name" :key="race.id"
                @click.prevent.stop="setRace(i)">
            </div>
            <img :src="'http://localhost:3000' + selectedRace.icon" :alt="selectedRace.name" v-if="selectedClass && selectedRace">
        </div>
        
    </div>
</template>


<script>
import {eventBus} from '@/main';

export default {

  created() {
      eventBus.$on('close', () => {
          if (this.classSelectorOpen || this.raceSelectorOpen) {
              this.classSelectorOpen = false;
              this.raceSelectorOpen = false;
          }
      });
  },

  data() {
      return {
          selectedClass: null,
          selectedRace: null,
          classSelectorOpen: false,
          raceSelectorOpen: false
      }
  },

  computed: {
      raceClasses() {
          return ['race-icon', { 'race-locked': !this.selectedClass, 'race-choose': this.selectedClass && !this.selectedRace }];
      },
      raceSelectorClasses() {
          return ['selector', {'race-open': this.raceSelectorOpen && !this.classSelectorOpen}];
      },
      classIconClasses() {
          return ['class-icon', { 'class-locked': !this.selectedClass }];
      },
      classSelectorClasses() {
          return ['selector', {'open': this.classSelectorOpen && !this.raceSelectorOpen}];
      },
      classList() {
          return this.$store.getters.classList;
      }
  },

  methods: {
      setClass(index) {
          this.selectedClass = this.classList[index];
          this.selectedRace = null;
          this.$emit('update', index);
      },
      setRace(index) {
          this.selectedRace = this.selectedClass.races[index];
      },
      toggleClassSelector() {
          this.closeSelectors();
          this.raceSelectorOpen = false;
          this.classSelectorOpen = !this.classSelectorOpen;
      },
      toggleRaceSelector() {
          if (!this.selectedClass) return;
          this.closeSelectors();
          this.classSelectorOpen = false;
          this.raceSelectorOpen = !this.raceSelectorOpen;
      },
      closeSelectors() {
        eventBus.$emit('close');
      }
  }
}
</script>

<style lang="scss">
.class-icon {
    display: -webkit-flex;
    display: flex;
    width: 75px;
    height: 75px;
    border-radius: 40px;
    position: relative;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    background-color: #e4e4e4;
    &.class-locked { 
        color: #fff;
        font-size: 24px;
        text-shadow: 1px 0 0 rgba(55,55,55,0.7);
        &:after {
            content: '\f067';
            font-family: 'FontAwesome';
        }
    }
    img {
        width: 60px;
        height: 60px;
    }
    .selector {
        display: none;
        justify-content: space-between;
        height: 70px;
        padding: 5px;
        border: 1px solid #555;
        position: absolute;
        top: 85px;
        left: 0;
        // bottom: -50px;
        // right: -650px;
        background-color: #e4e4e4;
        box-shadow: 1px 1px 0 rgba(55,55,55,0.3);
        z-index: 1100;
        img {
            width: 60px;
            height: 60px;
        }
        .close {
            position: absolute;
            top: 0;
            right: 3px;
            font-size: 14px;
            &:after {
                content: '\f00d';
                font-family: 'FontAwesome';
            }
            
            
        }
        &.open {
            display: -webkit-flex;
            display: flex;
        }
        &.race-open {
             display: -webkit-flex;
             display: flex;
        }
    }
}

.race-icon {
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        bottom: -10px;
        right: -10px;
        border-radius: 20px;
        position: absolute;
        background-color: #e1e1e1;
        .selector {
            top: 35px;
        }
        &.race-locked {
            color: #fff;
            font-size: 24px;
            text-shadow: 1px 0 0 rgba(55,55,55,0.7);
            &:after {
                content: '\f023';
                font-family: 'FontAwesome';
                
            }
        }
        &.race-choose {
            color: #fff;
            font-size: 24px;
            text-shadow: 1px 0 0 rgba(55,55,55,0.7);
            &:after {
                content: '\f067';
                font-family: 'FontAwesome';
            }
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
