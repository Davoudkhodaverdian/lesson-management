import axios from "axios";

const callApi = ()=> {
    
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        
    });
    
    // Add a request interceptor
    axiosInstance.interceptors.request.use((config) => {
        // Do something before request is sent
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
    });
    
    // Add a response interceptor
    axiosInstance.interceptors.response.use((response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, (error) => {
        console.log(error)
        const res = error?.response;
        if (res) {

            if (res.status === 422) {
                
              throw res.data;
            }
        }
        Promise.reject(error);
    });

    return axiosInstance;

}


export default callApi;