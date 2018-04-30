export class ToDoItemModel 
{
    constructor
    (
        public title : string,
        public description : string,
        public status : string,
        public done : boolean,
        public dueDate : Date
    )
    {    }

}
