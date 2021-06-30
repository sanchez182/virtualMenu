import axios from 'axios'; 
import i18next from 'i18next';
import store from '../store'; 
import { setOpenMessageAlert } from '../store/actions/messageAlertActions';
import { apiCallError, apiCallStart, apiCallSuccess } from '../store/actions/requestActions'; 


const isHandlerEnabled = (config = {}) => {
     dispatch(apiCallStart())
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true;
};

const dispatch = store.dispatch;

export const requestHandler = (request, customHeaders) => {
    if (isHandlerEnabled(request)) {
        customHeaders.forEach(elem => {
            request.headers[elem.key] = elem.value;
        });
    }
    return request;
};
export const errorHandler = (error) => {

    if (isHandlerEnabled(error.response)) {
        // Handle errors  
        switch (error.response?.status.toString()) {
            case '400':
                //'Bad Request';
                error.msg = error.response?.data.msg ? error.response?.data.msg : error.response?.data.errors[0]
                 dispatch(apiCallError());
                dispatch(setOpenMessageAlert({ show: true, message: error.msg, severity: 'error' }));
                break;
            case '401':
                error.msg = 'Unauthorized';
                dispatch(apiCallError());
              //  dispatch(checkingFinish());
               // dispatch(setOpenMessageAlert({ show: true, message: error.msg, severity: 'error' }));
                break;
            case '404':
                error.msg = 'Not Found, Record not found for modification';
                dispatch(apiCallError());
                dispatch(setOpenMessageAlert({ show: true, message: error.msg, severity: 'warning' }));
                break;
            case '500':
                error.msg = i18next.t('messages.InternalServerError')
                dispatch(apiCallError());
               dispatch(setOpenMessageAlert({ show: true, message: error.msg, severity: 'error' }));
                break;
            default:
                dispatch(apiCallError());
                error.msg = i18next.t('messages.InternalServerError.')
                dispatch(setOpenMessageAlert({ show: true, message: error.msg, severity: 'error' }));
                break;
        }
    }
    return Promise.reject({ ...error });
};
export const successHandler = (response) => {
    dispatch(apiCallSuccess());
    return response;
};

export const interceptorHttp = (processUrl) => {
    const content = 'application/json'
    let customHeaders = []
    const axiosInstance = axios.create({
        baseURL: processUrl,
        headers: {
            Accept: 'application/json',
            'Content-Type': content
        }
    });
    axiosInstance.interceptors.request.use((request) => requestHandler(request, customHeaders));
    axiosInstance.interceptors.response.use(
        response => successHandler(response),
        error => errorHandler(error)
    );
    return axiosInstance;
};

export default interceptorHttp;