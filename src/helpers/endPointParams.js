export const endPointParams = (endPoint, params)=>{
    params.forEach(item => {
        const valueName = (Object.getOwnPropertyNames(item))[0];
        if(typeof item[valueName] !== 'undefined' && item[valueName] !== null && item[valueName] !== 0){
            endPoint = `${endPoint}&${valueName}=${item[valueName]}`
        }
    });
    return endPoint
}