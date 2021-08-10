import CommonService from "./CommonService";
class RestaurantService {
    endPoint = '/restaurant/' 
    baseUrl = process.env.REACT_APP_API_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
    getRestaurantData = async () => {
        return this.commonService.getRequest(`${this.endPoint}infoRestaurant`,false)
    }

}

export default RestaurantService;