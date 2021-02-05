export class Summary{
    NewConfirmed: string;
    TotalConfirmed: string;
    NewDeaths: string;
    TotalDeaths:string; 
    NewRecovered: string;
    TotalRecovered: string;
    Country: string;

    constructor(NewConfirmed, TotalConfirmed,NewDeaths,TotalDeaths,NewRecovered,TotalRecovered, Country){
 this.NewConfirmed=NewConfirmed;
 this.TotalConfirmed=TotalConfirmed;
 this.NewDeaths=NewDeaths;
 this.TotalDeaths=TotalDeaths;
 this.NewRecovered=NewRecovered;
 this.TotalRecovered=TotalRecovered;
 this.Country=Country;   
    }
    }
