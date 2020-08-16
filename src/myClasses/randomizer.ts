export class randomizer 
{
    private _listOfPeople : personData[];
    private _bagOfPeople : personData[];
    private _lastPersonNamePicked : string = '';

    // a list of colors we can use for each person (holds a background and foreground color)
    private _listOfThemeColors : colorTheme[];
    private _bagOfThemeColors : colorTheme[];
    // lets us know the last theme that was used.
    // Usefull so that we don't pick the same color twice in a row.
    private _lastThemeIDPicked : number = -1;

    constructor() 
    {
        this._listOfPeople = [];
        this._bagOfPeople = [];
        
        this._listOfThemeColors = [];
        this._bagOfThemeColors = [];

        let aTheme : colorTheme;
        
        aTheme = new colorTheme();
        aTheme.backgroundColor = "#B5834A";
        aTheme.foregroundColor = "white";
        aTheme.id = 0;

        this._listOfThemeColors.push(aTheme);

        aTheme = new colorTheme();
        aTheme.backgroundColor = "#47B862";
        aTheme.foregroundColor = "white";
        aTheme.id = 1;

        this._listOfThemeColors.push(aTheme);
    }

    
    public get listOfPeople() : personData[] {
        return this._listOfPeople
    }
    

    /**
     * @description add the person to the rnadomizer (as long as they do not allready exist)
     * @param name name of the person to add
     * @returns true if added, false if not
     */
    public addPerson(name:string) : boolean
    {
        // make sure the name does not allready exist.
        // if it does return false to indicate the name
        // was not added.
        if(this.doesNameExist(name))
            return false;

        // create a new instance of personData
        // and set the name sent in.
        let aPerson = new personData();
        aPerson.name = name;

        // add the new person to the array
        this._listOfPeople.push(aPerson); 

        // return true to indicate the name was added
        return true;
    }

    /**
     * @description removes ther person from the randomizer
     * @param name the name of the person to look for and remove. returns true if removed, otherwise false
     * @returns returns true if removed, otherwise false
     */
    public removePerson(name:string) : boolean
    {
        // convert name to lower case so we can do a lower case comparision
        let nameAsLowerCase = name.toLowerCase();

        // loop through each person in the array to see if we can find a match
        // with the name of the person we are looking for.
        for(let i =0; i < this._listOfPeople.length; i++)
        {
            let nameToCompare = this._listOfPeople[i].name.toLowerCase();

            if(nameAsLowerCase == nameToCompare)
            {
                // we have found a match so remove the found person
                // from the array
                this._listOfPeople.splice(i, 1);

                // return true to indicate the person has been removed
                return true;
            }
        }
        
        // return false to indicate the person was not found and so was not removed.
        return false;
    }

    /**
     * @description gets the next random person to show
     */
    public getNextRandomPerson() : personData
    {
        let aPerson : personData;
        let randomNumber : number;
        // make sure there is a name to pick, if not, copy all the names
        // from this._listOfPeople
        if(this._bagOfPeople.length == 0)
            this._bagOfPeople = this._listOfPeople.slice();

        // make sure there is some colors to pick from, if not, copy all the
        // theme colors from this._listOfThemeColors;
        if(this._bagOfThemeColors.length == 0)
            this._bagOfThemeColors = this._listOfThemeColors.slice();
        
        // if there is only one left in the bag of people, then randomNumber must be zero
        if(this._bagOfPeople.length == 1)
            randomNumber = 0;
        else
        {
            // get a number between zero and total number of peopel in _bagOfPeople
            randomNumber = this.getRandomNumber(0,this._bagOfPeople.length-1);
            // make sure we are not picking the same person that is currently 
            // displayed on the screen.
            while(this._bagOfPeople[randomNumber].name == this._lastPersonNamePicked)
                randomNumber = this.getRandomNumber(0,this._bagOfPeople.length-1);

        }

        // use the randoNumber to get the person
        aPerson = this._bagOfPeople[randomNumber];
        // incorment the numberOfTimesPicked by one because this person was picked
        aPerson.numberOfTimesPicked++;

        // set the last person name picked to the current person that was picked.
        this._lastPersonNamePicked = aPerson.name;

        // remove the person from the bagOfPeople so they can't be picked again
        // until the bag becomes empty
        this._bagOfPeople.splice(randomNumber,1);

        // get a random color theme

        // if there is only one theme color left in the bag, then randomNumber must be zero
        if(this._bagOfThemeColors.length == 1)
            randomNumber = 0;
        else
        {
            // get a number between zero and the total number of theme colors left in the bag
            randomNumber = this.getRandomNumber(0,this._bagOfThemeColors.length - 1);
            // make sure we are not picking the same theme color that is currently 
            // displayed on the screen.
            while(this._bagOfThemeColors[randomNumber].id == this._lastThemeIDPicked)
                randomNumber = this.getRandomNumber(0,this._bagOfThemeColors.length - 1);
        }
        
        // the random theme color that has been picked
        let theme = this._bagOfThemeColors[randomNumber];
        // set the last theme id to the current one we just randomly picked.
        this._lastThemeIDPicked = theme.id;
        // give the person the color themes to use
        aPerson.Colors.backgroundColor = theme.backgroundColor;
        aPerson.Colors.foregroundColor = theme.foregroundColor;

        // remove the theme color from the BagOfThemeColors so it can't be picked again
        // until the bag becomes empty
        this._bagOfThemeColors.splice(randomNumber,1);
        
        // return the picked person
        return aPerson;
    }
    /**
     * @description Keeps persons names but resets picking of names back to begining
     */
    public reset() : void
    {
        for (let aPerson of this._listOfPeople)
            aPerson.reset();

        this._bagOfPeople = [];
        this._lastPersonNamePicked = '';
        this._bagOfThemeColors = [];
        this._lastThemeIDPicked = -1;           
    }



    /**
     * @description Checks if the name allready exists in the randomizer
     * @param name name of the person to check if they exist
     * @returns returns true if found, otherwise false
     */
    private doesNameExist(name : string) : boolean
    {
        // convert name to lower case so we can do a lower case comparision
        let nameAsLowerCase = name.toLowerCase();
        // loop through each person in the array to see if we can
        // find a match with the name of the person we are looking for
        for (let aPerson of this._listOfPeople) 
            if(nameAsLowerCase == aPerson.name.toLowerCase())
                return true;
            
        return false;
    }

    private getRandomNumber(min:number,max:number) :number
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

class personData
{

    constructor() {
        this._name = "";
        this._numberOfTimesPicked = 0;
        this._Colors = new colorTheme();
    }
    ///////////////////////
    // name (get/set)
    private _name :string;

    public get name() : string {
        return this._name;
    }
    public set name(name : string) {
        this._name = name;
    }

    ////////////////////
    // numberOfTimesPicked (get/set)
    private _numberOfTimesPicked : number;

    
    public get numberOfTimesPicked() : number {
        return this._numberOfTimesPicked
    }
    
    public set numberOfTimesPicked(numTimesPicked : number) {
        this._numberOfTimesPicked = numTimesPicked;
    }

    public reset() : void
    {
        this.numberOfTimesPicked = 0;
    }


    
    private _Colors : colorTheme;
    public get Colors() : colorTheme {
        return this._Colors;
    }
    public set Colors(v : colorTheme) {
        this._Colors = v;
    }
    
    
    
    
    
}

/**
 * Holds background and foreground colors to use
 * when showing a users name that is picked from a hat.
 */
class colorTheme
{
    
    constructor() 
    {
        this._backgroundColor = "black";
        this._foregroundColor = "white";
        this._id = 0;
    }
    
    private _backgroundColor : string;
    public get backgroundColor() : string 
    {
        return this._backgroundColor;
    }
    public set backgroundColor(v : string) 
    {
        this._backgroundColor = v;
    }


    
    private _foregroundColor : string;
    public get foregroundColor() : string 
    {
        return this._foregroundColor;
    }
    public set foregroundColor(v : string) 
    {
        this._foregroundColor = v;
    }




    
    private _id : number;
    public get id() : number {
        return this._id;
    }
    public set id(v : number) {
        this._id = v;
    }
    
    
    
}