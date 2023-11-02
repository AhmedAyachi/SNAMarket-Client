


export default class LazyData {
    constructor(data={},ItemEntity){
        const {pageindex=-1}=data;
        this.pageindex=pageindex;
        this.pagecount=data.pagecount||1;
        this.items=data.items?.map($=>new ItemEntity($))||[];
    }
}
