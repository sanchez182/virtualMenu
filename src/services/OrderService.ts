import CommonService from "./CommonService";

class OrderService {
    endPoint = '/order/'
    baseUrl = process.env.REACT_APP_API_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    

    getOrderById = async (id:string) => {
        return this.commonService.getRequest(`${this.endPoint}${id}`,true)
    }

    createOrder =async (body:any)=>{
        return await this.commonService.postRequest(`${this.endPoint}`,body,false)
    }
 
    updateOrder = async (idOrder:string,body:any)=>{
        return this.commonService.pustRequest(`${this.endPoint}${idOrder}`,body,false)
    }

    

}

export default OrderService;