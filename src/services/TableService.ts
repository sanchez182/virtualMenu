import CommonService from "./CommonService";

class TableService {
    endPoint = '/tables/'
    baseUrl = process.env.REACT_APP_API_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
    getDataTables = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,false)
    } 

    updateTable =(idTable:string,body:any)=>{
        return this.commonService.pustRequest(`${this.endPoint}/${idTable}`,body,false)
    }

}

export default TableService;