import CommonService from "./CommonService";

class DrinkService {
    endPoint = '/drink/'
    baseUrl = process.env.REACT_APP_API_URL;

    
    
    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
    getAllDrinks = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,false)
    }

}

export default DrinkService;