<template>
    <div :class="['class-icon', { 'class-locked': !selectedClass }]" @click.stop="toggleClassSelector">
        <div :class="['selector', { open: classSelectorOpen }]">
            <img v-for="(c, index) in classList"
                :key="index" 
                :src="'http://localhost:3000' + c.icon" alt=""
                @click.prevent.stop="setClass(index)">
        </div>
        <img :src="'http://localhost:3000' + selectedClass.icon" alt="" v-if="selectedClass">
        <div :class="['race-icon', { 'race-locked': !selectedClass}]" @click.stop="toggleRaceSelector">
            <div :class="['selector', { 'race-open': raceSelectorOpen }]" v-if="selectedClass">
                <img v-for="(race, i) in selectedClass.races" 
                :src="'http://localhost:3000' + race.icon" :alt="race.name" :key="race.id"
                @click.prevent.stop="setRace(i)">
            </div>
            <img :src="selectedRace.icon" :alt="selectedRace.name" v-if="selectedClass && selectedRace">
        </div>
        
    </div>
</template>


<script>
import { eventBus } from '@/main';

export default {
  props: {
      classList: {
          type: Array
      }
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
          return ['race-icon', { 'race-locked': !this.selectedClass }];
      },
      raceSelectorClasses() {
          return ['selector', {'race-open': this.raceSelectorOpen && !this.classSelectorOpen}];
      },
      classIconClasses() {
          return ['class-icon', { 'class-locked': !this.classSelected }];
      },
      classSelectorClasses() {
          return ['selector', {'open': this.classSelectorOpen && !this.raceSelectorOpen}];
      }
  }

  methods: {
      setClass(index) {
          this.selectedClass = this.classList[index];
          this.$emit('update', index);
      },
      setRace(index) {
          this.selectedRace = this.selectedClass.races[index];
      },
      toggleClassSelector() {
          this.closeSelectors();
          this.classSelectorOpen = !this.classSelectorOpen;
      },
      toggleRaceSelector() {
          if (!this.selectedClass) return;
          this.closeSelectors();
          this.raceSelectorOPen = !this.raceSelectorOpen;
      },
      closeSelectors() {
          const classSelector = document.querySelector('.open');
          const raceSelector = document.querySelector('.race-open');
          if (classSelector || raceSelector) {
              classSelector.className.replace(/\bopen\b/, " ");
              raceSelector.className.replace(/\brace-open\b/, " ");
          }
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
        bottom: -50px;
        right: -650px;
        background-color: #e4e4e4;
        box-shadow: 1px 1px 0 rgba(55,55,55,0.3);
        z-index: 1000;
        &.open {
            display: -webkit-flex;
            display: flex;
        }
        &.race-open {
             display: -webkit-flex;
             display: flex;
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
        &.race-locked {
            
            color: #fff;
            font-size: 24px;
            text-shadow: 1px 0 0 rgba(55,55,55,0.7);
            &:after {
                content: '\f023';
                font-family: 'FontAwesome';
                
            }
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
