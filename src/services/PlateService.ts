import CommonService from "./CommonService";

class PlateService {
    endPoint = '/plate/'
    baseUrl = process.env.REACT_APP_API_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
    getAllPlates = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,false)
    }


}

export default PlateService;