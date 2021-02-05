export class News{
    date: any;
    description: string;
    country: string;
    userid:string;
    name:string;
    constructor(
        date: any,
        description: string, 
        country: string,
        userid:string,
        name:string,
    ){
        this.date=date;
        this.description=description;
        this.country=country;
        this.userid=userid;
        this.name=name;
    };
    }
