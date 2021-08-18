import CommonService from "./CommonService";

class OrderService {
    endPoint = '/order/'
    baseUrl = process.env.REACT_APP_API_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    

    updateOrderBySocketClientId = async (id:string,newSocketId :string) => {
        return this.commonService.pustRequest(`${this.endPoint}updateClient/${id}`,{socketClientId:newSocketId},false)
    }

    createOrder =async (body:any)=>{
        return await this.commonService.postRequest(`${this.endPoint}`,body,false)
    }
 
    updateOrder = async (idOrder:string,body:any)=>{
        return this.commonService.pustRequest(`${this.endPoint}${idOrder}`,body,false)
    }

    updateOrderClientId = async (idOrder:string,clientId:string)=>{
        return this.commonService.pustRequest(`${this.endPoint}${idOrder}/${clientId}`,{},false)
    }

    
    

}

export default OrderService;