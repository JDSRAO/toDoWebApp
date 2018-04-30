import { ActivatedRoute }  from '@angular/router';

export class Common {

    static currentUrl : ActivatedRoute
    constructor(    ){   }

    static getParams(paramValue : any) : any
    {
       return this.currentUrl.snapshot.paramMap.get(paramValue);
    }
    
}
