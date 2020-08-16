<template>

        <section id="randomizer-container">
            <button id="cmdFinish" @click="cmdFinish_Click">Finish</button>
            <div v-bind:style="{ color: foregroundColor, 'background-color': backgroundColor }">
                <div></div>
                <div id="lblName" ref="lblName"
                    v-bind:style="{ color: foregroundColor}"></div>
                <div></div>
            </div>
            <button id="cmdNext" @click="cmdNext_Click">Next</button>
        </section>

</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {randomizer} from '../myClasses/randomizer';



@Component
export default class Setup extends Vue
{
    private lblName? : HTMLDivElement;

    @Prop({default:new randomizer()})
    Randomizer? : randomizer;

    public backgroundColor : string = 'black';
    public foregroundColor : string = 'white';

    // this is an internal Vue function that gets called when the Component gets mounted.
    // It is the first opertuity we have to access any html elements in the <template/>
    mounted()
    {
        // find any HTML Elements I will need access to

        this.lblName = this.$refs["lblName"] as HTMLDivElement;
        
    }

    cmdFinish_Click()
    {
        // call event that can be listend for by the parent of this compoent (App.vue)
        if(this.Randomizer != undefined)
            this.Randomizer.reset();
            
        this.$emit('RandomizerContainer_HideContainer');
    }

    cmdNext_Click()
    {
        this.LoadNextName();
        
    }

    public LoadNextName()
    {
        if(this.lblName != undefined)
            if(this.Randomizer != undefined)
            {
                let randomPerson = this.Randomizer.getNextRandomPerson();

                this.lblName.innerText = randomPerson.name;
                this.backgroundColor = randomPerson.Colors.backgroundColor;
                this.foregroundColor = randomPerson.Colors.foregroundColor;
            }
    }
    


    
}
</script>

<style scoped lang="less">
#randomizer-container
{
    height:100%;

    display:grid;
    grid-template-rows: 1fr 8fr 1fr;

    > #cmdFinish, > #cmdNext
    {
        border:none;
    }

    > #cmdFinish
    {
        background-color:#1F2A38;
        color:white;
        font-size:1.5rem;
    }
    >div
    {
        background-color:#2A2A2A;
        display:grid;
        grid-template-rows: 1fr 8fr 1fr;

        >div:nth-child(1)
        {

        }
        >div:nth-child(2)
        {
            // align text vertiicaly
            align-self: center;
            // align text horizontaly
            justify-self: center;
            font-size:6rem;
            color:white;
        }
        
    }
    > #cmdNext
    {
        background-color:#588E3B;
        color:white;
        font-size:1.5rem;
    }
}
</style>
