<template>
  <main>

    <Setup ref="setup" v-show="ShouldShowSetup" 
      v-on:setupVsibility_HideContainer="switchBetweenComponents"
      v-bind:Randomizer="Randomizer" />

      <RandomizerContainer ref="randomizerContainer"
        v-show="!ShouldShowSetup" 
        v-on:RandomizerContainer_HideContainer="switchBetweenComponents"
        v-bind:Randomizer="Randomizer" />

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Setup from './components/Setup.vue';
import RandomizerContainer from './components/RandomizerContainer.vue';

import {randomizer} from './myClasses/randomizer';

@Component({
  components: {
    Setup,
    RandomizerContainer
  },
})
export default class App extends Vue 
{
  private randomizerContainer? : RandomizerContainer;

  // used to determin which components should be visable on the screen.
  // RandomizerContainer.vue and Setup.vue do this via the v-show
  ShouldShowSetup : boolean = true;

  // this will get used in the Setup.vue and RandomizerContainer.vue
  // It will be passed to them via a property on I created on the components
  Randomizer = new randomizer();

  // this is an internal vue life cycle.
  // Vue.js will call this method for us.
  // Its a good place to setup references to any html dom
  // elements we may need access to.
  mounted()
  {
    // get a reference to the RandomizerContainer. This is so we 
    // can later on call one of its methods
    this.randomizerContainer = this.$refs["randomizerContainer"] as RandomizerContainer;
  }

  switchBetweenComponents()
  {
    // if ShouldShowSetup == true then the SetUp.vue component should be shown
    // and the RandomizezrContainer.vue should be hidden.
    // if ShouldShowSetup == false then the Setup.vue component shoudl not be visable
    // and the RandomizerContainer.vue should be shown.
    this.ShouldShowSetup = !this.ShouldShowSetup;

    // if we are going to show the RandomizerContainer.vue, call its method LoadNextName().
    // This make it so the first name is shown on the screen when the component is shown
    if(!this.ShouldShowSetup)
      if(this.randomizerContainer != undefined)
        this.randomizerContainer.LoadNextName();
  }

}
</script>

<style lang="less">

html, body, main
{
    height:100%;
    margin:0;
    padding:0;
    font-family:Arial, Helvetica, sans-serif;
    font-size:1rem;
}


</style>
