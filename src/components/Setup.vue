<template>

    <section id="setup-container">
        <header>
            <button v-show="showStartButton" @click="cmd_Start">Start</button>
        </header>
        <div>
            <h3>Add/remove names to be used</h3>
            <div id="add-new-name-container">
                <input type="text" ref="txtNewName" v-on:keyup="txtNewName_KeyUpPressed" />
                <button @click="cmdNewName_click">Add</button>
            </div>
            <div id="list-of-name-container">

               <div v-for="(aPerson,key,index) in Randomizer.listOfPeople" :key="index" class="name-container">
                    <label>{{aPerson.name}}</label>
                    <button @click="cmdDeleteName_Click(aPerson.name)">delete</button>
                </div> 

            </div>
        </div>
    </section>

</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {randomizer} from '../myClasses/randomizer';



@Component
export default class Setup extends Vue
{
    
    
    private txtNewName? : HTMLInputElement;
    private showStartButton : boolean = false;

    @Prop({default:true})
    ShowSetup? : boolean;

    @Prop({default:new randomizer()})
    Randomizer? : randomizer;


    // this is an internal Vue function that gets called when the Component gets mounted.
    // It is the first opertuity we have to access any html elements in the <template/>
    mounted()
    {
        // find any HTML Elements I will need access to
        this.txtNewName = (this.$refs["txtNewName"] as HTMLInputElement);
        
        
    }
    
    cmd_Start()
    {
        this.ShowSetup = !this.ShowSetup;
        //this.test = (this.$refs["txtNewName"] as HTMLInputElement).value;
        this.$emit('setupVsibility_HideContainer');
        
        // if i wanted to pass an argument use this one
        //this.$emit('setupVsibility_HideContainer',true);
    }
    
    txtNewName_KeyUpPressed(e : any)
    {
        // the enter key was pressed
        if (e.keyCode === 13) 
        {
            this.cmdNewName_click();
        }
    }

    cmdNewName_click()
    {
        

        if(this.txtNewName != undefined)
        {
            this.AddPerson(this.txtNewName.value);

            // clear the textbox
            this.txtNewName.value = '';
        }

        if(this.txtNewName != undefined)
            this.txtNewName.focus()
 
        
    }
    cmdDeleteName_Click(personName : string)
    {
        if(this.Randomizer != undefined)
        {
            this.Randomizer.removePerson(personName);

            if(this.Randomizer.listOfPeople.length == 0)
                this.showStartButton = false;
        }
        
    }

    @Watch('ShowSetup')
    ShowSetup_Changed(newValue:boolean, oldValue:boolean)
    {
        if(newValue)
        {// we want this component to be visable

        }
        else
        { // we want this component to be hidden

        }
    }

     // add the name to the randomizer and UI
    private AddPerson(name :string)
    {
        if(name.length > 0)
        {
            // add name to randamizer
            if(this.Randomizer.addPerson(name))
            {
                
                this.showStartButton = true; 
                
                // resave the data to local storage because a name was added.
                //saveToLocalStorageData(Randomizer);
            }
            

        }        
    }


    
}
</script>

<style scoped lang="less">
#setup-container
{
    
    height:100%;
    display:grid;
    grid-template-rows: 1fr 10fr;
    grid-template-columns: 1fr;
    
    > header
    {
        margin-top: 30px;

        > button
        {
            display:block;

            background-color:#35607A;
            color:white;
            border-color: #05A1FF;
            border-width: 3px;
            border-radius: 10px;
            text-align: center;

            min-width: 200px;
            
            padding:10px;

            margin-left:auto;
            margin-right: auto;
            //display:none;

            font-size:1.5rem;

            border-style: solid;

        }
    }
    > div
    {
        margin-left: auto;
        margin-right: auto;
        min-width:300px;
        > h3
        {
            width: 100%;

        }
        > #add-new-name-container
        {
            width: 100%;
            max-width:600px;
            display:grid;
            grid-template-columns: 9fr 1fr;

            

            
            

            &:focus-within
            {
                
            }
            > input
            {
                width:100%;
                border-style:none;
                padding:10px 20px;
                background-color:#E6FFDC;
                color:black;
                border-color: black;
                border-width: 3px;
                border-radius: 10px 0 0 10px;
                font-size:1.3rem;
                box-sizing: border-box;

                &:focus
                {
                    outline:solid;
                    outline-color: black;
                    outline-width: 2px;
                }
                
            }
            > button 
            {
                width:100px;
                font-size:1.3rem;
                border:none;
                background-color:#C7FFB2;
                color:#185700;

                &:focus
                {
                    background-color:#A0F87F;
                }
            }
        }
        > #list-of-name-container
        {
            width:100%;
            margin-top:30px;
            display:grid;
            grid-template-rows: 1fr;
            grid-row-gap: 10px;

            > .name-container
            {
                display: grid;
                grid-template-columns: 9fr 1fr;

                max-width:600px;

                border-radius: 10px;
                border-color: black;
                border-width: 3px;
                border-style: solid;
                background-color:white;

                box-sizing: border-box;
                
                > label
                {
                    margin-left:20px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    box-sizing: border-box;
                    
                    font-size: 1.8rem;
                    width:100%;
                    min-height:33px;

                    border:none;

                    &:focus
                    {
                        outline: none;
                    }
                }
                > button
                {
                    width:100px;
                    box-sizing: border-box;

                    font-size:1.3rem;
                    border:none;
                    background-color:#BD0000;
                    color:white;

                    border-radius: 0 8px 8px 0;

                    &:focus
                    {
                        background-color:#570303;
                    }
                    
                }
            }
        }        
    }
}
</style>
