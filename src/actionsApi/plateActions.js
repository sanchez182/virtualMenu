import PlateService from "../services/PlateService";


const service = new PlateService();

export const getAllPlates = async () => {
  const response = await service.getAllPlates()
  if (response.status === 200) {
  }
  //dispatch(apiCallSuccess())
return response.data
}
